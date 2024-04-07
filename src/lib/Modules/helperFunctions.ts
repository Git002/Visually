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

export function setMiniInputBarStyle(e: CustomEvent) {
  let targetInput = e.detail.target;
  if (targetInput.value === targetInput.computedValue) return;

  console.log(targetInput.id, targetInput.value + 'px');

  if (Number(targetInput.value)) {
    CSSUtility.writeCSS(targetInput.id, targetInput.value + 'px');
  } else if (CSS.supports(targetInput.id, targetInput.value)) {
    CSSUtility.writeCSS(targetInput.id, targetInput.value);
  }

  targetInput.value = targetInput.computedValue;
}
