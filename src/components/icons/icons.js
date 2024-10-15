/* eslint-disable max-len */
export const lockSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 11V9.66663" stroke="#F3F4F6" stroke-width="1.5" stroke-linecap="round"/>
<path d="M2.84521 12.5631C2.99513 13.6767 3.91742 14.549 5.03977 14.6006C5.98418 14.644 6.94353 14.6667 8 14.6667C9.05647 14.6667 10.0158 14.644 10.9602 14.6006C12.0826 14.549 13.0049 13.6767 13.1548 12.5631C13.2527 11.8365 13.3333 11.0917 13.3333 10.3333C13.3333 9.57493 13.2527 8.8302 13.1548 8.10353C13.0049 6.99 12.0826 6.11766 10.9602 6.06606C10.0158 6.02265 9.05647 6 8 6C6.94353 6 5.98418 6.02265 5.03977 6.06606C3.91742 6.11766 2.99513 6.99 2.84521 8.10353C2.74737 8.8302 2.66667 9.57493 2.66667 10.3333C2.66667 11.0917 2.74737 11.8365 2.84521 12.5631Z" stroke="#F3F4F6" stroke-width="1.5"/>
<path d="M5 6.00004V4.33337C5 2.67652 6.34315 1.33337 8 1.33337C9.3062 1.33337 10.3333 2.33337 10.6667 3.33337" stroke="#F3F4F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export const sortSvg = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.25 14.25V4.99392C11.25 4.23958 11.25 3.8624 11.4815 3.76854C11.713 3.67467 11.9854 3.94138 12.5303 4.47478L14.25 6.15818" stroke="#F3F4F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.75 3.75V13.0061C6.75 13.7604 6.75 14.1376 6.51851 14.2315C6.28701 14.3253 6.01457 14.0586 5.46967 13.5252L3.75 11.8418" stroke="#F3F4F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export const filterSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 6H6V7.2759C6 7.74377 6.16403 8.19684 6.46356 8.55627L10.5364 13.4437C10.836 13.8032 11 14.2562 11 14.7241V19L13 18V14.7241C13 14.2562 13.164 13.8032 13.4636 13.4437L17.5364 8.55627C17.836 8.19684 18 7.74377 18 7.2759V6Z" fill="white"/>
</svg>`;

function createSVG(svgContent) {
  const wrapper = document.createElement('div');

  wrapper.innerHTML = svgContent;

  return wrapper.firstChild;
}