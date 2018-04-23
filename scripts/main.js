import '../styles/styles.css';
import xMark from '../images/xMark.svg';
import noBolt from '../images/noBolt.svg';
import monkey from '../images/monkey.svg';
import head from '../images/head.svg';
import five from '../images/five.svg';
import eyes from '../images/eyes.svg';
import circleX from '../images/circleX.svg';
import body from '../images/body.svg';

let xMarkImage = document.querySelector('#xMark');
xMarkImage.src = xMark;

xMarkImage.style.gridArea = "z";


//8 pairs of cards randomized.  Take numbers 1 to 8, place randomly into array, twice.

let allCards = new Array (16);

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
  console.log(allCards);
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

shuffleCards();
xMarkImage.src = findCard(allCards[2]);
