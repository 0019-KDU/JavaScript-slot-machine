//1.Deposite the some money
//2.Determine number of lines to bet on
//3.collect a bet amount
//4.spine the slot machine
//5.check if the user won
//6.give the user their winnings
//7.play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter deposit amount :");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("this is not a valid deposit amount");
    } else {
      return numberDepositAmount;
    }
  }
};

const getNumberofLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet(1-3):");
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines,try again");
    } else {
      return numberOfLines;
    }
  }
};

const getBat = (blance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per line:");
    const numberOfBet = parseFloat(bet);

    if (
      isNaN(numberOfBet) ||
      numberOfBet <= 0 ||
      numberOfBet > blance / lines
    ) {
      console.log("Invalid bet,Try again");
    } else {
      return numberOfBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [[], [], []];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRow = (rows) => {
  console.log(typeof rows);
  for (const row of rows) {
    let rowsString = "";
    for (const [i, symbol] of row.entries()) {
      rowsString += symbol;
      if (i != row.length - 1) {
        rowsString += " |";
      }
    }
    console.log(rowsString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbol = rows[row];
    allSame = false;
    break;
  }
  if (allSame) {
    winnings += bet * SYMBOL_VALUES[symbol[0]];
  }
  return winnings;
};

const game = () => {
  let blance = deposit();

  while (true) {
    console.log("You Have Balance of $:" + blance);
    const numberofLines = getNumberofLines();
    const bet = getBat(blance, numberofLines);
    blance -= bet * numberofLines;
    const reels = spin();
    const rows = transpose(reels);
    printRow(rows);
    const winnings = getWinnings(rows, bet, numberofLines);
    blance += winnings;
    console.log("You won, $:" + winnings.toString());

    if (blance <= 0) {
      console.log("You ran out of money!");
      break;
    }
    const playAgain = prompt("Do you want to play again(y/n)?");

    if (playAgain != "y") break;
  }
};

game();
