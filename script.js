const emojis = [
"🍎",
"🍌",
"🍇",
"🍉",
"🍒",
"🍓",
"🥝",
"🍍"
];

let cards = [...emojis, ...emojis];

const board = document.getElementById("board");

const movesDisplay = document.getElementById("moves");

const timerDisplay = document.getElementById("timer");

const restartBtn = document.getElementById("restart");

const popup = document.getElementById("popup");

const finalMoves = document.getElementById("finalMoves");

const finalTime = document.getElementById("finalTime");

const playAgain = document.getElementById("playAgain");

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let moves = 0;

let matchedPairs = 0;

let timerStarted = false;

let seconds = 0;

let timer;

function shuffle(array){

for(let i=array.length-1;i>0;i--){

const j=Math.floor(Math.random()*(i+1));

[array[i],array[j]]=[array[j],array[i]];

}

}

function startTimer(){

timer=setInterval(()=>{

seconds++;

let mins=Math.floor(seconds/60);

let secs=seconds%60;

timerDisplay.textContent=
`${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;

},1000);

}

function createBoard(){

board.innerHTML="";

shuffle(cards);

cards.forEach(emoji=>{

const card=document.createElement("div");

card.className="card";

card.dataset.emoji=emoji;

card.innerHTML=`

<div class="card-inner">

<div class="front">?</div>

<div class="back">${emoji}</div>

</div>

`;

card.addEventListener("click",flipCard);

board.appendChild(card);

});

}

function flipCard(){

if(lockBoard) return;

if(this===firstCard) return;

if(this.classList.contains("matched")) return;

if(!timerStarted){

timerStarted=true;

startTimer();

}

this.classList.add("flip");

if(!firstCard){

firstCard=this;

return;

}

secondCard=this;

moves++;

movesDisplay.textContent=moves;

checkMatch();

}

function checkMatch(){

if(firstCard.dataset.emoji===secondCard.dataset.emoji){

firstCard.classList.add("matched");

secondCard.classList.add("matched");

matchedPairs++;

resetSelection();

if(matchedPairs===8){

clearInterval(timer);

setTimeout(()=>{

popup.style.display="flex";

finalMoves.textContent="Moves : "+moves;

finalTime.textContent="Time : "+timerDisplay.textContent;

},500);

}

}

else{

lockBoard=true;

setTimeout(()=>{

firstCard.classList.remove("flip");

secondCard.classList.remove("flip");

resetSelection();

},900);

}

}

function resetSelection(){

firstCard=null;

secondCard=null;

lockBoard=false;

}

function restartGame(){

clearInterval(timer);

seconds=0;

timerStarted=false;

moves=0;

matchedPairs=0;

movesDisplay.textContent=0;

timerDisplay.textContent="00:00";

popup.style.display="none";

resetSelection();

createBoard();

}

restartBtn.addEventListener("click",restartGame);

playAgain.addEventListener("click",restartGame);

createBoard();