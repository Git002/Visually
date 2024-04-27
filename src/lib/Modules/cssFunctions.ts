import { clickedElement, clickedElementStyle, iFrameDocument, currentCSSActionClass } from '../../Stores';
import { get } from 'svelte/store';
import { random } from './helperFunctions';
import { calculate, compare } from 'specificity';
import rgbHex from 'rgb-hex';

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
    for (const rule of sheet.cssRules) {
      const selector = (rule as CSSStyleRule).selectorText;

      selector.split(',').forEach((selectorUnit) => {
        if (element.matches(selectorUnit)) {
          for (let prop of props) {
            let selectorInfo: { [key: string]: string } = {};

            let propValue = (rule as CSSStyleRule).style[prop as any];
            if (propValue) selectorInfo[selectorUnit] = propValue;

            // figure out the specificty --->
            if (Object.keys(selectorInfo).length > 1) {
              const highestSpecificitySelector: string = findHighestSpecificity(selectorInfo);
              styles[prop] = selectorInfo[highestSpecificitySelector];
            } else if (Object.keys(selectorInfo).length === 1) {
              styles[prop] = Object.values(selectorInfo)[0];
            }
          }
        }
      });
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
    'padding-bottom',
    'font-size',
    'line-height',
    'border-width',
    'border-top-width',
    'border-bottom-width',
    'border-left-width',
    'border-right-width'
  ]);

  function removePxUnit(property: string, defaultValue: string) {
    let CSSValue: string = userSetStyles[property];

    if (CSSValue) CSSValue = CSSValue.endsWith('px') ? CSSValue.replace('px', '') : CSSValue;
    else CSSValue = defaultValue;

    return CSSValue;
  }

  // Display properties ------->
  style.display = computedStyle.display;

  style.flexDirection = computedStyle.flexDirection;

  let alignItemsValue = computedStyle.alignItems;
  style.alignItems = alignItemsValue === 'normal' ? 'stretch' : alignItemsValue;

  let justifyContent = computedStyle.justifyContent;
  style.justifyContent = justifyContent === 'normal' ? 'flex-start' : justifyContent;

  // Sizing properties ------->
  if (!style.width) style.width = removePxUnit('width', 'Auto');

  if (!style.height) style.height = removePxUnit('height', 'Auto');

  if (!style.maxWidth) style.maxWidth = removePxUnit('max-width', 'None');

  if (!style.maxHeight) style.maxHeight = removePxUnit('max-height', 'None');

  if (!style.minWidth) style.minWidth = removePxUnit('min-width', '0');

  if (!style.minHeight) style.minHeight = removePxUnit('min-height', '0');

  if (!style.overflow) style.overflow = computedStyle.overflow;

  // Spacing properties ------->
  if (!style.marginTop) style.marginTop = removePxUnit('margin-top', '0');

  if (!style.marginLeft) style.marginLeft = removePxUnit('margin-left', '0');

  if (!style.marginRight) style.marginRight = removePxUnit('margin-right', '0');

  if (!style.marginBottom) style.marginBottom = removePxUnit('margin-bottom', '0');

  if (!style.paddingTop) style.paddingTop = removePxUnit('padding-top', '0');

  if (!style.paddingLeft) style.paddingLeft = removePxUnit('padding-left', '0');

  if (!style.paddingRight) style.paddingRight = removePxUnit('padding-right', '0');

  if (!style.paddingBottom) style.paddingBottom = removePxUnit('padding-bottom', '0');

  // Typography properties ------->
  if (!style.fontStyle) style.fontStyle = computedStyle.fontStyle;

  if (!style.textAlign) {
    // Proper support for languages that starts from RTL will be added later
    if (computedStyle.textAlign === 'start') style.textAlign = 'left';
    else if (computedStyle.textAlign === 'end') style.textAlign = 'right';
    else style.textAlign = computedStyle.textAlign;
  }

  if (!style.fontSize) style.fontSize = removePxUnit('font-size', computedStyle.fontSize.replace('px', ''));

  style.lineHeight = removePxUnit('line-height', computedStyle.lineHeight);

  style.textDecoration = computedStyle.textDecoration.split(' ')[0];
  style.fontWeight = computedStyle.fontWeight;
  style.fontFamily = computedStyle.fontFamily.replace(/['"]/g, '').split(',')[0].trim();

  style.color = '#' + rgbHex(computedStyle.color);
  style.backgroundColor = '#' + rgbHex(computedStyle.backgroundColor);

  style.direction = computedStyle.direction;
  style.textTransform = computedStyle.textTransform;

  if (computedStyle.borderRadius.split(' ').length > 1) style.borderRadius = '';
  else style.borderRadius = computedStyle.borderRadius.replace('px', '');

  style.borderTopLeftRadius = computedStyle.borderTopLeftRadius.replace('px', '');
  style.borderTopRightRadius = computedStyle.borderTopRightRadius.replace('px', '');
  style.borderBottomLeftRadius = computedStyle.borderBottomLeftRadius.replace('px', '');
  style.borderBottomRightRadius = computedStyle.borderBottomRightRadius.replace('px', '');

  if (computedStyle.borderWidth.split(' ').length > 1) style.borderWidth = '';
  else style.borderWidth = removePxUnit('border-width', computedStyle.borderWidth.replace('px', ''));

  style.borderTopWidth = removePxUnit('border-top-width', computedStyle.borderTopWidth.replace('px', ''));
  style.borderBottomWidth = removePxUnit(
    'border-bottom-width',
    computedStyle.borderBottomWidth.replace('px', '')
  );
  style.borderLeftWidth = removePxUnit('border-left-width', computedStyle.borderLeftWidth.replace('px', ''));
  style.borderRightWidth = removePxUnit(
    'border-right-width',
    computedStyle.borderRightWidth.replace('px', '')
  );

  style.borderStyle = computedStyle.borderStyle;

  style.borderColor = '#' + rgbHex(computedStyle.borderColor);

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

class cssUtility {
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

    // write rules to stylesheet
    let styleTag = this.iFrameDoc.getElementById('visually-default-stylesheet') as HTMLStyleElement;
    let styleSheet = styleTag.sheet as CSSStyleSheet;

    styleSheet.insertRule(getSelector(this.element) + `{${property}: ${value}}`, styleSheet.cssRules.length);

    // console.log(styleSheet.cssRules);

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

export const CSSUtility = new cssUtility();
