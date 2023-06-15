const audio = new Audio();
audio.src = 'http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a';

function makeAttention() {
  document.title = "!! ДАТЫ !!";
  audio.play();

  setTimeout(() => makeAttention(), 800);
}

function getBlockElement() {
  return document.querySelector('#timeTable');
}

const blockElement = getBlockElement();
if (!blockElement) {
  document.title = "-- нет слотов";
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

// -----

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const catchDateSlot = (classToClick) => {
  const allGreenSlots = document.querySelectorAll(classToClick);

  console.log('allGreenSlots', allGreenSlots.length);

  if (allGreenSlots.length) {
    const randomSlotNumber = getRandomNumber(0, allGreenSlots.length);
    const slotToClick = allGreenSlots[randomSlotNumber];
    slotToClick.click();
  }
}

const CLASS_TO_FIND = 'a.dispo'
catchDateSlot(CLASS_TO_FIND);