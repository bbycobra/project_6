//Variables//

const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startGame = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const title = document.querySelector('.title');
const buttons = document.querySelectorAll('button');
var timeoutID;

//Phrases//

let phrases = [
    "as above so below", 
    "you are beautiful", 
    "we are all conciousness", 
    "javascript is ok", 
    "humans are source",
    "i like chocolate",
    "i can see you"
]

let missed = 0;

startGame.addEventListener( 'click', () => {
    if (overlay.style.display == 'none') {
        overlay.style.display = 'block';
    } else {
        startGame.textContent = 'Go Back';
        overlay.style.display = 'none';
    }
});

function getRandomPhraseAsArray(arr){
    let phrase = arr[Math.floor(Math.random() * arr.length)];
    return phrase.split("");
} 

function addPhraseToDisplay(arr){
    const ul = document.querySelector('#phrase > ul');
    let items = '';
    for (let i = 0; i <arr.length; i++) {
        if (arr[i] === " "){
            items += `<li class="space">${ arr[i] }</li>`;
        }else{
            items += `<li class="letter">${ arr[i] }</li>`;
        }
        
    }
    ul.innerHTML = items;
}

function checkLetter(button) {
    let returnedLetter = null;
    const letters = document.querySelectorAll(".letter");
    for (let i= 0; i < letters.length; i++){
        if ( letters[i].textContent == button.textContent){
            letters[i].classList.add("show");
            returnedLetter = letters[i].textContent;
        } 
    }

    return returnedLetter;
}

function checkWin() {
    debugger;
    const letters = document.querySelectorAll(".letter");
    const show = document.querySelectorAll(".show");
    if (letters.length == show.length){
        overlay.classList.add("win");
        overlay.style.display = 'flex';
        title.textContent = "You Won! :)"
    } else if ( missed > 4) {
        overlay.classList.add("lose");
        overlay.style.display = 'flex';
        title.textContent = "You Lost! :("
    }

}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 

let letterFound = null;
let hearts = null;
for (let i = 0; i< buttons.length; i++){
    buttons[i].addEventListener( 'click', (e) => {
        letterFound = checkLetter(e.target);
        e.target.classList.add("chosen");
        e.target.disabled = true;
        if (letterFound == null){
            hearts = document.querySelectorAll(".tries");
            missed+=1;
            hearts[0].remove();
        }

        checkWin();
    }); 
}

