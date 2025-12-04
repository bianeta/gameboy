//const
const container= document.getAnimations("alpahabetButtons");
var answerDisplay = document.getElementById ("hold");
var answer = "";
var hint = "";
var life = 10;
var wordDisplay= [];
var winningCheck = "";
const containerHint= document.getElementById("clue");
const buttonHint = document.getElementById ("reset");
const buttonReset =  document.getElementById("mylives");
var myStickman=document.getElementById("stickman");
var context = myStickman.getContext("2d");

//generate alphabet buttton
function generateButton () {
var buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
.split("")
.map(
    (letter)=>
        `<button
         class = "alphabetButtonJS" 
         id="${letter}"
         >
        ${letter}
               </button>`

)
.join("");

return buttonsHTML;
}

function handleClick(event) {
  const isButton = event.target.nodeName === "BUTTON";
  if (isButton) {
    //console.dir(event.target.id);
    //console.log(isButton);
    const buttonId = document.getElementById(event.target.id);
    buttonId.classList.add("selected");
  }
  return;
}

//word array
const question =[
    "The Chosen Catagory is Music Artist",
 "The  Chosen Catagory is Films",
 "The Chosen Catagory is Books",
]