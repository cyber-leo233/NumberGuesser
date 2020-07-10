/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//game vars



let guessesLeft =3
    min = 1,
    max = 10,
    winningNumber = randomNumber();



// ui vars

//game container
const game = document.querySelector('#game');

//minumin amount
const minEl =  document.querySelector('.min');

//max amount
const maxEl = document.querySelector('.max');
//submit button
const guessBtn = document.querySelector('#guess-btn');

//user guess
const guess = document.querySelector('#guess');


//message for after submitting value
const messageEl = document.querySelector('#message');

//set min and max attributes to input guess button

guess.setAttribute("min",min);
guess.setAttribute("max",max);

//display the min and max numbers in the dom

minEl.textContent = min;
maxEl.textContent = max;

//===================add event listeners==========================
guessBtn.addEventListener('click',checkGuess);
game.addEventListener('mousedown',function (e){
  if (e.target.className === 'play-again'){
    window.location.reload();
    
  }
})







//==================functions====================================

function checkGuess () {
  let guessNum = Number(guess.value);
  console.log(guessNum > max);
 
  if(isNaN(guessNum) || guessNum < min || guessNum > max ){

  message(`Must be a number between ${min} and ${max}`,"red");

  }
  else if (guessNum === winningNumber){
     let audio = new Audio('Short_triumphal_fanfare-John_Stracke-815794903.mp3');
     audio.play();
    gameOver(true,`That is correct, the winning number is ${winningNumber}`);
    
 }

 
  else {
    guessesLeft --;
    if(guessesLeft === 0){
      
      let audio = new Audio('Sad_Trombone-Joe_Lamb-665429450.mp3');
      audio.play();
      gameOver(false,`Game over, you lost 🥺 The winning number was ${winningNumber}`);
     
      
    }
    else {
      gameOver(false,`incorrect, you have ${guessesLeft} guesses left.`);
    }
    

  }
 
   


}//end of check guess

function message (msg,color) {
    messageEl.textContent = msg;
    messageEl.style.color = color;
   
   $(messageEl).addClass('move');
   setTimeout(function (){
    $(messageEl).removeClass('move'
    )
  },1000);
    
    
    guess.style.borderColor = color;
    guess.value ='';
}
function gameOver (won,msg) {
  
  let color;
if (won === true || guessesLeft === 0){
 
  guess.disabled = true;
  guessBtn.value = "Play Again?"
  guessBtn.className += 'play-again';
  
}

won === true ? color ="green" : color ="Red";
  
 

  message(msg,color);

}

function randomNumber () {
  return Math.round(Math.random()*(max-min)+1);
}
