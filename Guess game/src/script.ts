// Setting Game Name

let gameName: string = "Guess The Word";

document.title = gameName;

let hadGame = <HTMLHeadElement>document.querySelector("h1");

hadGame.innerHTML = gameName;



// Setting Game Options

let numbersOfTries = 6;
let numbersOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;


// Manage Words 
let wordToGuess:string = '';

// Array Of Words
const words = ['create','update','delete','master','branch','minaly','elzero'];

// Random Word
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase()

// Message Success
let messageArea = <HTMLDivElement> document.querySelector('.message')



// Manage Hints

const getHintsButton =<HTMLButtonElement> document.querySelector('.hint')

getHintsButton.addEventListener('click',getHint)
let spanHint:any =  document.querySelector('.hint span');
spanHint.innerHTML = numberOfHints;



// Generate Function 
function generateInput() {
    const inputsContainer = document.querySelector(".inputs");

    // Generate Tries
    for (let i = 1; i <= numbersOfTries; i++) {

        const tryDiv = document.createElement("div");

        tryDiv.classList.add(`try-${i}`);

        tryDiv.innerHTML = `<span>Try ${i}</span>`;

        if (i !== 1) tryDiv.classList.add("disabled-inputs");

        // Generate Tries Input 
        for (let j = 1; j <= numbersOfLetters; j++) {

            const input = document.createElement("input");

            input.type = "text";

            input.id = `guess-${i}-letter-${j}`;

            input.setAttribute("maxlength", "1");

            tryDiv.appendChild(input);
        }

        inputsContainer?.appendChild(tryDiv);
    }



    // Focus On First Input In Try Element
    (inputsContainer?.children?.[0]?.children[1] as HTMLInputElement)?.focus();

    // Add Disabled All Inputs Except First One
    const inputsInDisabledDiv = document.querySelectorAll('.disabled-inputs input')
    inputsInDisabledDiv.forEach((input) => ((input as HTMLInputElement).disabled = true))


    const allInputs = inputsContainer?.querySelectorAll('input')


    allInputs?.forEach((input,index) => {
        input.addEventListener("input", e => {
            // Convert Input To LowerCase
            (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.toLowerCase();
            
            // Next Input 
            const nextInput =  allInputs[index + 1];
            if (nextInput) nextInput.focus();
            
        })



        input.addEventListener("keydown", e => {
            (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.toLowerCase();
            let targetIndex:any = e.target;
            let currentIndex = (Array.from(allInputs) as HTMLInputElement[]).indexOf(targetIndex)
            if (e.key === 'ArrowRight') {
                const nextInput = currentIndex + 1
                if (nextInput < allInputs.length) allInputs[nextInput].focus()
                console.log(allInputs[nextInput])
            }
            if (e.key === 'ArrowLeft') {
                const pervious = currentIndex - 1
                if (pervious >= 0) allInputs[pervious].focus()
                console.log(allInputs[pervious])
            }
            
        })


    })
}

console.log(wordToGuess)

const guessButton =<HTMLButtonElement> document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);




function handleGuesses() {
  let successGuess = true;

  for (let i = 1; i <= numbersOfLetters; i++) {

    const inputField = <HTMLInputElement>document.querySelector(`#guess-${currentTry}-letter-${i}`);

    let letter = inputField.value.toLowerCase()

    let actualLetter = wordToGuess[i - 1]


// Game Logic
    if (letter === actualLetter) {
      // Letter Is Correct And In Place
      inputField.classList.add("in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      // Letter Is Correct And Not In Place
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }

  if (successGuess) {
    // message Of Success
    if (numberOfHints === 2) {
      messageArea.innerHTML = `congrats You Win The Word Is <p>${wordToGuess}</p>`
    } else {
      messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`
    }
    // Add Disabled Class on All Tray Div
    let allTries = document.querySelectorAll('.inputs > div');
    allTries.forEach((tryDiv) => tryDiv.classList.add('disabled-inputs'))

    guessButton.disabled = true;
    getHintsButton.disabled = true;
  } else {
    
    // Add Disabled On Previous Element  
    let perviousTry =<HTMLDivElement> document.querySelector(`.try-${currentTry}`)

    perviousTry.classList.add('disabled-inputs')

    perviousTry.querySelectorAll('input').forEach((input) => {input.disabled = true})


    
    // plus number Tyres 
    currentTry++

    
    // Remove Disabled From Current Tray 
    document.querySelector(`.try-${currentTry}`)?.classList.remove('disabled-inputs')

    let nextTries =  document.querySelectorAll(`.try-${currentTry} input`)

    nextTries.forEach((inputs:any) => {inputs.disabled = false})


    // Check If Element Is Exit
    const lastTry = <HTMLDivElement> document.querySelector(`.try-${currentTry}`)
    if (lastTry) {
      document.querySelector(`.try-${currentTry}`)?.classList.remove('disabled-inputs')
      let firstInput:any = lastTry.children[1]
      firstInput.focus();
    } else {
      // Disabled Guess Button  & Show Message Lose
      guessButton.disabled = true
      messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`
    }
    
  }
}




// get Hint Function 

function getHint() {
  // decrease Number Of Hints
  if (numberOfHints > 0) {
    numberOfHints--
    spanHint.innerHTML = numberOfHints
  }

  if (numberOfHints === 0) {
    getHintsButton.disabled = true
  }


  const enabledInputs = document.querySelectorAll('input:not([disabled])')

  // Empty Input
  const emptyEnabledInputs = Array.from(enabledInputs).filter((input:any) => input.value === '')

  // Add Random Letter From Btn Hint
  if (emptyEnabledInputs.length > 0) {
    let randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length)
    
    let randomInput =<HTMLInputElement> emptyEnabledInputs[randomIndex]
    
    let indexToFill = Array.from(enabledInputs).indexOf(randomInput)

    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill]
    }
  }
}


// HandelBackspace
function handelBackspace(e:any) {
  if (e.key === 'Backspace') {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement as HTMLInputElement);

    if (currentIndex > 0) {
      let currentInput:any = inputs[currentIndex] ;
      let perviousInput = <HTMLInputElement> inputs[currentIndex - 1];
      currentInput.value = ''
      perviousInput.value = '' 
      perviousInput.focus()
    }
  }
  
}

// Handel Event Backspace
document.addEventListener("keydown",handelBackspace)

window.onload = function () {
    generateInput();
};


