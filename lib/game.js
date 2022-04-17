class RPS {
  determineWinner(playerChoice, computerChoice) {
    console.info(
      `Player's choice: ${playerChoice}\nComputer's choice: ${computerChoice}`
    );
    if (playerChoice === computerChoice) {
      return 0;
    }
    if (playerChoice === 'rock') {
      return computerChoice === 'scissors' ? 1 : 0;
    }
    if (playerChoice === 'paper') {
      return computerChoice === 'rock' ? 1 : 0;
    }
    if (playerChoice === 'scissors') {
      return computerChoice === 'paper' ? 1 : 0;
    }
  }
}

module.exports = new RPS();
