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
let cardsFragment = document.createDocumentFragment();


//8 pairs of cards randomized.  Take numbers 1 to 8, place randomly into array, twice.

let allCards = new Array (16);
let gridAreaArray = "ABCDEFGHIJKLMNOP".split("");

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
  backCardElement.addEventListener('click', function (e) {
    console.log(e);
    e.path[1].classList.toggle('flip');
  });
  // add click listner to flick front card backface
  cardElement.addEventListener('click', function (e) {
    console.log(e);
    e.path[1].classList.toggle('flip');
  });

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
