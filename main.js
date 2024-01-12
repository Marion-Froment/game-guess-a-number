import "./styles.scss";

const gameStartButton = document.getElementById("gameStart");

if (gameStartButton) {
  gameStartButton.addEventListener("click", function () {
    window.location.href = "game.html";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initializeGame();
});

function initializeGame() {
  let randomNumber = generateRandomNumber();
  console.log(randomNumber);
  const numberInput = document.getElementById("number");
  const submitButton = document.getElementById("submitButton");
  const attemptsDisplay = document.getElementById("attemptsDisplay");
  const tooSmallColumn = document.getElementById("tooSmallColumn");
  const tooLargeColumn = document.getElementById("tooLargeColumn");
  const messageDisplay = document.getElementById("messageDisplay");
  const popup = document.getElementById("success-box");
  const previousWrongAttemptsDisplay = document.getElementById(
    "previousWrongAttempts"
  );
  let attemptsCounter = 0;
  let previousWrongAttempts = [];

  function generateRandomNumber() {
    return Math.floor(Math.random() * 501);
  }

  function isValidGuess(guess) {
    return !isNaN(guess) && guess >= 0 && guess <= 500;
  }

  function handleIncorrectGuess(userGuess) {
    if (!previousWrongAttempts.includes(userGuess)) {
      previousWrongAttempts.push(userGuess);

      const listItem = document.createElement("li");
      listItem.textContent = `${userGuess}`;

      if (userGuess < randomNumber) {
        tooSmallColumn.appendChild(listItem);
      } else {
        tooLargeColumn.appendChild(listItem);
      }
    }

    messageDisplay.innerHTML = `The number entered is too <span class="highlight">${
      userGuess < randomNumber ? "small" : "big"
    }</span> !`;
    numberInput.value = "";
  }

  function resetGame() {
    resetGameData();
    updateDisplay();
    resetColumns();
  }
  function resetColumns() {
    tooSmallColumn.innerHTML = "";
    tooLargeColumn.innerHTML = "";
  }

  function resetGameData() {
    randomNumber = generateRandomNumber();
    attemptsCounter = 0;
    previousWrongAttempts = [];
  }
  function updateDisplay() {
    attemptsDisplay.textContent = `Attempt: ${attemptsCounter}`;
    previousWrongAttemptsDisplay.textContent =
      "Previous wrong attempts: " + previousWrongAttempts;
    numberInput.value = "";
    document.getElementById("messageDisplay").textContent = "";
  }

  submitButton.addEventListener("click", function () {
    const userGuess = parseInt(numberInput.value, 10);

    if (!isValidGuess(userGuess)) {
      messageDisplay.textContent =
        "Please enter valid number between 0 and 500.";
    } else {
      attemptsCounter++;
      attemptsDisplay.textContent = `Attempt${
        attemptsCounter <= 1 ? "" : "s"
      }: ${attemptsCounter}`;

      if (userGuess < randomNumber || userGuess > randomNumber) {
        handleIncorrectGuess(userGuess);
      } else {
        displayVictoryMessage();
      }
    }
  });
  function displayVictoryMessage() {
    const messageVictory = document.getElementById("messageVictory");
    messageVictory.innerHTML = `You found the number in ${attemptsCounter} tr${
      attemptsCounter <= 1 ? "y" : "ies"
    }!`;
    popup.style.display = "block";
  }

  function restartGame() {
    popup.style.display = "none";
    resetGame();
  }

  numberInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      submitButton.click();
    }
  });

  document.getElementById("restartGame").addEventListener("click", restartGame);
}
