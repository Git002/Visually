import { clickedElement, clickedElementStyle, iFrameDocument } from '../../Stores';
import { get } from 'svelte/store';

// calculating the outline box pixels of clicked element for helper divs in the iFrame
export function calculateRect(element: HTMLElement, selector: HTMLDivElement) {
  let rect = element.getBoundingClientRect();
  selector.style.width = rect.width + 'px';
  selector.style.height = rect.height + 'px';
  selector.style.top = rect.top + 'px';
  selector.style.left = rect.left + 'px';
}

// handle the ghost position + visibility on document as well for the iFrame
export function ghostImageHandler(top: number, left: number, display?: 'block' | 'none') {
  const ghost_img = <HTMLDivElement>document.getElementById('ghost_img');
  if (display) ghost_img.style.display = display;
  ghost_img.style.top = top + 'px';
  ghost_img.style.left = left + 'px';
}

export function random(length: number, numbers: boolean = false, special_char: boolean = false): string {
  let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (numbers) {
    charset += '0123456789';
  }
  if (special_char) {
    charset += '!@#$%^&*()_+[]{}|;:,.<>?';
  }

  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }
  return randomString;
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
