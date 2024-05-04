// copy of array, the original array is not changed
const allFlags = [...flags];
let optionFlags = [];

// getting the elements to the DOM
const form = document.querySelector("#formEl");
const userInput = document.querySelector("#inputField");
const startButton = document.querySelector("#startBtn");
const mainDiv = document.querySelector("#firstDiv");
const gameDiv = document.querySelector("#secondDiv");
const resultDiv = document.querySelector("#thirdDiv");
const img = document.querySelector("#imgDisplayer");
const invFeedback = document.querySelector(".feedback");
const guessButtons = document.querySelector("#guessButtons");
const guessDisplay = document.querySelector("#guesses");
const resetButton = document.querySelector("#resetBtn");

let questionsLength = 0;
let currentQuestion = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

// function to get the value from the input field
form.addEventListener("submit", (e) => {
  e.preventDefault();
  questionsLength = Number(userInput.value);
  if (questionsLength < 1 || questionsLength > flags.length) {
    invFeedback.innerHTML = document.createElement("P");
    invFeedback.innerHTML = `Enter a valid number between 1 and ${flags.length}`;
    return;
  }

  // call to start the game
  setupQuestion();

  // if everything passes, re-direct to the guessing page
  mainDiv.remove();
  gameDiv.removeAttribute("id");
});

const setupQuestion = () => {
  currentQuestion++;
  if (currentQuestion > questionsLength) {
    // show the result
    const result = document.querySelector("#result");
    result.textContent = `You got ${correctAnswers} correct of totally ${questionsLength} questions`;

    // when clicked, resets the page
    resetButton.addEventListener("click", (e) => {
      e.preventDefault();
      location.reload();
    });

    gameDiv.remove();
    resultDiv.removeAttribute("id");
    return;
  }

  const flagToGuess = getflag(allFlags);
  const options = [flagToGuess.name]; // push the student to guess to the options array
  optionFlags = flags.filter(
    (flag) => flag.id !== flagToGuess.id
  );

  // get 3 random names and push to the options
  for (let i = 0; i < 3; i++) {
    options.push(getflag(optionFlags).name); // push()? in getStudent(optionStudents) to get .name from students
  }

  // shuffle options
  shuffleArray(options);

  // displaying the images
  img.src = flagToGuess.image;
  img.alt = flagToGuess.name;

  guessButtons.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    const btn = document.createElement("button");
    btn.textContent = options[i];
    btn.classList.add("btn");
    btn.classList.add("text-center");
    btn.classList.add("btn-primary");
    btn.classList.add("w-50");
    btn.classList.add("justify-content-center");
    btn.classList.add("align-items-center");
    btn.addEventListener("click", (e) => {
      checkAnswer(e.target.textContent, flagToGuess.name);
    });
    guessButtons.appendChild(btn);
  }

  guessDisplay.textContent = `Question ${currentQuestion} of ${questionsLength}`;
};

// function to checkanswer
const checkAnswer = (value, correctValue) => {
  if (value === correctValue) {
    correctAnswers++;
  } else {
    wrongAnswers++;
  }

  setupQuestion();
};

// function to get a unique student
const getflag = (flags) => {
  const randomNum = getRandomNumber(0, flags.length - 1);
  const removedElements = flags.splice(randomNum, 1);
  return removedElements[0];
};

// function to get a random number
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// function for shuffling the array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
