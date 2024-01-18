const prompt = require("prompt-sync")({ sigint: true });

//random number from 1 to 10;
const numberToGuess = Math.floor(Math.random() * 10) + 1;
let foundCorrectNumber = false;

while (!foundCorrectNumber) {
  let guess = prompt("Guess a number between 1 and 10: ");

  guess = Number(guess); //convert str to number;

  if (guess === numberToGuess) {
    console.log("You guessed the correct number!");
    foundCorrectNumber = true;
  } else {
    console.log("Sorry guess again!");
  }
}
