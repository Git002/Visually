export function calculateRect(element: HTMLElement, selector: HTMLDivElement) {
  const rect = element.getBoundingClientRect();
  selector.style.width = rect.width + 'px';
  selector.style.height = rect.height + 'px';
  selector.style.top = rect.top + 'px';
  selector.style.left = rect.left + 'px';
}

export function ghostImageHandler(left: number, top: number, display?: 'block' | 'none') {
  const ghost_img = <HTMLDivElement>document.getElementById('ghost_img');
  if (display) ghost_img.style.display = display;
  ghost_img.style.top = top + 'px';
  ghost_img.style.left = left + 'px';
}
