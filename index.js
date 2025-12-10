

    console.log("JavaScript file loaded successfully!");

    // Elements and state
    const container = document.getElementById("alphabetButtons");
    var answerDisplay = document.getElementById("hold");
    var answer = "";
    var hint = "";
    var life = 10;
    var wordDisplay = [];
    var winningCheck = "";
    const containerHint = document.getElementById("clue");
    const buttonHint = document.getElementById("hint");
    const buttonReset = document.getElementById("reset");
    const livesDisplay = document.getElementById("mylives");
    var myStickman = document.getElementById("stickman");
    var context = myStickman && myStickman.getContext ? myStickman.getContext("2d") : null;

//generate alphabet buttton
function generateButton () {
  // Render letters in keyboard rows (qwerty) instead of a single row
  const rows = [
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm'
  ];

  return rows.map(r => {
    return `<div class="kb-row">${r.split("").map(letter => `
      <button class="alphabetButtonJS" id="${letter}">${letter}</button>
    `).join("")}</div>`;
  }).join("");
}

function handleClick(event) {
  const isButton = event.target.nodeName === "BUTTON";
  if (isButton) {
    //console.dir(event.target.id);
    //console.log(isButton);
    const buttonEl = event.target;
    buttonEl.classList.add("selected");
    // disable the button so it can't be clicked again
    buttonEl.disabled = true;
    // forward to guess handler immediately
    if (typeof guess === 'function') guess(event);
  }
  return;
}

//word array
const question =[
    "The Chosen Catagory is Music Artist",
 "The  Chosen Catagory is Films",
 "The Chosen Catagory is Books",
];

const categories = [
  [
    "katseye",
    "taylorswift",
    "mariahcarey",
    "adele",
    "brandonlake",
    "josiahqueen",
    "SZA" ],
  ["the-hunger-games", "meangirls", "scream", "finding-nemo", "aladdin"],
  ["twilight", "animalfarm", "percy-jackson", "the-book-theif", "divergent"]
];

const hints = [
  [
    "Global girl group ( song ex. touch)",
    "The number 13",
    "She defrosts every Christmas",
    "Hello from the other side",
    "Christian artist(song ex. Grattitude)",
        "Christian artist(song ex. The Prodial)",
      "Saturn"  ],
  [
    "District 12",
    "On wednesdays we wear pink",
    "Ghostface",
    "Anamated Fish",
    "Magic carpet"
  ],
  [
    "Vampire vs Werewolf",
    "George Orwell",
    "Look I didn't want to be a half-blood",
    "Narrated by Death",
    "Dauntless"
  ]
];

//set question,answer and hint

function setAnswer() {
  const categoryOrder = Math.floor(Math.random() * categories.length);
  const chosenCategory = categories[categoryOrder];
  const wordOrder = Math.floor(Math.random() * chosenCategory.length);
  const chosenWord = chosenCategory[wordOrder];

  const categoryNameJS = document.getElementById("categoryName");
  categoryNameJS.innerHTML = question[categoryOrder];

  //console.log(chosenCategory);
  //console.log(chosenWord);
  answer = chosenWord;
  hint = hints[categoryOrder][wordOrder];
  answerDisplay.innerHTML = generateAnswerDisplay(chosenWord);
}

function generateAnswerDisplay(word) {
  var wordArray = word.split("");
  //console.log(wordArray);
  for (var i = 0; i < answer.length; i++) {
    if (wordArray[i] !== "-") {
      wordDisplay.push("_");
    } else {
      wordDisplay.push("-");
    }
  }
  return wordDisplay.join(" ");
}

function showHint() {
  containerHint.innerHTML = `Clue - ${hint}`;
}

buttonHint.addEventListener("click", showHint);
//setting initial condition
function init() {
  answer = "";
  hint = "";
  life = 10;
  wordDisplay = [];
  winningCheck = "";
  context.clearRect(0, 0, 400, 400);
  canvas();
  containerHint.innerHTML = `Clue -`;
  livesDisplay.innerHTML = `You have ${life} lives!`;
  setAnswer();
  container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  console.log(answer);
  //console.log(hint);
}

// Assign init as the onload handler (don't call it immediately)
window.onload = init;

//reset (play again)
buttonReset.addEventListener("click", init);

//guess click
function guess(event) {
  const guessWord = event.target.id;
  const answerArray = answer.split("");
  var counter = 0;
  if (answer === winningCheck) {
    livesDisplay.innerHTML = `YOU WIN!`;
    return;
  } else {
    if (life > 0) {
      for (var j = 0; j < answer.length; j++) {
        if (guessWord === answerArray[j]) {
          wordDisplay[j] = guessWord;
          console.log(guessWord);
          answerDisplay.innerHTML = wordDisplay.join(" ");
          winningCheck = wordDisplay.join("");
          //console.log(winningCheck)
          counter += 1;
        }
      }
      if (counter === 0) {
        life -= 1;
        counter = 0;
        animate();
      } else {
        counter = 0;
      }
      if (life > 1) {
        livesDisplay.innerHTML = `You have ${life} lives!`;
      } else if (life === 1) {
        livesDisplay.innerHTML = `You have ${life} life!`;
      } else {
        livesDisplay.innerHTML = `GAME OVER!`;
      }
    } else {
      return;
    }
    console.log(wordDisplay);
    //console.log(counter);
    //console.log(life);
    if (answer === winningCheck) {
      livesDisplay.innerHTML = `YOU WIN!`;
      return;
    }
  }
}

// Removed the separate guess listener because handleClick now calls guess()
// container.addEventListener("click", guess);

// Hangman
function animate() {
  drawArray[life]();
  //console.log(drawArray[life]);
}

function canvas() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#fff";
  context.lineWidth = 2;
}

function head() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
}

function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
}

function frame1() {
  draw(0, 150, 150, 150);
}

function frame2() {
  draw(10, 0, 10, 600);
}

function frame3() {
  draw(0, 5, 70, 5);
}

function frame4() {
  draw(60, 5, 60, 15);
}

function torso() {
  draw(60, 36, 60, 70);
}

function rightArm() {
  draw(60, 46, 100, 50);
}

function leftArm() {
  draw(60, 46, 20, 50);
}

function rightLeg() {
  draw(60, 70, 100, 100);
}

function leftLeg() {
  draw(60, 70, 20, 100);
}

var drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1
];
