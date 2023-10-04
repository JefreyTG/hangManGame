const wordDisplay=document.querySelector(".word-display");
const hangManImage=document.querySelector(".hangman-box img");
const guessesText=document.querySelector(".guesses-text b");
const keyboardDiv=document.querySelector(".keyboard");
const gameModal=document.querySelector(".game-modal");
const playAgainBtn=document.querySelector(".play-again");


let currentWord, correctLetters, wrongGuessCount;
 const maxGuesses = 6;

 const resetGame = () => {
  // ressetting all game variables and UI elements
  correctLetters=[];
  wrongGuessCount = 0;
  hangManImage.src=`hangman-game-images/images/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
  wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
  gameModal.classList.remove("show");


 }

const getRandomWord = () => {
    const { word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
}

const gameOver = (isVictory) => {
  //After 600ms of game complete ... showing modal with relevant details 
  setTimeout(() =>{
    const modalText=isVictory ? `Youn found the word:`: `The correct word was:`;
    gameModal.querySelector("img").src = `../hangman-game-images/images/${isVictory ? `victory` : `lost`}.gif`;
    gameModal.querySelector("h4").innerText = `${isVictory ? `Congrats!` : `Game Over!`}`
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
}


const initGame = (button, clickedLetter) => { 
    //checking if clickedLetter Exists on the currentWord  
  if (currentWord.includes(clickedLetter)) {
    //Showing all correct letters on the word display 
   [...currentWord].forEach((letter, index) => {
    if(letter === clickedLetter) {
      correctLetters.push(letter);
      wordDisplay.querySelectorAll("li")[index].innerText = letter;
      wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
    }
   } ) ;
  } else {
    // if clicked letter does not exist then update the wrongGuessCount and hangman image 
    wrongGuessCount++;
    hangManImage.src=`hangman-game-images/images/hangman-${wrongGuessCount}.svg`;
  }

  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

//Calling gameOver function if any of these condition meets 
  if(wrongGuessCount === maxGuesses) return gameOver(false);
  if(correctLetters.length === currentWord.length) return gameOver(true);


}

//Creating Keyboard Buttons and adding event listeners 
for (let i = 97; i <= 122; i++) {
const button = document.createElement("button");
button.innerText = String.fromCharCode(i);
keyboardDiv.appendChild(button);
button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);