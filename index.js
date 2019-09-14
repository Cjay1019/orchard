// Object that tracks all of the relevant game data.
const counters = {
  fruit: {
    cherries: 10,
    pears: 10,
    plums: 10,
    apples: 10
  },
  ravens: 0,
  gamesPlayed: 0,
  wins: 0,
  losses: 0
};

// Object that holds all the necessary game operations.
const game = {
  // Handles dice rolling RNG
  roll: () => Math.floor(Math.random() * 6) + 1,
  // Checks if the players have won
  didLose: () => counters.ravens > 8,
  // Checks if the players have lost
  didWin: () =>
    counters.fruit.cherries === 0 &&
    counters.fruit.pears === 0 &&
    counters.fruit.plums === 0 &&
    counters.fruit.apples === 0,
  // This function converts the counters.fruit object into an array of arrays,
  // and then loops through, decrementing 2 fruit from wherever is possible without reducing any of the counters below 0.
  basket: () => {
    let fruitLeft = 2;
    let entries = Object.entries(counters.fruit);
    for (const [fruit, amount] of entries) {
      if (amount && fruitLeft) {
        do {
          counters.fruit[fruit]--;
          fruitLeft--;
        } while (fruitLeft && counters.fruit[fruit]);
      }
    }
  },
  // Uses short circuiting to update wins/losses, increments the game counter, and resets relevant game data.
  endGame: () => {
    game.didWin() && counters.wins++;
    game.didLose() && counters.losses++;
    counters.gamesPlayed++;
    counters.fruit.cherries = 10;
    counters.fruit.pears = 10;
    counters.fruit.plums = 10;
    counters.fruit.apples = 10;
    counters.ravens = 0;
  },
  // Calculates the players win percentage and then prints it with other win/loss data to the console.
  printData: () => {
    console.log(
      `Games Played: ${counters.gamesPlayed}\nWins: ${counters.wins}\nLosses: ${
        counters.losses
      }\nWin percentage: ${(counters.wins / counters.gamesPlayed) * 100}%`
    );
  }
};

// This function contains one game play through. I defined it outside of the game object, because I wanted to avoid scoping issues when having
// to call functions via "this.someFunction()" inside of an ES6 arrow function.
const play = cb => {
  // Do...while that runs through players "turns" until the game is either won or lost
  do {
    // Handles dice rolls, and preforms the appropriate actions depending on the result (used short circuit conditionals to simplify code)
    switch (game.roll()) {
      case 1:
        counters.fruit.cherries && counters.fruit.cherries--;
        break;
      case 2:
        counters.fruit.pears && counters.fruit.pears--;
        break;
      case 3:
        counters.fruit.plums && counters.fruit.plums--;
        break;
      case 4:
        counters.fruit.apples && counters.fruit.apples--;
        break;
      case 5:
        game.basket();
        break;
      default:
        counters.ravens++;
    }
  } while (!game.didLose() && !game.didWin());

  game.endGame();
};

// Play 50,000 games and print the results. This could be accomplished asynchronously using callbacks/promises but not neccessary here.
do {
  play();
} while (counters.gamesPlayed < 50000);
game.printData();

// Example of results:
// Games Played: 50000
// Wins: 28395
// Losses: 21605
// Win percentage: 56.79%
