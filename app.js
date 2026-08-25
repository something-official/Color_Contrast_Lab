const foreground = document.querySelector('#foreground');
const background = document.querySelector('#background');
const result = document.querySelector('#result');

function channel(value) {
  const number = parseInt(value, 16) / 255;
  return number <= 0.03928 ? number / 12.92 : ((number + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  return 0.2126 * channel(hex.slice(1, 3)) + 0.7152 * channel(hex.slice(3, 5)) + 0.0722 * channel(hex.slice(5, 7));
}

function render() {
  const light = Math.max(luminance(foreground.value), luminance(background.value));
  const dark = Math.min(luminance(foreground.value), luminance(background.value));
  const ratio = (light + 0.05) / (dark + 0.05);
  const status = ratio >= 7 ? 'AAA for normal text' : ratio >= 4.5 ? 'AA for normal text' : 'Review this combination';
  result.style.color = foreground.value;
  result.style.background = background.value;
  result.innerHTML = '<strong>' + ratio.toFixed(2) + ':1</strong><span>' + status + '</span>';
}

foreground.addEventListener('input', render);
background.addEventListener('input', render);
render();