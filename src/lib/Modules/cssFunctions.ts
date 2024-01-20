import { clickedElement, clickedElementStyle, iFrameDocument, currentCSSActionClass } from '../../Stores';
import { get } from 'svelte/store';
import { random } from './helperFunctions';
import { calculate, compare } from 'specificity';

function findHighestSpecificity(obj: Object) {
  const specificityResults = Object.keys(obj).map((selector) => {
    const selectorSpecificity = calculate(selector);
    return { selector, selectorSpecificity };
  });
  const sortedResults: any = specificityResults.sort((a, b) => {
    return compare(a.selectorSpecificity, b.selectorSpecificity);
  });
  // return the highest specificity selector
  return sortedResults.at(-1)['selector'];
}

/**
 * Retrieve any styles set by the user instead of getting the browser's computed property.
 * For example: getUserSetStyles(element, ['width', 'max-height'])
 */
function getUserSetStyles(element: HTMLElement, props: string[]): { [key: string]: string } {
  let styles: { [key: string]: string } = {};

  for (let sheet of get(iFrameDocument).styleSheets) {
    for (let prop of props) {
      let selectorInfo: { [key: string]: string } = {};

      for (let rule of sheet.cssRules) {
        let selector = (rule as CSSStyleRule).selectorText;

        if (element.matches(selector)) {
          let propValue = (rule as CSSStyleRule).style[prop as any];
          if (propValue) {
            selector.split(',').forEach((selectorUnit) => {
              if (element.matches(selectorUnit)) selectorInfo[selectorUnit] = propValue;
            });
          }
        }

        // figure out the specificty --->
        if (Object.keys(selectorInfo).length > 1) {
          const highestSpecificitySelector: string = findHighestSpecificity(selectorInfo);
          styles[prop] = selectorInfo[highestSpecificitySelector];
        } else if (Object.keys(selectorInfo).length === 1) {
          styles[prop] = Object.values(selectorInfo)[0];
        }
      }
    }
  }
  return styles;
}

export function processStyles(element: HTMLElement) {
  let style: { [key: string]: any } & CSSStyleDeclaration = { ...element.style };
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
  if (!style.display) style.display = computedStyle.display;

  if (!style.alignItems) {
    let alignItemsValue = computedStyle.alignItems;
    style['align-items'] = alignItemsValue === 'normal' ? 'stretch' : alignItemsValue;
  }

  if (!style.justifyContent) {
    let justifyContent = computedStyle.justifyContent;
    style['justify-content'] = justifyContent === 'normal' ? 'flex-start' : justifyContent;
  }

  /**
   * Retrieve values from userSetStyles and remove its px value. If value is not there then set the default value.
   * For example: setStyleForUnitProperty('width', 'Auto')
   * @param property
   * @param defaultValue
   */
  function setStyleForUnitProperty(property: string, defaultValue: string) {
    let CSSValue: string = userSetStyles[property];

    if (CSSValue) CSSValue = CSSValue.endsWith('px') ? CSSValue.replace('px', '') : CSSValue;
    else CSSValue = defaultValue;

    style[property] = CSSValue;
  }

  // Sizing properties ------->
  if (!style.width) setStyleForUnitProperty('width', 'Auto');

  if (!style.height) setStyleForUnitProperty('height', 'Auto');

  if (!style.maxWidth) setStyleForUnitProperty('max-width', 'None');

  if (!style.maxHeight) setStyleForUnitProperty('max-height', 'None');

  if (!style.minWidth) setStyleForUnitProperty('min-width', '0');

  if (!style.minHeight) setStyleForUnitProperty('min-height', '0');

  if (!style.overflow) style.overflow = computedStyle.overflow;

  // Spacing properties ------->
  if (!style.marginTop) setStyleForUnitProperty('margin-top', '0');

  if (!style.marginLeft) setStyleForUnitProperty('margin-left', '0');

  if (!style.marginRight) setStyleForUnitProperty('margin-right', '0');

  if (!style.marginBottom) setStyleForUnitProperty('margin-bottom', '0');

  if (!style.paddingTop) setStyleForUnitProperty('padding-top', '0');

  if (!style.paddingLeft) setStyleForUnitProperty('padding-left', '0');

  if (!style.paddingRight) setStyleForUnitProperty('padding-right', '0');

  if (!style.paddingBottom) setStyleForUnitProperty('padding-bottom', '0');

  clickedElementStyle.update(() => style);
}

function getSelector(element: HTMLElement): string {
  let selector: string = '';
  if (element.id) selector += '#' + element.id;
  if (element.classList.length !== 0) {
    selector += '.' + element.classList.toString().replaceAll(' ', '.');
  }
  return selector;
}

export class CSSUtility {
  private element: HTMLElement = get(clickedElement);
  private iFrameDoc: Document = get(iFrameDocument);
  private CSSActionClass: string = get(currentCSSActionClass);

  constructor() {
    clickedElement.subscribe((value: HTMLElement) => (this.element = value));
    iFrameDocument.subscribe((value: Document) => (this.iFrameDoc = value));
    currentCSSActionClass.subscribe((value: string) => (this.CSSActionClass = value));
  }

  writeCSS(property: string, value: string) {
    let selectorText = getSelector(this.element);

    if (
      !selectorText ||
      selectorText === '.hover' ||
      selectorText === '.active' ||
      selectorText === '.focus'
    ) {
      this.element.classList.add(this.generateNewClass());
    }

    // have to do this in-order to put action-class position at the end
    if (this.CSSActionClass !== '') {
      this.element.classList.remove(this.CSSActionClass);
      this.element.classList.add(this.CSSActionClass);
    }

    let styleTag = this.iFrameDoc.getElementById('visually-default-stylesheet') as HTMLStyleElement;
    let styleSheet = styleTag.sheet as CSSStyleSheet;

    styleSheet.insertRule(getSelector(this.element) + `{${property}: ${value}}`, styleSheet.cssRules.length);

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
