const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
const playerCharacter = "@";

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.locationX = 0;
    this.locationY = 0;
    //set player position to 0,0 at game start.
    this.field[0][0] = playerCharacter;
  }

  runGame() {
    //generate field, print field, then play the game
    // ask for next move, check for hat/OOB/hole, next move

    let inSession = true;
    let count = 1;

    while (inSession) {
      console.log(`Turn ${count}`);
      this.print();
      this.field[this.locationY][this.locationX] = pathCharacter;
      this.nextMove();
      count++;

      if (!this.inBounds()) {
        console.log(`Moved out of bounds, game over`);
        inSession = false;
      } else if (this.foundHat()) {
        console.log(`Found your hat in ${count - 1} moves, you win!`);
        inSession = false;
      } else if (this.fellInHole()) {
        console.log("You fell in a hole and died");
        inSession = false;
      }
      //check OOB/Hole/Hat

      //update map with pathCharacter
      this.field[this.locationY][this.locationX] = playerCharacter;
    }
  }

  nextMove() {
    // Prompt for a movement and if the move isnt valid, recall prompt;

    const input = prompt("Next move? ").toUpperCase();

    switch (input) {
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

  inBounds() {
    //check that the player is within bounds rather than out

    return (
      this.locationY >= 0 &&
      this.locationX >= 0 &&
      this.locationY < this.field.length &&
      this.locationX < this.field[0].length
    );
  }

  foundHat() {
    return this.field[this.locationY][this.locationX] === hat;
  }

  fellInHole() {
    return this.field[this.locationY][this.locationX] === hole;
  }

  static generateField(height, width, percentage = 0.1) {
    //generate a field and fill it with random holes

    const field = new Array(height).fill(0).map((el) => new Array(width));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        field[y][x] = prob > percentage ? fieldCharacter : hole;
      }
    }

    //set a hat location

    const hatLocation = {
      // object with x,y properties set to be a random entry from width and height params
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };

    while (hatLocation.x === 0 && hatLocation.y === 0) {
      // check if hat is at the starting point and re run the location if it is
      hatLocation.x = Math.floor(Math.random() * width);
      hatLocation.y = Math.floor(Math.random() * height);
    }

    //draw hat onto field with location above
    field[hatLocation.y][hatLocation.x] = hat;
    return field;
  }
}

const gameField = new Field(Field.generateField(20, 40, 0.2));
gameField.runGame();
