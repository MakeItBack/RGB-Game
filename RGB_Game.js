// intialise variable that keeps track of how many square we need (easy or hard mode)
var numSquares = 6;
// create an array of colours to match the number of squares
var colours = generateRandomColours(numSquares);
// select the squares we created in the html file
var squares = document.getElementsByClassName("square");
// create a variable for the colour to guess. Comes from a function that picks a new random colour from the array
var pickedColour = pickNewColour();
// select the span in the heading so we can update the text
var colourHeading = document.querySelector("#colourHeading");
// select the message
var messageDisplay = document.querySelector("#message");
// select the h1 so we can change the colour
var header = document.querySelector("h1");
// select the reset button
var resetBtn = document.querySelector("#resetButton");
// select the easy and hard buttons
var modeBtns = document.querySelectorAll(".mode");

// insert the rgb colour code in the heading
colourHeading.textContent = pickedColour;

// add logic to the two mode (easy and hard) buttons - set the number of squares and reset
for (var i = 0; i < modeBtns.length; i++) {
   modeBtns[i].addEventListener("click", function () {
      // When clicked, remove the selected class from both then add back just to the clicked one
      modeBtns[0].classList.remove("selected");
      modeBtns[1].classList.remove("selected");
      this.classList.add("selected");
      // update numSquares to have the right amount of squares for the mode
      if (this.textContent === "Easy") {
         numSquares = 3;
      } else {
         numSquares = 6;
      }
      // call the initialise function to reset everything and fill squares
      intialise();
   });
}

// add logic to reset button
resetBtn.addEventListener("click", intialise);

// For each square.........
for (var i = 0; i < squares.length; i++) {
   // Assign a colour from the array to each square. i is the same for both so it just assigns them in order. Colour 1 in square 1 etc
   squares[i].style.backgroundColor = colours[i];
   // Add click listeners to each square and save the colour code to a variable
   squares[i].addEventListener("click", function () {
      var clickedSquare = this.style.backgroundColor;
      if (clickedSquare === pickedColour) {
         messageDisplay.textContent = "Correct!";
         pulse(2050);
         //  messageDisplay.classList.add("flashMessage");
         resetBtn.textContent = "Play Again?";
         sameColour();
         header.style.backgroundColor = pickedColour;
      } else {
         //make the square disappear by changing colour to same as page background
         this.style.background = "#232323";
         // display a message
         messageDisplay.textContent = "Nope, try Again!";
         pulse(500);
         //  messageDisplay.classList.add("flashMessage");
      }
   });
}

function pulse(time) {
   messageDisplay.classList.add("flashMessage");
   setTimeout(() => {
      messageDisplay.classList.remove("flashMessage");
   }, time);
}

// function to initialise/reset all the styling after changing level or hitting reset (my idea!)
function intialise() {
   messageDisplay.classList.remove("flashMessage");
   // reset the colour of the header bar
   header.style.backgroundColor = "steelblue";
   // fill the array with the right number of new colours
   colours = generateRandomColours(numSquares);
   // Select a colour from the new array to guess
   pickedColour = pickNewColour();
   // Put the new colour in the
   colourHeading.textContent = pickedColour;
   // reset the reset button text
   resetBtn.textContent = "New Colours";
   // remove the message
   messageDisplay.textContent = "";
   // Fill in the squares using all the colours in the array (3 or 6) make visible. Hide the rest
   for (var i = 0; i < squares.length; i++) {
      // check if there is a colour in the array for a given index number and if there is - colour in the square with that same index number
      if (colours[i]) {
         squares[i].style.backgroundColor = colours[i];
         squares[i].style.display = "block";
      }
      // hide any remaining squares
      else squares[i].style.display = "none";
   }
}

// function to turn all the squares the same colour after the correct colour is guessed
function sameColour() {
   for (var i = 0; i < squares.length; i++) {
      squares[i].style.backgroundColor = pickedColour;
   }
}

// function to randomly assign a new colour for guessing out of the colours in the array
function pickNewColour() {
   var randomIndexNumber = Math.floor(Math.random() * colours.length);
   return colours[randomIndexNumber];
}

// function to generate the random colours
function generateRandomColours(num) {
   // make an array
   var arr = [];
   // add random colour to the array, repeat num times
   for (var i = 0; i < num; i++) {
      // get random colour and push it to array
      arr.push(randomColour());
   }
   // return that array
   return arr;
}

// function to generate a random colour
function randomColour() {
   // pick a "red" from 0 to 255
   var r = Math.floor(Math.random() * 256);
   // pick a "green" from 0 to 255
   var g = Math.floor(Math.random() * 256);
   // pick a "blue" from 0 to 255
   var b = Math.floor(Math.random() * 256);
   // put them together and return them as an RGB colour
   return "rgb(" + r + ", " + g + ", " + b + ")";
}
