const audio = new Audio();
audio.src = 'http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a';

function makeAttention() {
  document.title = "!! ДАТЫ !!";
  audio.play();

  setTimeout(() => makeAttention(), 800);
}

setTimeout(() => {
  window.scroll(0, 0);
  window.scrollBy(0, 130);
}, 900);

const CLASS_TO_FIND = 'a.dispo';
const allGreenSlots = document.querySelectorAll(CLASS_TO_FIND);

function getRandomNumber(min, max) { // max excluded
  return Math.floor(Math.random() * (max - min) + min);
}

const catchRandomDateSlot = () => {
  const randomSlotNumber = getRandomNumber(0, allGreenSlots.length);
  const slotToClick = allGreenSlots[randomSlotNumber];
  slotToClick.click();
}

const catchNoPrimeDateSlot = (clickPrimeIfOnlyPrimeIsLeft = false) => {
  const primeTime = ['15:30', '16:00'];
  const isOnlyPrimeLeft = allGreenSlots.every((slot) => primeTime.includes(slot.innerHTML));


  if (isOnlyPrimeLeft) {
    if (clickPrimeIfOnlyPrimeIsLeft) {
      catchRandomDateSlot();
    }
    return;
  }

  const clickNoPrimeDate = () => {
    const randomSlotNumber = getRandomNumber(0, allGreenSlots.length);
    const slotToClick = allGreenSlots[randomSlotNumber];
    if (primeTime.includes(slotToClick.innerHTML)) {
      clickNoPrimeDate();
    }
    slotToClick.click();
  }

  clickNoPrimeDate();
}

if (allGreenSlots.length) {
  catchRandomDateSlot(); // for ALL slots
  // catchNoPrimeDateSlot(); // for NO PRIME slots
  // catchNoPrimeDateSlot(true); // for NO PRIME or if only prime - ANY slot

  makeAttention();
}
