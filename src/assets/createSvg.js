export function createSVG(svgContent) {
  const wrapper = document.createElement('div');

  wrapper.innerHTML = svgContent;

  return wrapper.firstChild;
}
