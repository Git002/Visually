import { clickedElement, clickedElementStyle, iFrameDocument } from '../../Stores';
import { get } from 'svelte/store';
import { random } from './helperFunctions';
import { calculate, compare } from 'specificity';

function getSelector(element: HTMLElement): string {
  let selector: string = '';

  if (element.id) selector += '#' + element.id;
  if (element.classList.length !== 0) {
    selector += '.' + element.classList.toString().replaceAll(' ', '.');
  }
  return selector;
}

/**
 * Retrieve any styles set by the User himself instead of getting the browser's computed property
 * For example: getUserSetStyles(element, ['width', 'color'])
 */
function getUserSetStyles(element: HTMLElement, props: string[]): { [key: string]: string } {
  let styles: { [key: string]: string } = {};
  let styleSheets: StyleSheetList = get(iFrameDocument).styleSheets;
  let computedStyle = getComputedStyle(element);

  for (let sheetIndex in styleSheets) {
    if (isNaN(Number(sheetIndex))) continue;

    let rules = (styleSheets[sheetIndex] as CSSStyleSheet).cssRules;

    for (let prop of props) {
      if (['0px', 'none'].includes(String(computedStyle[prop as keyof CSSStyleDeclaration]))) {
        if (['max-width', 'max-height'].includes(prop)) {
          styles[prop] = 'None';
        } else {
          styles[prop] = '0px';
        }
        continue;
      }

      let propSelectorsWithValues: { [key: string]: string } = {};

      for (let r in rules) {
        let selector = (rules[r] as CSSStyleRule).selectorText;

        if (element.matches(selector)) {
          let propValue = (rules[r] as CSSStyleRule).style[prop as any];
          if (propValue) {
            selector.split(',').forEach((selectorUnit) => {
              if (element.matches(selectorUnit)) propSelectorsWithValues[selectorUnit] = propValue;
            });
          }
        }
      }

      // figure out the specificty --->
      if (Object.keys(propSelectorsWithValues).length > 1) {
        const specificityResults = Object.keys(propSelectorsWithValues).map((selector) => {
          const selectorSpecificity = calculate(selector);
          return { selector, selectorSpecificity };
        });

        let sortedResults: any = specificityResults.sort((a, b) => {
          return compare(a.selectorSpecificity, b.selectorSpecificity);
        });

        let highestSpecificitySelector: string = sortedResults.at(-1).selector;

        styles[prop] = propSelectorsWithValues[highestSpecificitySelector];
      } else if (Object.keys(propSelectorsWithValues).length === 1) {
        styles[prop] = Object.values(propSelectorsWithValues)[0];
      }
    }
  }
  return styles;
}

function removePxUnit(text: string) {
  return text.endsWith('px') ? text.replace('px', '') : text;
}

interface CustomCSSStyleDeclaration extends CSSStyleDeclaration {
  [key: string]: any;
}

export function processStyles(element: HTMLElement) {
  let style: CustomCSSStyleDeclaration = { ...element.style };
  let computedStyle = getComputedStyle(element);
  let userSetStyles = getUserSetStyles(element, [
    'width',
    'height',
    'max-width',
    'max-height',
    'min-width',
    'min-height',
    'margin-top',
    'margin-left',
    'margin-right',
    'margin-bottom',
    'padding-top',
    'padding-left',
    'padding-right',
    'padding-bottom'
  ]);

  // Display properties ------->
  if (!style.display) {
    style.display = computedStyle.getPropertyValue('display');
  }

  if (!style.alignItems) {
    if (computedStyle.getPropertyValue('align-items') === 'normal') style.alignItems = 'stretch';
    else style.alignItems = computedStyle.getPropertyValue('align-items');
    style['align-items'] = style.alignItems;
  }

  if (!style.justifyContent) {
    if (computedStyle.getPropertyValue('justify-content') === 'normal') style.justifyContent = 'flex-start';
    else style.justifyContent = computedStyle.getPropertyValue('justify-content');
    style['justify-content'] = style.justifyContent;
  }

  // Sizing properties ------->
  if (!style.width) {
    if (userSetStyles['width']) style.width = removePxUnit(userSetStyles['width']);
    else style.width = 'Auto';
  }

  if (!style.height) {
    if (userSetStyles['height']) style.height = removePxUnit(userSetStyles['height']);
    else style.height = 'Auto';
  }

  if (!style.maxWidth) {
    if (userSetStyles['max-width']) style.maxWidth = removePxUnit(userSetStyles['max-width']);
    else style.maxWidth = 'None';
    style['max-width'] = style.maxWidth;
  }

  if (!style.maxHeight) {
    if (userSetStyles['max-height']) style.maxHeight = removePxUnit(userSetStyles['max-height']);
    else style.maxHeight = 'None';
    style['max-height'] = style.maxHeight;
  }

  if (!style.minWidth) {
    if (userSetStyles['min-width']) style.minWidth = removePxUnit(userSetStyles['min-width']);
    else style.minWidth = '0';
    style['min-width'] = style.minWidth;
  }

  if (!style.minHeight) {
    if (userSetStyles['min-height']) style.minHeight = removePxUnit(userSetStyles['min-height']);
    else style.minHeight = '0';
    style['min-height'] = style.minHeight;
  }

  // Spacing properties
  if (!style.marginTop) {
    if (userSetStyles['margin-top']) style.marginTop = removePxUnit(userSetStyles['margin-top']);
    else style.marginTop = '0';
    style['margin-top'] = style.marginTop;
  }

  if (!style.marginLeft) {
    if (userSetStyles['margin-left']) style.marginLeft = removePxUnit(userSetStyles['margin-left']);
    else style.marginLeft = '0';
    style['margin-left'] = style.marginLeft;
  }

  if (!style.marginRight) {
    if (userSetStyles['margin-right']) style.marginRight = removePxUnit(userSetStyles['margin-right']);
    else style.marginRight = '0';
    style['margin-right'] = style.marginRight;
  }

  if (!style.marginBottom) {
    if (userSetStyles['margin-bottom']) style.marginBottom = removePxUnit(userSetStyles['margin-bottom']);
    else style.marginBottom = '0';
    style['margin-bottom'] = style.marginBottom;
  }

  if (!style.paddingTop) {
    if (userSetStyles['padding-top']) style.paddingTop = removePxUnit(userSetStyles['padding-top']);
    else style.paddingTop = '0';
    style['padding-top'] = style.paddingTop;
  }

  if (!style.paddingLeft) {
    if (userSetStyles['padding-left']) style.paddingLeft = removePxUnit(userSetStyles['padding-left']);
    else style.paddingLeft = '0';
    style['padding-left'] = style.paddingLeft;
  }

  if (!style.paddingRight) {
    if (userSetStyles['padding-right']) style.paddingRight = removePxUnit(userSetStyles['padding-right']);
    else style.paddingRight = '0';
    style['padding-right'] = style.paddingRight;
  }

  if (!style.paddingBottom) {
    if (userSetStyles['padding-bottom']) style.paddingBottom = removePxUnit(userSetStyles['padding-bottom']);
    else style.paddingBottom = '0';
    style['padding-bottom'] = style.paddingBottom;
  }

  clickedElementStyle.update(() => style);
}

export class CSSUtility {
  private element: HTMLElement = get(clickedElement);
  private iFrameDoc: Document = get(iFrameDocument);

  constructor() {
    clickedElement.subscribe((value: HTMLElement) => (this.element = value));
    iFrameDocument.subscribe((value: Document) => (this.iFrameDoc = value));
  }

  writeCSS(property: string, value: string) {
    let selectorText = getSelector(this.element);

    if (!selectorText) {
      let newClassName: string = this.generateNewClass();
      this.element.classList.add(newClassName);
      selectorText = '.' + newClassName;
    }

    this.iFrameDoc.getElementById('visually-default-stylesheet')!.innerHTML +=
      selectorText + `{${property}: ${value}}`;

    get(clickedElement).click();
  }

  private generateNewClass(): string {
    let className: string = '';

    if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(this.element.tagName)) className = 'heading';
    else if (this.element.tagName === 'BODY') className = 'body';
    else if (this.element.tagName === 'BUTTON') className = 'button';
    else if (this.element.tagName === 'IMG') className = 'image';
    else if (this.element.tagName === 'P') className = 'paragraph';
    else if (this.element.tagName === 'DIV') className = 'div';
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
