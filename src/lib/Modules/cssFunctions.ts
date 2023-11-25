import { clickedElement, clickedElementStyle, iFrameDocument } from '../../Stores';
import { get } from 'svelte/store';
import { random } from './helperFunctions';

/*
    [Alert]: (more checks are required to increase accuracy of this function)
    [Description]: (This function checks stylesheets to accurately retrieve user-set styles.
    If no user styles are found, it will return 'Auto'.)
*/
function getCssPropertyForRule(element: HTMLElement, prop: string) {
  let matchedStyleValues: string[] = [];

  for (let i in document.styleSheets) {
    let rules = (document.styleSheets[i] as CSSStyleSheet).cssRules;

    for (let j in rules) {
      if (element.matches((rules[j] as CSSStyleRule).selectorText)) {
        matchedStyleValues.push((rules[j] as CSSStyleRule).style[prop as any]);
      }
    }
  }

  if (!matchedStyleValues) return 'Auto';
  // retrieve the latest set value set in the stylesheet
  return matchedStyleValues.at(-1);
}

export function processStyles(element: HTMLElement) {
  let style: CSSStyleDeclaration = { ...element.style };
  let computedStyle = getComputedStyle(element);

  // Display properties ------->
  if (!style.display) {
    style.display = computedStyle.getPropertyValue('display');
  }
  if (!style.alignItems) {
    if (computedStyle.getPropertyValue('align-items') === 'normal') style.alignItems = 'stretch';
    else style.alignItems = computedStyle.getPropertyValue('align-items');
  }
  if (!style.justifyContent) {
    if (computedStyle.getPropertyValue('justify-content') === 'normal') style.justifyContent = 'flex-start';
    else style.justifyContent = computedStyle.getPropertyValue('justify-content');
  }

  // Sizing properties ------->
  if (!style.width) {
  }

  clickedElementStyle.update(() => style);
}

// for adding new styles to the document
export class CSSUtility {
  private element: HTMLElement = get(clickedElement);
  private iFrameDoc: Document = get(iFrameDocument);

  constructor() {
    clickedElement.subscribe((value: HTMLElement) => (this.element = value));
    iFrameDocument.subscribe((value: Document) => (this.iFrameDoc = value));
  }

  writeCSS(property: string, value: string) {
    let selectorText = this.getSelector();

    this.iFrameDoc.getElementById('visually-default-stylesheet')!.innerHTML +=
      selectorText + `{${property}: ${value}}`;

    get(clickedElement).click();
  }

  private getSelector(): string {
    let selector: string = '';

    if (this.element.id) selector += '#' + this.element.id;
    if (this.element.classList.length !== 0) {
      selector += '.' + this.element.classList.toString().replaceAll(' ', '.');
    }

    // if the selector is empty it means element has no ID or class. Generate a new class for it
    if (!selector) {
      let newClassName: string = this.generateClass();
      this.element.classList.add(newClassName);
      selector = '.' + newClassName;
    }
    return selector;
  }

  private generateClass(): string {
    let className: string = '';

    if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(this.element.tagName)) className = 'heading';
    else if (this.element.tagName === 'BODY') className = 'body';
    else if (this.element.tagName === 'BUTTON') className = 'button';
    else if (this.element.tagName === 'IMG') className = 'image';
    else if (this.element.tagName === 'P') className = 'paragraph';
    else className = random(6);

    if (this.iFrameDoc.getElementsByClassName(className).length === 0) return className;

    let newClassName: string;
    let count = 1;
    do {
      newClassName = className + '-' + count;
      count++;
    } while (this.iFrameDoc.getElementsByClassName(newClassName).length !== 0);

    return newClassName;
  }
}
