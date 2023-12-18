setTimeout(() => {
    window.scroll(0, 0);
    window.scrollBy(0, 130);
}, 900);

const CLASS_TO_FIND = 'a.dispo';
const allGreenSlots = document.querySelectorAll(CLASS_TO_FIND);

const DATES = () => {
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
    sendToTG();
    DATES();
}

// =============== LOGIN ================

const loginBtn = document.querySelector('input[value="Log in"]');
const login = () => {
    const people = [{
        label: "Name",
        login: "example@mail.com",
        pass: "pas123",
    }, {
        label: "Name 2",
        login: "example@mail.com",
        pass: "pas123",
    }];

    const emailInput = document.getElementById('email');
    const pwdInput = document.getElementById('pwd');

    let btnStartIndex = 1;
    people.forEach((person) => {
        const newLoginBtn = document.createElement("button");
        newLoginBtn.innerHTML = person.label;
        newLoginBtn.classList.add(`my-login-btn${btnStartIndex++}`);

        newLoginBtn.addEventListener("click", () => {
            emailInput.value = person.login;
            pwdInput.value = person.pass;

            loginBtn.click();
            setTimeout(() => loginBtn.click(), 1000);
        });

        body.appendChild(newLoginBtn);
    });
}

if (loginBtn) {
    login();
}

// ============== REGISTER ================

const userForRegister = null; // { email: '', pwd: '' };
const registerBtn = document.querySelector('input[value="Create"]');
const register = () => {
    const emailInput = document.getElementById('u_email');
    const email2Input = document.getElementById('u_email_confirm');
    const passwordInput = document.getElementById('u_password');
    const password2Input = document.getElementById('u_password_confirm');

    emailInput.value = userForRegister?.email;
    email2Input.value = userForRegister?.email;
    passwordInput.value = userForRegister?.pwd;
    password2Input.value = userForRegister?.pwd;

    registerBtn.click();
};

if (userForRegister && registerBtn) {
    register();
}

// ============ TG ==========

function sendToTG() {
    // ВСТАВИТЬ НИЖЕ 2 строчки -----



    // ------

    fetch(`https://api.telegram.org/bot${bot_token}/sendMessage`, {
        method: "POST",
        body: JSON.stringify({
            chat_id,
            parse_mode: "HTML",
            text: `ДАТЫ ДАТЫ ДАТЫ [${allGreenSlots.length}] - ${[...allGreenSlots].map((slot) => slot.innerHTML).join(', ')}`,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}
