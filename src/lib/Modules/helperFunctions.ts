// calculating the outline box pixels for helper divs in iFrame
export function calculateRect(element: HTMLElement, selector: HTMLDivElement) {
  let rect = element.getBoundingClientRect();
  selector.style.width = rect.width + 'px';
  selector.style.height = rect.height + 'px';
  selector.style.top = rect.top + 'px';
  selector.style.left = rect.left + 'px';
}

// for generating random string
export function random(length: number, numbers: boolean = false, special_char: boolean = false) {
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
