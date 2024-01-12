"use strict";

import "./styles.scss";

document.addEventListener("DOMContentLoaded", function () {
  let randomNumber = generateRandomNumber();
  console.log(randomNumber);
  const numberInput = document.getElementById("number");
  const submitButton = document.getElementById("submitButton");
  const attemptsDisplay = document.getElementById("attemptsDisplay");
  const previousWrongAttemptsDisplay = document.getElementById(
    "previousWrongAttempts"
  );
  let attemptsCounter = 0;
  let previousWrongAttempts = [];

  attemptsDisplay.textContent = `Attempt${
    attemptsCounter <= 1 ? "" : "s"
  }: ${attemptsCounter}`;

  function generateRandomNumber() {
    return Math.floor(Math.random() * 501);
  }

  function isValidGuess(guess) {
    return !isNaN(guess) && guess >= 0 && guess <= 500;
  }

  function handleIncorrectGuess(userGuess) {
    const messageDisplay = document.getElementById("messageDisplay");
    const tooSmallColumn = document.getElementById("tooSmallColumn");
    const tooLargeColumn = document.getElementById("tooLargeColumn");

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

    messageDisplay.innerHTML = `Le chiffre entré est trop <span class="highlight">${
      userGuess < randomNumber ? "petit" : "grand"
    }</span> !`;
    numberInput.value = "";
  }

  function resetGame() {
    randomNumber = generateRandomNumber();
    attemptsCounter = 0;
    attemptsDisplay.textContent = `Attempt: ${attemptsCounter}`;
    previousWrongAttemptsDisplay.textContent =
      "Previous wrong attempts: " + previousWrongAttempts;
    numberInput.value = "";
  }

  submitButton.addEventListener("click", function () {
    const userGuess = parseInt(numberInput.value, 10);
    const messageDisplay = document.getElementById("messageDisplay");

    if (!isValidGuess(userGuess)) {
      messageDisplay.textContent =
        "Veuillez entrer un nombre valide entre 0 et 500.";
    } else {
      attemptsCounter++;
      attemptsDisplay.textContent = `Attempt${
        attemptsCounter <= 1 ? "" : "s"
      }: ${attemptsCounter}`;

      if (userGuess < randomNumber || userGuess > randomNumber) {
        handleIncorrectGuess(userGuess);
      } else {
        messageDisplay.textContent = `Félicitations ! Vous avez trouvé le nombre en ${attemptsCounter} essai${
          attemptsCounter <= 1 ? "" : "s"
        } !`;
        resetGame();
      }
    }
  });

  numberInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      submitButton.click();
    }
  });
});
