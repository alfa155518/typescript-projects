"use strict";
let gameName = "Guess The Word";
document.title = gameName;
let hadGame = document.querySelector("h1");
hadGame.innerHTML = gameName;
let numbersOfTries = 6;
let numbersOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;
let wordToGuess = '';
const words = ['create', 'update', 'delete', 'master', 'branch', 'minaly', 'elzero'];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector('.message');
const getHintsButton = document.querySelector('.hint');
getHintsButton.addEventListener('click', getHint);
let spanHint = document.querySelector('.hint span');
spanHint.innerHTML = numberOfHints;
function generateInput() {
    var _a, _b, _c;
    const inputsContainer = document.querySelector(".inputs");
    for (let i = 1; i <= numbersOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;
        if (i !== 1)
            tryDiv.classList.add("disabled-inputs");
        for (let j = 1; j <= numbersOfLetters; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength", "1");
            tryDiv.appendChild(input);
        }
        inputsContainer === null || inputsContainer === void 0 ? void 0 : inputsContainer.appendChild(tryDiv);
    }
    (_c = (_b = (_a = inputsContainer === null || inputsContainer === void 0 ? void 0 : inputsContainer.children) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.children[1]) === null || _c === void 0 ? void 0 : _c.focus();
    const inputsInDisabledDiv = document.querySelectorAll('.disabled-inputs input');
    inputsInDisabledDiv.forEach((input) => (input.disabled = true));
    const allInputs = inputsContainer === null || inputsContainer === void 0 ? void 0 : inputsContainer.querySelectorAll('input');
    allInputs === null || allInputs === void 0 ? void 0 : allInputs.forEach((input, index) => {
        input.addEventListener("input", e => {
            e.target.value = e.target.value.toLowerCase();
            const nextInput = allInputs[index + 1];
            if (nextInput)
                nextInput.focus();
        });
        input.addEventListener("keydown", e => {
            e.target.value = e.target.value.toLowerCase();
            let targetIndex = e.target;
            let currentIndex = Array.from(allInputs).indexOf(targetIndex);
            if (e.key === 'ArrowRight') {
                const nextInput = currentIndex + 1;
                if (nextInput < allInputs.length)
                    allInputs[nextInput].focus();
                console.log(allInputs[nextInput]);
            }
            if (e.key === 'ArrowLeft') {
                const pervious = currentIndex - 1;
                if (pervious >= 0)
                    allInputs[pervious].focus();
                console.log(allInputs[pervious]);
            }
        });
    });
}
console.log(wordToGuess);
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);
function handleGuesses() {
    var _a, _b;
    let successGuess = true;
    for (let i = 1; i <= numbersOfLetters; i++) {
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        let letter = inputField.value.toLowerCase();
        let actualLetter = wordToGuess[i - 1];
        if (letter === actualLetter) {
            inputField.classList.add("in-place");
        }
        else if (wordToGuess.includes(letter) && letter !== "") {
            inputField.classList.add("not-in-place");
            successGuess = false;
        }
        else {
            inputField.classList.add("no");
            successGuess = false;
        }
    }
    if (successGuess) {
        if (numberOfHints === 2) {
            messageArea.innerHTML = `congrats You Win The Word Is <p>${wordToGuess}</p>`;
        }
        else {
            messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;
        }
        let allTries = document.querySelectorAll('.inputs > div');
        allTries.forEach((tryDiv) => tryDiv.classList.add('disabled-inputs'));
        guessButton.disabled = true;
        getHintsButton.disabled = true;
    }
    else {
        let perviousTry = document.querySelector(`.try-${currentTry}`);
        perviousTry.classList.add('disabled-inputs');
        perviousTry.querySelectorAll('input').forEach((input) => { input.disabled = true; });
        currentTry++;
        (_a = document.querySelector(`.try-${currentTry}`)) === null || _a === void 0 ? void 0 : _a.classList.remove('disabled-inputs');
        let nextTries = document.querySelectorAll(`.try-${currentTry} input`);
        nextTries.forEach((inputs) => { inputs.disabled = false; });
        const lastTry = document.querySelector(`.try-${currentTry}`);
        if (lastTry) {
            (_b = document.querySelector(`.try-${currentTry}`)) === null || _b === void 0 ? void 0 : _b.classList.remove('disabled-inputs');
            let firstInput = lastTry.children[1];
            firstInput.focus();
        }
        else {
            guessButton.disabled = true;
            messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
        }
    }
}
function getHint() {
    if (numberOfHints > 0) {
        numberOfHints--;
        spanHint.innerHTML = numberOfHints;
    }
    if (numberOfHints === 0) {
        getHintsButton.disabled = true;
    }
    const enabledInputs = document.querySelectorAll('input:not([disabled])');
    const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === '');
    if (emptyEnabledInputs.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        let randomInput = emptyEnabledInputs[randomIndex];
        let indexToFill = Array.from(enabledInputs).indexOf(randomInput);
        if (indexToFill !== -1) {
            randomInput.value = wordToGuess[indexToFill];
        }
    }
}
function handelBackspace(e) {
    if (e.key === 'Backspace') {
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        if (currentIndex > 0) {
            let currentInput = inputs[currentIndex];
            let perviousInput = inputs[currentIndex - 1];
            currentInput.value = '';
            perviousInput.value = '';
            perviousInput.focus();
        }
    }
}
document.addEventListener("keydown", handelBackspace);
window.onload = function () {
    generateInput();
};
