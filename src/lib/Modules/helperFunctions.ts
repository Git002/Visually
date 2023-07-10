// calculating the outline box pixels for helper divs
export function calculateRect(element: HTMLElement, selector: HTMLDivElement) {
  let rect = element.getBoundingClientRect();
  selector.style.width = rect.width + 'px';
  selector.style.height = rect.height + 'px';
  selector.style.top = rect.top + 'px';
  selector.style.left = rect.left + 'px';
}
