let score = JSON.parse(localStorage.getItem('score')) || {
  wins : 0,
  loses : 0,
  ties : 0
};

// if(score === null){
//   score = {
//     wins : 0,
//     loses : 0,
//     ties : 0
//   };
// }

document.body.addEventListener('keydown',(event) => {

  if(event.key === 'r')
    result('Rock');
  else if(event.key === 'p')
    result('Paper');
  else if(event.key === 's')
    result('Scissors');

});

function result(playerMove)
{

  let computerMove = pickComputerMove();
  let result = '';

    if (playerMove === 'Scissors')
    {
      if (computerMove === 'Rock')
        result = 'You Lose';
      else if (computerMove === 'Paper')
        result = 'You win';
      else
        result = 'Tie';
    }

    if (playerMove === 'Rock')
    {
      if (computerMove === 'Paper')
        result = 'You Lose';
      else if (computerMove === 'Scissors')
        result = 'You win';
      else
        result = 'Tie';
    }

    if (playerMove === 'Paper')
    {
      if (computerMove === 'Scissors')
        result = 'You Lose';
      else if (computerMove === 'Rock')
        result = 'You win';
      else
        result = 'Tie';
    }

    if (result === 'You Lose')
      score.loses += 1;
    else if(result === 'You win')
      score.wins += 1;
    else 
      score.ties += 1;

    localStorage.setItem('score',JSON.stringify(score));

    updateScoreElement();
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-move').innerHTML = `You
        <img src = "Images/${playerMove}-emoji.png" class = "move-icon">
        <img src = "Images/${computerMove}-emoji.png" class = "move-icon">
        Computer`;

    // alert(`You picked ${playerMove}.The Computer picked ${computerMove}.${result}.\nWins:${score.wins} , Loses:${score.loses} , Ties:${score.ties}`);

    
}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = `Wins:${score.wins} , Loses:${score.loses} , Ties:${score.ties}`;
}

function pickComputerMove(){

  let computerMove = '';

  const randomNumber = Math.random();

  if(0 <= randomNumber && randomNumber < (1/3))
    computerMove = 'Rock';

  else if((1/3) <= randomNumber && randomNumber < (2/3))
    computerMove = 'Paper';

  else
    computerMove = 'Scissors';

  return computerMove;

}

let isAutoPlaying = false;
let setIntervalId;

function autoplay(){

  if(!isAutoPlaying){
    setIntervalId = setInterval(function(){

      const randomPlayerMove = pickComputerMove();
      result(randomPlayerMove);

    },1000);
    isAutoPlaying = true;
  }
  else{
    clearInterval(setIntervalId);
    isAutoPlaying = false;
  }
}
