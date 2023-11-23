let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:

const generateTarget = () => {
  return Math.floor(Math.random() * 10);
};

const compareGuesses = (player, computer, target) => {
  if (player < 0 || player > 9) {
    return alert("invalid input");
  }

  let playerDelta = getAbsoluteDistance(player, target);
  let computerDelta = getAbsoluteDistance(computer, target);

  //   playerDelta = Math.abs(playerDelta);
  //   computerDelta = Math.abs(computerDelta);

  if (playerDelta === computerDelta) {
    return true;
  } else if (playerDelta < computerDelta) {
    return true;
  } else {
    return false;
  }
};

const updateScore = (winner) => {
  if (winner === "human") {
    humanScore++;
  } else if (winner === "computer") {
    computerScore++;
  }
};

const advanceRound = () => {
  currentRoundNumber++;
};

const getAbsoluteDistance = (guess, target) => {
  return Math.abs(guess - target);
};
