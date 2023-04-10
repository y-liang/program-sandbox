const readline = require('readline');

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

const ROWS = 3;
const COLS = 3;

let refBoardArr = [
   ['a', 'b', 'c'],
   ['d', 'e', 'f'],
   ['g', 'h', 'i']
];
let promptTypes = ['start', 'move'];
let players = ['X', 'O'];

let gameBoardArr = [];
let player1, player2;
let takenSquares = [];
let winner;



function createGridView(gridArray) {

   let gridView;
   gridView = ('\n');

   for (i = 0; i < (ROWS * 2 - 1); i++) {
      switch (i % 2) {
         case 0:
            for (j = 0; j < COLS; j++) {
               gridView += ` ${ gridArray[i / 2][j] } `;
               if (j < COLS - 1) {
                  gridView += '|';
               } else {
                  gridView += '\n';
               }
            }
            break;

         case 1:
            for (j = 0; j < COLS; j++) {
               gridView += '–––';
               if (j < COLS - 1) {
                  gridView += '+';
               } else {
                  gridView += '\n';
               }
            }
            break;
      }
   }

   gridView += ('\n');

   return gridView;
}

function setRefBoard() {
   let refBoardView = createGridView(refBoardArr);
   console.log('\nPlease reference the board below for labeled squares.\n' + refBoardView + "Let's start!\n");

   // initialize board array
   for (i = 0; i < ROWS; i++) {
      let innerArr = [];
      for (j = 0; j < COLS; j++) {
         innerArr.push(' '); // one empty space
      }
      gameBoardArr.push(innerArr);
   }
}

function createPromptPromise(prompt, player = null) {
   let question;

   switch (prompt) {
      case promptTypes[0]:
         question = "\nHi there! Let's play Tic Tac Toe.\nWho shall go first? Enter X or O: ";
         break;

      case promptTypes[1]:
         question = `Player ${ player }, pick a square for your move: `;
         break;
   }

   return new Promise((resolve) => {
      rl.question(question, answer => {
         resolve(answer);
      });
   });
}

async function setPlayer(callBoard, callGame) {

   // validator
   while (true) {
      player1 = await createPromptPromise(promptTypes[0]);
      player1 = player1.toUpperCase();
      if (/^[X,O]+$/.test(player1)) { break; }
      console.log('Invalid player. Please enter either X or O to start.');
   }

   console.log(`\nPlayer ${ player1 } goes first.`);

   player2 = players[(1 - players.indexOf(player1))];
   console.log(`Player ${ player2 } goes next.`);

   callBoard();
   callGame();

}

function updateGameBoard() {
   // gameBoardArr already set up in refBoard

   gameBoardView = createGridView(gameBoardArr);
   console.log(gameBoardView);

}

async function startGame() {
   playerNow = player1;

   for (n = 0; n < ROWS * COLS; n++) {
      while (true) {
         squareNow = await createPromptPromise(promptTypes[1], playerNow);
         squareNow = squareNow.toLowerCase();
         if (/^[a-i]+$/.test(squareNow) && !takenSquares.includes(squareNow)) { break; }
         console.log('Invalid square. Please make sure your square label is correct and the square has not yet taken.');
      }

      console.log(`\nPlayer ${ playerNow } has taken square ${ squareNow }`);

      takenSquares.push(squareNow);
      matchRefSquare(squareNow, playerNow);
      updateGameBoard();


      if (n >= Math.min(ROWS, COLS)) {
         calcResult();
      }

      playerNow = players[(1 - players.indexOf(playerNow))]; // the other player
   }

}

function matchRefSquare(spot, player) {

   for (i = 0; i < ROWS; i++) {
      for (j = 0; j < COLS; j++) {
         if (refBoardArr[i][j] == spot) {
            // console.log(i, j);
            // console.log(gameBoardArr);
            // console.log(gameBoardArr[i][j]);
            return gameBoardArr[i][j] = player;
         }
      }
   }
}

function runGame() {
   setPlayer(setRefBoard, startGame);
}


function calcResult() {

   if (calcRow() != -1) {
      winner = calcRow();
   } else if (calcCol() != -1) {
      winner = calcCol();
   } else if (calcDiag() != -1) {
      winner = calcDiag();
   }

   if (winner) {
      console.log(`\nPlayer ${ winner } has won!\n\nHave a wonderful day!\n`);
      rl.close();
   }

   if (takenSquares.length == ROWS * COLS) {
      if (calcRow() + calcCol() + calcDiag() == -3) {
         console.log("\nIt's a draw.\n\nHave a wonderful day!\n");
         rl.close();
      }
   }

}

function calcRow() {
   for (i = 0; i < ROWS - 1; i++) {
      for (j = 0; j < COLS - 1; j++) {
         if (gameBoardArr[i][j] != gameBoardArr[i][j + 1] || gameBoardArr[i][j] == ' ') { break; }

         // hasn't broken out of the loop yet
         if (j == COLS - 2) {
            // console.log('calcRow', gameBoardArr[i][j]);
            return gameBoardArr[i][j];
         }
      }
   }

   return -1;

}

function calcCol() {
   for (j = 0; j < COLS - 1; j++) {
      for (i = 0; i < ROWS - 1; i++) {
         if (gameBoardArr[i][j] != gameBoardArr[i + 1][j] || gameBoardArr[i][j] == ' ') { break; }

         // hasn't broken out of the loop yet
         if (i == COLS - 2) {
            // console.log('calcCol', gameBoardArr[i][j]);
            return gameBoardArr[i][j];
         }
      }
   }

   return -1;
}

function calcDiag() {
   for (j = 0; j < COLS - 1; j++) {
      for (i = 0; i < ROWS - 1; i++) {

         if (i == j) {
            if (gameBoardArr[i][j] != gameBoardArr[i + 1][j + 1] || gameBoardArr[i][j] == ' ') { break; }

            // hasn't broken out of the loop yet
            if (i == COLS - 2) {
               // console.log('calcDiag', gameBoardArr[i][j]);
               return gameBoardArr[i][j];
            }
         }
      }
   }

   return -1;
}


runGame();
