setTimeout(() => {
  window.scroll(0, 0);
  window.scrollBy(0, 130);
}, 900);

const CLASS_TO_FIND = 'a.dispo';
const allGreenSlots = document.querySelectorAll(CLASS_TO_FIND);

const DATES = () => {
  document.title = "!! ДАТЫ !!";
  const audio = new Audio();
  audio.src = 'http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a';

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
    const isOnlyPrimeLeft = [...allGreenSlots].every((slot) => primeTime.includes(slot.innerHTML));

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
        return clickNoPrimeDate();
      }
      slotToClick.click();
    }

    clickNoPrimeDate();
  }

  const catchPrimeOrRandomDateSlot = () => {
    const first = '16:00';
    const second = '15:30';

    let primeSlotIndex = [...allGreenSlots].findIndex((slot) => slot.innerHTML === first);

    if (primeSlotIndex === -1) {
      primeSlotIndex = [...allGreenSlots].findIndex((slot) => slot.innerHTML === second);
    }

    if (primeSlotIndex >= 0) {
      allGreenSlots[primeSlotIndex].click();
    } else {
      const randomSlotNumber = getRandomNumber(0, allGreenSlots.length);
      const slotToClick = allGreenSlots[randomSlotNumber];
      slotToClick.click();
    }
  }

  // -----------------------------------------------------------------------

  catchRandomDateSlot(); // for ALL slots
  // catchNoPrimeDateSlot(); // for NO PRIME slots
  // catchNoPrimeDateSlot(true); // for NO PRIME or if only prime - ANY slot
  // catchPrimeOrRandomDateSlot(); // for PRIME or any

  // -----------------------------------------------------------------------

  const makeAttention = () => {
    audio.play();
    setTimeout(() => makeAttention(), 800);
  };

  makeAttention()
}

if (allGreenSlots.length) {
  DATES();
}

const login = () => {
  const loginBtn = document.querySelector('input[value="Log in"]');

  if (loginBtn) {
    const emailInput = document.getElementById('email');
    const pwdInput = document.getElementById('pwd');

    const newLoginBtn = document.createElement("button");
    newLoginBtn.innerHTML = "ЛОГИН";
    newLoginBtn.classList.add("my-login-btn");

    newLoginBtn.addEventListener("click", () => {
      const LOGIN = "login@gmail.com";
      const PASSWORD = "my password";

      emailInput.value = LOGIN;
      pwdInput.value = PASSWORD;

      loginBtn.click();
    });

    const body = document.getElementsByTagName("body")[0];
    body.appendChild(newLoginBtn);
  }
}
login();