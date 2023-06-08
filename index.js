const audio = new Audio();
audio.src = 'http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a';

function makeAttention() {
  document.title = "!! ВНИМАНИЕ !!";
  audio.play();

  setTimeout(() => makeAttention(), 800);
}

function getBlockElement() {
  return document.querySelector('#timeTable');
}

const blockElement = getBlockElement();
if (!blockElement) {
  makeAttention();
}

if (!localStorage.getItem('savedBlock')) {
  localStorage.setItem('savedBlock', blockElement?.outerHTML);
}

setTimeout(() => {
  window.scroll(0, 0);
  window.scrollBy(0, 130);
}, 900);

const blockHtml = blockElement?.outerHTML;
const savedHtml = localStorage.getItem('savedBlock');

if (blockHtml !== savedHtml) {
  makeAttention();
  localStorage.setItem('savedBlock', blockElement?.outerHTML);
}
