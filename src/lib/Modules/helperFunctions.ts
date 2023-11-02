// calculating the outline box pixels for helper divs in iFrame
export function calculateRect(element: HTMLElement, selector: HTMLDivElement) {
  let rect = element.getBoundingClientRect();
  selector.style.width = rect.width + 'px';
  selector.style.height = rect.height + 'px';
  selector.style.top = rect.top + 'px';
  selector.style.left = rect.left + 'px';
}

// handle the ghost position + visibility on document as well as the iFrame
export function ghostImageHandler(top: number, left: number, display?: 'block' | 'none') {
  const ghost_img = <HTMLDivElement>document.getElementById('ghost_img');
  if (display) ghost_img.style.display = display;
  ghost_img.style.top = top + 'px';
  ghost_img.style.left = left + 'px';
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
