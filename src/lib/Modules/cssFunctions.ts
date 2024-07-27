import { clickedElement, clickedElementStyle, iFrameDocument, cssPseudoSelector } from '../../Stores';
import { get } from 'svelte/store';
import { random } from './helperFunctions';
import { calculate, compare } from 'specificity';
import rgbHex from 'rgb-hex';
import Color from 'color';

function getBrowserDefaultValue(property: any) {
  const container = get(iFrameDocument).createElement('div');
  const element = get(clickedElement).cloneNode() as HTMLElement;

  container.style.display = 'none';
  container.appendChild(element);
  get(iFrameDocument).body.appendChild(container);

  let CSSValue = getComputedStyle(element)[property];

  element.remove();
  container.remove();

  return CSSValue;
}

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
 * Retrieve any styles set by the user instead of getting the browser's computed property. Usage:
 * `getUserSetStyles('default', element, ['width', 'max-height', 'color'])`
 */
function getUserSetStyles(
  pseudoSelector: 'default' | ':hover' | ':active' | ':focus',
  element: HTMLElement,
  props: string[]
): { [key: string]: string } {
  let styles: { [key: string]: string } = {};

  for (let sheet of get(iFrameDocument).styleSheets) {
    for (const rule of sheet.cssRules) {
      const selectors = (rule as CSSStyleRule).selectorText;

      selectors.split(',').forEach((selector) => {
        /**
         * `element.matches()` only returns true when the element state is equal to pseudo selector.
         * Which means, even if we want the `#btn` to `match()` with `#btn:hover`, it will return False until we manually hover over the `#btn` element. Then only `#btn === #btn:hover`
         * That's why we are removing the pseudo selector to trick the `match()` function
         */
        const selectorWithoutPseudoSelector =
          selector.split(':')[0].length > 0 ? selector.split(':')[0] : selector;

        if (element.matches(selectorWithoutPseudoSelector)) {
          for (let prop of props) {
            let selectorInfo: { [key: string]: string } = {};

            // `rule` might return some browser initialized values too for some props
            let propValue = (rule as CSSStyleRule).style[prop as any];

            if (!propValue) continue;

            if (pseudoSelector === 'default' && !selector.includes(':')) {
              selectorInfo[selector] = propValue;
            } else if (selector.includes(pseudoSelector)) {
              selectorInfo[selector] = propValue;
            } else {
              continue;
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
      });
    }
  }

  return styles;
}

export function processStyles(element: HTMLElement) {
  let style: { [key: string]: any } & CSSStyleDeclaration = { ...element.style };
  const stylesToCompute: string[] = [
    'display',
    'flex-direction',
    'align-items',
    'justify-content',
    'width',
    'height',
    'max-width',
    'max-height',
    'min-width',
    'min-height',
    'overflow',
    'margin-top',
    'margin-left',
    'margin-right',
    'margin-bottom',
    'padding-top',
    'padding-left',
    'padding-right',
    'padding-bottom',
    'font-style',
    'font-size',
    'text-align',
    'line-height',
    'text-decoration',
    'font-weight',
    'font-family',
    'color',
    'background-color',
    'direction',
    'text-transform',
    'border-radius',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-bottom-left-radius',
    'border-bottom-right-radius',
    'border-width',
    'border-top-width',
    'border-bottom-width',
    'border-left-width',
    'border-right-width',
    'border-style',
    'border-color'
  ];

  let userSetStyles = getUserSetStyles(get(cssPseudoSelector), element, stylesToCompute);
  let defaultStateStyles: { [key: string]: string };

  if (get(cssPseudoSelector) !== 'default') {
    defaultStateStyles = getUserSetStyles('default', element, stylesToCompute);
  }

  /**
   * Get style values from `userSetStyles{}`. If `defaultValue` is not given, then it will automatically
   * get the default browser style through `getComputedStyle()`
   */
  function getStyle(property: string, defaultValue: string | null = null): string {
    // userSetStyles could be  default, hover or of any other state
    let CSSValue: string = userSetStyles[property];

    // if state is 'default' ----->
    if (get(cssPseudoSelector) === 'default') {
      if (!CSSValue) {
        if (defaultValue !== null) CSSValue = defaultValue;
        else CSSValue = getBrowserDefaultValue(property);
      }
    }
    // if state is ':hover', ':active', ':focus' ----->
    else {
      // if hover style is empty
      if (!CSSValue) {
        CSSValue = defaultStateStyles[property];
        // if default styles are empty too
        if (!CSSValue) {
          if (defaultValue !== null) CSSValue = defaultValue;
          else CSSValue = getBrowserDefaultValue(property);
        }
      }
    }

    try {
      if (['color', 'background-color', 'border-color'].includes(property)) {
        CSSValue = '#' + rgbHex(Color(CSSValue).string());
      }
    } catch {
      CSSValue = '#' + rgbHex(Color(getBrowserDefaultValue(property)).string());
    }

    return CSSValue.endsWith('px') ? CSSValue.replace('px', '') : CSSValue;
  }

  // Display properties ------->
  if (!style.display) style.display = getStyle('display');

  if (!style.flexDirection) style.flexDirection = getStyle('flex-direction');

  if (!style.alignItems) {
    let alignItemsValue = getStyle('align-items');
    style.alignItems = alignItemsValue === 'normal' ? 'stretch' : alignItemsValue;
  }

  if (!style.justifyContent) {
    let justifyContent = getStyle('justify-content');
    style.justifyContent = justifyContent === 'normal' ? 'flex-start' : justifyContent;
  }

  // Sizing properties ------->
  if (!style.width) style.width = getStyle('width', 'Auto');

  if (!style.height) style.height = getStyle('height', 'Auto');

  if (!style.maxWidth) style.maxWidth = getStyle('max-width', 'None');

  if (!style.maxHeight) style.maxHeight = getStyle('max-height', 'None');

  if (!style.minWidth) style.minWidth = getStyle('min-width', '0');

  if (!style.minHeight) style.minHeight = getStyle('min-height', '0');

  if (!style.overflow) style.overflow = getStyle('overflow');

  // Spacing properties ------->
  if (!style.marginTop) style.marginTop = getStyle('margin-top', '0');

  if (!style.marginLeft) style.marginLeft = getStyle('margin-left', '0');

  if (!style.marginRight) style.marginRight = getStyle('margin-right', '0');

  if (!style.marginBottom) style.marginBottom = getStyle('margin-bottom', '0');

  if (!style.paddingTop) style.paddingTop = getStyle('padding-top', '0');

  if (!style.paddingLeft) style.paddingLeft = getStyle('padding-left', '0');

  if (!style.paddingRight) style.paddingRight = getStyle('padding-right', '0');

  if (!style.paddingBottom) style.paddingBottom = getStyle('padding-bottom', '0');

  // Typography properties ------->
  if (!style.fontStyle) style.fontStyle = getStyle('font-style');

  if (!style.textAlign) {
    // Proper support for languages that starts from RTL will be added later
    const textAlign = getStyle('text-align');
    if (textAlign === 'start') style.textAlign = 'left';
    else if (textAlign === 'end') style.textAlign = 'right';
    else style.textAlign = textAlign;
  }

  if (!style.fontSize) style.fontSize = getStyle('font-size');

  if (!style.lineHeight) style.lineHeight = getStyle('line-height');

  if (!style.textDecoration) style.textDecoration = getStyle('text-decoration').split(' ')[0];
  if (!style.fontWeight) style.fontWeight = getStyle('font-weight');
  if (!style.fontFamily) {
    style.fontFamily = getStyle('font-family').replace(/['"]/g, '').split(',')[0].trim();
  }

  if (!style.color) style.color = getStyle('color');
  if (!style.backgroundColor) style.backgroundColor = getStyle('background-color');

  if (!style.direction) style.direction = getStyle('direction');
  if (!style.textTransform) style.textTransform = getStyle('text-transform');

  if (style.borderRadius) {
    if (style.borderRadius.split(' ').length > 1) style.borderRadius = '';
    else style.borderRadius = style.borderRadius.replace('px', '');
  } else {
    const borderRadius = getStyle('border-radius');
    if (borderRadius.split(' ').length > 1) style.borderRadius = '';
    else style.borderRadius = borderRadius;
  }

  if (!style.borderTopLeftRadius) style.borderTopLeftRadius = getStyle('border-top-left-radius');
  if (!style.borderTopRightRadius) style.borderTopRightRadius = getStyle('border-top-right-radius');
  if (!style.borderBottomLeftRadius) style.borderBottomLeftRadius = getStyle('border-bottom-left-radius');
  if (!style.borderBottomRightRadius) style.borderBottomRightRadius = getStyle('border-bottom-right-radius');

  if (!style.borderWidth) {
    const borderWidth = getStyle('border-width');
    if (borderWidth.split(' ').length > 1) style.borderWidth = '';
    else style.borderWidth = borderWidth;
  }

  if (!style.borderTopWidth) style.borderTopWidth = getStyle('border-top-width');
  if (!style.borderBottomWidth) style.borderBottomWidth = getStyle('border-bottom-width');
  if (!style.borderLeftWidth) style.borderLeftWidth = getStyle('border-left-width');
  if (!style.borderRightWidth) style.borderRightWidth = getStyle('border-right-width');

  if (!style.borderStyle) style.borderStyle = getStyle('border-style');

  if (!style.borderColor) style.borderColor = getStyle('border-color');

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

  constructor() {
    clickedElement.subscribe((value: HTMLElement) => (this.element = value));
    iFrameDocument.subscribe((value: Document) => (this.iFrameDoc = value));
  }

  writeCSS(property: string, value: string) {
    const styleTag = this.iFrameDoc.getElementById('visually-default-stylesheet') as HTMLStyleElement;
    const styleSheet = styleTag.sheet as CSSStyleSheet;

    let selectorText = getSelector(this.element);

    if (!selectorText) {
      this.element.classList.add(this.generateNewClass());
      selectorText = getSelector(this.element);
    }

    let pseudoSelector = get(cssPseudoSelector) === 'default' ? '' : get(cssPseudoSelector);

    // write rules to stylesheet. For example => #id.class {color: red;}
    styleSheet.insertRule(
      selectorText + pseudoSelector + `{${property}: ${value}}`,
      styleSheet.cssRules.length
    );

    // console.log(selectorText + pseudoSelector + `{${property}: ${value}}`);

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
