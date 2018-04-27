import '../styles/styles.css';
import xMark from '../images/xMark.svg';
import noBolt from '../images/noBolt.svg';
import monkey from '../images/monkey.svg';
import head from '../images/head.svg';
import five from '../images/five.svg';
import eyes from '../images/eyes.svg';
import circleX from '../images/circleX.svg';
import body from '../images/body.svg';
import turn from '../images/turn.svg';


let main = document.querySelector('#main');
// let gameInfo = document.querySelector('#gameInfo');
let cardsFragment = document.createDocumentFragment();


//8 pairs of cards randomized.  Take numbers 1 to 8, place randomly into array, twice.

let allCards = new Array (16);
let gridAreaArray = "ABCDEFGHIJKLMNOP".split("");

//track state of game, store first and second card flipped

function CardFlipped (){
  this.cardFaceValue = null;
  this.cardGridArea = null;
  this.cardDiv = null;
}

CardFlipped.prototype.reset = function (){
  this.cardFaceValue = null;
  this.cardGridArea = null;
  this.cardDiv = null;
}

let firstCardFlipped = new CardFlipped();
let secondCardFlipped = new CardFlipped();

// let secondCardFlipped;

//random number
function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(16));
}

//function to generate random allCards array
function shuffleCards () {
  for (let i=0; i<2; ++i){
    for(let c=1; c<9; ++c){
      let arrayIndex = getRandomInt();
      while (allCards[arrayIndex] !== undefined){
        arrayIndex = getRandomInt();
      }
      allCards[arrayIndex] = c;
    }
  }
}

function resetCards (){
  firstCardFlipped.cardDiv.classList.toggle('flip');
  secondCardFlipped.cardDiv.classList.toggle('flip');
  firstCardFlipped.reset();
  secondCardFlipped.reset();
}

function findCard(cardNumber){
  let selectedCard;
  switch (cardNumber){
    case 1:
      selectedCard = xMark;
      break;
    case 2:
      selectedCard = noBolt;
      break;
    case 3:
      selectedCard = monkey;
      break;
    case 4:
      selectedCard = head;
      break;
    case 5:
      selectedCard = five;
      break;
    case 6:
      selectedCard = eyes;
      break;
    case 7:
      selectedCard = circleX;
      break;
    case 8:
      selectedCard = body;
      break;
  }
  return selectedCard;
}

function matchFound(firstCard, secondCard){
  console.log(firstCard.cardDiv.children);
  console.log(secondCard.cardDiv.children);
 for (let i = 0; i < firstCard.cardDiv.children.length; ++i ){
   firstCard.cardDiv.children[i].removeEventListener('click', matchCard);
   secondCard.cardDiv.children[i].removeEventListener('click', matchCard);
 }
}

function findCardFlipped (cardElement){
  //using the Grid Area style on the element clicked, working back to the card stored in the card array for this position.
  let cardArrayPosition = gridAreaArray.indexOf(cardElement.style.gridArea.charAt(0));
  //return css grid area value of card that was flipped
  return cardArrayPosition;
}

function flipCard (cardElement){
  cardElement.classList.toggle('flip');
  if (firstCardFlipped.cardGridArea === null){
    //store the front face value of the card flipped. use later for matching checking.
    firstCardFlipped.cardGridArea = findCardFlipped(cardElement);
    firstCardFlipped.cardFaceValue = allCards[firstCardFlipped.cardGridArea];
    firstCardFlipped.cardDiv = cardElement;
    //exit function since this is the first card being flipped.
    return;
  }
  // first card has flipped.  Is this second card different or the same one?
  if (firstCardFlipped.cardGridArea === findCardFlipped(cardElement)){
    // same card, reset firstCardFlipped Object
    firstCardFlipped.reset();
  } else{
    //create second card object
    secondCardFlipped.cardGridArea = findCardFlipped(cardElement);
    secondCardFlipped.cardFaceValue = allCards[secondCardFlipped.cardGridArea];
    secondCardFlipped.cardDiv = cardElement;
    //check if two cards match
    if (firstCardFlipped.cardFaceValue === secondCardFlipped.cardFaceValue) {
    //remove the match card click listner
    matchFound(firstCardFlipped, secondCardFlipped);

    } else {
    // the cards don't match. flip them back.
    //second card, add end of aninmation listner to delay the flip back
    cardElement.addEventListener('transitionend', delayFlip);

    }
  }
}

let delayFlip = function (e){
  let cardElement = e.srcElement
  if(!cardElement.classList.contains('delay')){
    cardElement.classList.toggle('delay');
  } else {
    //delay transition has happened
    cardElement.removeEventListener('transitionend', delayFlip);
    cardElement.classList.toggle('delay');
    resetCards();
  }
}

let matchCard = function matchCard(e){
  //flip the card
  flipCard(e.path[1]);
}

function createCard(cardImage){
  //create img element
  let cardElement = document.createElement('img');
  // create back img element
  let backCardElement = document.createElement('img');
  // make its src cardImage
  cardElement.src = cardImage;
  backCardElement.src = turn;
  cardElement.classList.toggle('front');
  backCardElement.classList.toggle('back');
  //add click listner to back of cardDiv
  backCardElement.addEventListener('click', matchCard);
  // add click listner to flick front card backface
  cardElement.addEventListener('click', matchCard);
  // create card div
  let cardDiv = document.createElement('div');
  cardDiv.appendChild(cardElement);
  cardDiv.appendChild(backCardElement);
  cardDiv.classList.toggle('cardContainer');
  return cardDiv;
}

function dealCards(cardNumber, index) {
  let cardImage = findCard(cardNumber);
  let cardElement = createCard(cardImage);
  cardElement.style.gridArea = gridAreaArray[index];
  cardsFragment.appendChild(cardElement);
}

shuffleCards();

allCards.forEach(dealCards);
main.appendChild(cardsFragment);
