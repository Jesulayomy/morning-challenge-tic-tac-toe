// start the game with two players
class Player {
  constructor(playerName, playerShape, playerWins) {
    this.name = playerName
    this.shape = playerShape
    this.wins = playerWins
  }
  win() {
    this.wins += 1;
    document.querySelector('h2').innerText = `${this.shape} WON. ${this.name} has ${this.wins} wins of ${numberOfgames} games`;
  }
}

class Board {
  constructor() {
    this.TL= '1'
    this.TC= '2'
    this.TR= '3'
    this.ML= '4'
    this.MC= '5'
    this.MR= '6'
    this.BL= '7'
    this.BC= '8'
    this.BR= '9'
  }
}

let playerOne = new Player('Player One', '❌', 0);
let playerTwo = new Player('Player Two', '🟡', 0);

// the game will be played on a grid board of 3 x 3 squares both horizontal and vertical
// // Create a board of size 3 x 3 = 9
let board = new Board();

let shapes = {
  'x': '❌',
  'o': '🟡',
  'X': '❌',
  'O': '🟡',
}

// declare winner and log games won out of games attempted
// // Display winner and number of games
// // Create a games attempted varible to track number of games
let numberOfgames = 1;


document.getElementById('submitNames').addEventListener('click', makePlayers);

function makePlayers() {
  let playerOneName = document.getElementById('playerOneName').value || playerOne.name;
  let playerTwoName = document.getElementById('playerTwoName').value || playerTwo.name;

  let playerOneShape = document.querySelector('input[name="playerOneShape"]:checked')?.value || 'x';
  playerOneShape = shapes[playerOneShape];
  let playerTwoShape = playerOneShape === shapes['x'] ? shapes['o'] : shapes['x'];

  // // Create two players
  playerOne.name = playerOneName;
  playerOne.shape = playerOneShape;
  playerTwo.name = playerTwoName;
  playerTwo.shape = playerTwoShape;

  console.log(playerOne);
  console.log(playerTwo);
}


// players take turns clicking on the open spaces in the grid to lay down their shapes 
//  // let turn starts as true
//  // if turn is true, its player 1
//  // if turn is false its player 2
// // A function to place shapes on the board

const ticTacToe = document.querySelector('.ticTacToe');
let turn = true;
let winning = false;

ticTacToe.addEventListener('click', (e) => {
  if (winning) {
    alert('Game Over, please reset the board');
  } else if (
    board[e.target.id || e.target.parentElement.id] === playerOne.shape ||
    board[e.target.id || e.target.parentElement.id] === playerTwo.shape ||
    winning
    ) {
    alert('Play in a different square');
  } else {
    if (turn == true) {
      document.getElementById(`${e.target.id || e.target.parentElement.id}`).innerHTML = `<span>${playerOne.shape}</span>`;
      board[e.target.id] = playerOne.shape;
      checkWin();
    } else {
      document.getElementById(`${e.target.id || e.target.parentElement.id}`).innerHTML = `<span>${playerTwo.shape}</span>`;
      board[e.target.id] = playerTwo.shape;
      checkWin();
    }
    turn = !turn;
  }
})


// when three of the same type are laid, whether horizontally, vertically or diagnally a winner is declared.
// // A function to determine when a player wins
function checkWin() {
  if (board['TC'] == board['TL'] && board['TR'] == board['TC']) {
    logWin()
  } else if (board['MC'] == board['ML'] && board['MR'] == board['MC']) {
    logWin()
  } else if (board['BC'] == board['BL'] && board['BR'] == board['BC']) {
    logWin()
  } else if (board['TC'] == board['MC'] && board['MC'] == board['BC']) {
    logWin()
  } else if (board['TL'] == board['ML'] && board['ML'] == board['BL']) {
    logWin()
  } else if (board['TR'] == board['MR'] && board['MR'] == board['BR']) {
    logWin()
  } else if (board['TL'] == board['MC'] && board['MC'] == board['BR']) {
    logWin()
  } else if (board['TR'] == board['MC'] && board['MC'] == board['BL']) {
    logWin()
  }
}

// Smaller function to display the win
function logWin() {
  winning = true;
  if (turn == true) {
    playerOne.win();
  } else {
    playerTwo.win();
  }
}

// Resete the board
document.getElementById('nextGame').addEventListener('click', nextGame);

function nextGame() {
  board = new Board();
  winning = false;
  numberOfgames += 1;
  document.getElementById('tic').innerHTML = `
    <section class="top">
      <div id="TL"></div>
      <div id="TC"></div>
      <div id="TR"></div>
    </section>
    <section class="middle">
      <div id="ML"></div>
      <div id="MC"></div>
      <div id="MR"></div>
    </section>
    <section class="bottom">
      <div id="BL"></div>
      <div id="BC"></div>
      <div id="BR"></div>
    </section>
  `
}
