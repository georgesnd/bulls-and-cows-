var button = document.getElementById("click");
var count = 0;

// counts how many times players guessed by clicking
button.addEventListener("click", function () {
  count += 1;
  guesscount = document.getElementById("guesscount");
  guesscount.innerHTML = count;
});

var figures = new Array();
var confirm = true;

// getting random number, with 4 unique digit

function secretNumber() {
  figures = [];
  while (figures.length < 4) {
    let random = Math.floor(Math.random() * 9) + 1;
    if (!figures.includes(random)) {
      figures.push(random);
    }
  }
  console.log(figures);
}

// function to verify entered(guess number)

let guess = document.getElementById("guess");
let setOutput = document.getElementById("output");

function validateGuess() {
  // this function validates the players guess input if it's a number and also if the number is less that 4 digit
  let thisValue = guess.value;
  for (let i = 0; i < thisValue.length; i++) {
    if (isNaN(thisValue[i])) {
      setOutput.innerHTML = "Type only numbers!\n";
      confirm = false;
      break;
    } else if (thisValue.length != 4) {
      setOutput.innerHTML = "enter four numbers";
      confirm = false;
    } else {
      confirm = true;
    }
  }

  // getting the players username

  function name() {
    let playername = document.getElementById("playername");
    if (playername.value.length > 0) {
      return playername.value;
    } else {
      return "stranger :";
    }
  }

  // checking bulls and cows or no matches

  if (confirm) {
    let bull = 0;
    let cow = 0;

    for (let i = 0; i < figures.length; i++) {
      for (let j = 0; j < thisValue.length; j++) {
        if (figures[i] == thisValue[j] && i == j) {
          bull++;
        } else if (figures[i] == thisValue[j] && i != j) {
          cow++;
        }
      }
    }

    if (bull === 0 && cow === 0) {
      const messages = [
        // using the name function to display the random messages
        `${name()} try again `,
        `${name()} sorry no match`,
        `${name()} better luck next try`,
        `${name()} dont give up `,
      ];
      const message = messages[Math.floor(Math.random() * messages.length)]; // random messages generator
      setOutput.innerHTML = `${message}\n`;
    } else if (bull === 4) {
      setOutput.innerHTML =
        4 +
        `bulls! congrats ${name()} you won!!!\nclick Reload to play again\n`;
    } else {
      setOutput.innerHTML += thisValue + " : ";
      setOutput.innerHTML += bull + " bull(s), " + cow + " cow(s)!\n";
    }
    // this part resets the game guess count and guess to reload the game
    if (count == 7) {
      alert("You guessed to many times, Game Over");

      reset();
      count = -1; // rest guess count to zero
    }
    confirm = true;
  }
}

// reset game

function reset() {
  secretNumber();
  document.getElementById("output").innerHTML = "";
  document.getElementById("guess").value = "";
  guesscount.innerHTML = 0;
  count = 0;
}
// end the game
function end() {
  secretNumber();
  document.getElementById("output").innerHTML = "";
  document.getElementById("playername").value = "";
  document.getElementById("guess").value = "";
  guesscount.innerHTML = " " + 0;
  count = 0;
}

secretNumber();
