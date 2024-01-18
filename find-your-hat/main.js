const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.locationX = 0;
    this.locationY = 0;
    //set player position to 0,0 at game start.
    this.field[0][0] = pathCharacter;
  }

  runGame() {
    //generate field, print field, then play the game
    // ask for next move, check for hat/OOB/hole, next move

    let inSession = true;

    while (inSession) {
      // this.print();

      this.nextMove();

      //check OOB/Hole/Hat

      //update map with pathCharacter
      this.field[this.locationY][this.locationX] = pathCharacter;
    }
  }

  nextMove() {
    // Prompt for a movement and if the move isnt valid, recall prompt;

    const move = prompt("Next move? ").toUpperCase();

    switch (move) {
      case "W":
        this.locationY -= 1;
        break;
      case "A":
        this.locationX -= 1;
        break;
      case "S":
        this.locationY += 1;
        break;
      case "D":
        this.locationX += 1;
        break;
      default:
        console.log("Input a WASD movement.");
        this.nextMove();
        break;
    }
  }

  print() {
    const displayString = this.field
      .map((row) => {
        return row.join("");
      })
      .join("\n");
    console.log(displayString);
  }

  static generateField(height, width, percentage = 0.1) {
    const field = new Array(height).fill(0).map((el) => new Array(width));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        field[y][x] = prob > percentage ? fieldCharacter : hole;
      }
    }

    return field;
  }
}

const gameField = new Field(Field.generateField(10, 10, 0.2));
gameField.runGame();
