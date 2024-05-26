import { CSSUtility } from '$lib/Modules/cssFunctions';

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

// validating style changes
export function setMiniInputBarStyle(e: CustomEvent) {
  let targetInput = e.detail.target;
  if (targetInput.value === targetInput.computedValue) return;

  if (Number(targetInput.value)) {
    CSSUtility.writeCSS(targetInput.id, targetInput.value + 'px');
  } else if (CSS.supports(targetInput.id, targetInput.value)) {
    CSSUtility.writeCSS(targetInput.id, targetInput.value);
  }

  targetInput.value = targetInput.computedValue;
}

// for contenteditable
export function handleEnterEvent(iFrameDoc: Document) {
  const selection = iFrameDoc.getSelection();

  if (!selection?.rangeCount) return;

  const range = selection.getRangeAt(0);
  let currentNode = range.startContainer as Text;
  let currentOffset = range.startOffset;

  let nextNode = null;

  // If cursor is at the end of the text node, get the next sibling
  if (currentNode.nodeType === Node.TEXT_NODE) {
    if (currentOffset + 1 >= currentNode.length) nextNode = currentNode.nextElementSibling;
    else nextNode = currentNode.textContent?.[currentOffset];
  }

  // If current node is an element, check the next sibling
  else if (currentNode.nodeType === Node.ELEMENT_NODE) {
    if (currentNode.childNodes.length > 1) nextNode = currentNode.childNodes[currentOffset - 1];
  }

  // Create and insert the first <br> element
  const br1 = iFrameDoc.createElement('br');
  range.insertNode(br1);
  range.setStartAfter(br1);
  range.collapse(true);

  // if <br> is not present then insert second <br>, otherwise skip it
  if (!nextNode) {
    const br2 = iFrameDoc.createElement('br');
    range.insertNode(br2);
    range.setStartAfter(br2);
    range.collapse(true);
  }
}
