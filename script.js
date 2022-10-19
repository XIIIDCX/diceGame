'use strict';

// selecting elements
const player0Elem = document.querySelector('.player--0');
const player1Elem = document.querySelector('.player--1');
const score0Elem = document.querySelector('#score--0');
const score1Elem = document.querySelector('#score--1');
const current0Elem = document.querySelector('#current--0');
const current1Elem = document.querySelector('#current--1');
const diceElem = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, isGameOn;

// starting conditions
const startNewGame = function() {
  scores = [ 0, 0 ];
  currentScore = 0;
  activePlayer = 0;
  isGameOn = true;  

  score0Elem.textContent = 0;
  score1Elem.textContent = 0;
  current0Elem.textContent = 0;
  current1Elem.textContent = 0;
  
  diceElem.classList.add('hidden');
  player0Elem.classList.add( 'player--active' );
  player1Elem.classList.remove( 'player--active' );
  player0Elem.classList.remove( 'player--winner' );
  player1Elem.classList.remove( 'player--winner' );
};

// start game when new page 
startNewGame();

const switchPlayer = function() {
  document.querySelector( `#current--${ activePlayer }` ).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Elem.classList.toggle( 'player--active' );
  player1Elem.classList.toggle( 'player--active' );
};

// rolling dice functionality
btnRoll.addEventListener('click', function() { 
  if(isGameOn) {
  
    // generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    
    // display dice
    diceElem.classList.remove('hidden');
    diceElem.src = `dice-${dice}.png`;

    // check for rolled number
    if( dice !== 1 ) {
      
      // add dice to current score
      currentScore += dice;
      document.querySelector( `#current--${ activePlayer }` ).textContent = currentScore;
    
    // if player rolled 1:  
    // switch to next player and set current to 0
    } else {
      switchPlayer();
    }
  }  
});

// hold button mechanix
btnHold.addEventListener( 'click', function() {
  if(isGameOn) {  
  
    // add current score to active player total score
    scores[activePlayer] += currentScore;
    document.querySelector( `#score--${ activePlayer }`).textContent = scores[ activePlayer ];
    
    // check if player score is >= 100
    if( scores[ activePlayer ] >= 100) {

      // finish the game
      isGameOn = false;
      diceElem.classList.add('hidden');
      document.querySelector( `.player--${ activePlayer }`).classList.add('player--winner');
      document.querySelector( `.player--${ activePlayer }`).classList.remove('player--active');
    
    } else {
      // switch to next player
      switchPlayer();
    };
  }  
});

// new game button
btnNew.addEventListener( 'click', startNewGame); 
