const prompt = require("prompt-sync")({ sigint: true });

class Field {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.field = this.generateField();
    this.playerRow = 0;
    this.playerCol = 0;
  }

  generateField() {
    const field = [];
    for (let i = 0; i < this.height; i++) {
      const row = [];
      for (let j = 0; j < this.width; j++) {
        row.push(Math.random() < 0.2 ? "O" : "░");
      }
      field.push(row);
    }

    field[0][0] = "^";
    return field;
  }

  printField() {
    for (const row of this.field) {
      console.log(row.join(" "));
    }
  }

  move(direction) {
    switch (direction) {
      case "up":
        if (this.playerRow > 0) {
          this.field[this.playerRow][this.playerCol] = "░";
          this.playerRow--;
        }
        break;
      case "down":
        if (this.playerRow < this.height - 1) {
          this.field[this.playerRow][this.playerCol] = "░";
          this.playerRow++;
        }
        break;
      case "left":
        if (this.playerCol > 0) {
          this.field[this.playerRow][this.playerCol] = "░";
          this.playerCol--;
        }
        break;
      case "right":
        if (this.playerCol < this.width - 1) {
          this.field[this.playerRow][this.playerCol] = "░";
          this.playerCol++;
        }
        break;
      default:
        break;
    }

    if (this.field[this.playerRow][this.playerCol] === "O") {
      console.log("You fell into a hole! Game over.");
      process.exit(0);
    } else if (this.field[this.playerRow][this.playerCol] === "H") {
      console.log("Congratulations! You found your hat!");
      process.exit(0);
    }

    this.field[this.playerRow][this.playerCol] = "^";
  }
}

function playGame() {
  const height = 8;
  const width = 8;
  const field = new Field(height, width);

  while (true) {
    field.printField();
    const direction = prompt(
      "Which way? (up, down, left, right): "
    ).toLowerCase();
    if (["up", "down", "left", "right"].includes(direction)) {
      field.move(direction);
    } else {
      console.log("Invalid input. Please enter up, down, left, or right.");
    }
  }
}

playGame();
