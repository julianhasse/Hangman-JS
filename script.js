/* ------- Hangman by Julian Hasse, 2017 ---------- */
/* ------- ============================= ---------- */



/* ------ Plain javascript trick which works across all browsers to check when the DOM is available ----- */
r(function() {


/* ----- Declare variables and create arrays ----- */
    var questionBank = new Array;
    var wordArray = new Array;
    var previousGuesses = new Array;
    var currentWord;
    var currentClue;
    var wrongAnswerCount;
    var theme = new Audio('audio/theme.mp3');  // loads theme audio
    var success = new Audio('audio/cheers.mp3');  // loads success audio
    var defeatSound = new Audio('audio/defeat.mp3');  // loads defeat audio
	theme.loop = true; // theme loops
	theme.volume = 0.3; // set volume
	
/* ----- Reads words from local file (data.js) ----- */	
	( function() {  
		for(i = 0; i < wordlist.length; i++){   // words and clues are stored in questionbank array
			questionBank[i] = new Array;
			questionBank[i][0] = wordlist[i].word;
			questionBank[i][1] = wordlist[i].clue;
		}
		titleScreen(); // calls opening screen
	 })(); // function()

/* ----- Opening screen + start button ----- */
function titleScreen() { 
	document.getElementById("gameContent").innerHTML = ('<div id="gameTitle">NEW GAME</div><div id="startButton" class="button">PLAY</div>');
	document.body.innerHTML += '<footer id="footerGame">All Rights Reserved&reg; 2017<div id="logoLego"><img class="legoBrick" src="images/redBrick.png"></div></footer>';		
	document.getElementById("startButton").onclick = function(){gameScreen()};
} // titleScreen
	
	
/* ----- Setup main screen ----- */
function gameScreen() {
	document.getElementById("gameContent").innerHTML = "" // clears game area
	theme.play(); // plays theme
	document.getElementById("gameContent").innerHTML = ('<div id="pixHolder"><img id="hangman" src="images/man.png"></div>');
	document.getElementById("gameContent").innerHTML += ('<div id="wordHolder"></div>');
	document.getElementById("gameContent").innerHTML += ('<div id="clueHolder"><img src="images/az.png" width="60px">&nbspto GUESS &nbsp<img src="images/enter.png" width="60px">&nbsp to END&nbsp / </div>');
	document.getElementById("gameContent").innerHTML += ('<div id="guesses">Previous guesses:</div>');
	document.getElementById("gameContent").innerHTML += ('<div id="feedback"></div>');
	document.getElementById("gameContent").innerHTML += ('<form><input type="text" id="dummy" ></form>');
	document.body.innerHTML += '<footer id="footerGame">All Rights Reserved&reg; 2017<div id="logoLego"><img class="legoBrick" src="images/redBrick.png"></div></footer>';		

	getWord(); // Sets tiles for every letter of the selected word
	var numberOfTiles = currentWord.length; 
	wrongAnswerCount = 0; // initialize wrongAnswer
	previousGuesses = []; // initialize array of previousGuess
			 
	for( i = 0; i < numberOfTiles; i++){ // creates tiles for letters on screen
		document.getElementById("wordHolder").innerHTML += ('<div class="tile" id=t'+i+'></div>');
	}
			
	document.getElementById("clueHolder").innerHTML += ("Hint: "+currentClue); // adds Hints
	document.addEventListener("keyup", handleKeyUp);
	document.addEventListener("click", function(){document.getElementById("dummy").focus();});
	document.getElementById("dummy").focus();
}// gamescreen


/* ----- Generates a random word and clue from the questionBank -----*/
function getWord() {   
	var rnd = Math.floor(Math.random()*questionBank.length);
	currentWord = questionBank[rnd][0];
	currentClue = questionBank[rnd][1];
	questionBank.splice(rnd,1); 
	wordArray = currentWord.split(""); // splits the word			
}// getword
			
/* ----- Event listener (keys) ----- */	
function handleKeyUp(event) { 

	if(event.keyCode>64 && event.keyCode<91){  //filters any character that is not a letter
		var found = false;
		var previouslyEntered = false;
		var input = String.fromCharCode(event.keyCode).toLowerCase();
	
		for( i = 0 ; i < previousGuesses.length; i++){ if(input == previousGuesses[i]){previouslyEntered = true;}}
				
		if(!previouslyEntered){
			previousGuesses.push(input);
			for(i = 0; i < wordArray.length; i++){
				if(input == wordArray[i]){found = true;document.getElementById("t"+i).innerHTML += (input);}	
			}// for
				
			if(found){checkAnswer();}
			else{wrongAnswer(input);}
		}// if
	}// if
}// handlekeyup
	

function checkAnswer(){
	var currentAnswer="";	
	for(i = 0 ; i < currentWord.length; i++){
		currentAnswer += document.getElementById("t" + i).innerText;
	}		
	if(currentAnswer == currentWord){
		victoryMessage();
	};
}// checkanswer
		
function wrongAnswer(a){
	wrongAnswerCount++;
	var pos = (wrongAnswerCount*-75) +"px"
	document.getElementById("guesses").innerHTML += ("  "+a);  // adds wrong guesses to the "previous guesses" list
	document.getElementById("hangman").style = "left:" + pos +";" ; // for every wrong letter the dummy is positioned 75px to the left.
	if(wrongAnswerCount == 6){ // max number of wrong answers (6).
		defeatMessage();}
}// wronganswer
		

function victoryMessage(){
	document.activeElement.blur();
	document.addEventListener("keydown", handleKeyUp);
	document.getElementById("feedback").innerHTML += ("CORRECT!<br><br><div id='replay' class='button'>MORE WORDS</div>");
	document.getElementById("replay").onclick = function(){
		if(questionBank.length > 0){
			gameScreen()}
		else{finalPageVictory()}
	};
}// victory
	

function defeatMessage(){
	document.activeElement.blur();
	document.addEventListener("keydown", handleKeyUp);
	document.getElementById("feedback").innerHTML += ("You are Dead!<br>(answer is "+ currentWord +")<div id='replay' class='button'>TRY AGAIN</div>");
	document.getElementById("replay").onclick = function(){
		if(questionBank.length > 0){
			gameScreen()}
		else{finalPageDefeat()}
	};
}// defeat

function finalPageVictory(){
	document.getElementById("gameContent").innerHTML = "" // clears game area
	success.play(); // plays victory audio
	document.getElementById("gameContent").innerHTML += ('<div id="finalMessage">You have cleared level 1</div>');
	document.getElementById("gameContent").innerHTML += ('<div id="finalMessage"><a href="index2.html"><button class="buttonNew">Level 2</button></a></div>');
	document.getElementById("gameContent").innerHTML += ('<footer id="footerGameVic">All Rights Reserved&reg; 2017><div id="logoLego"><img class="legoBrick" src="images/redBrickVictory.png"></div></footer>')

}// finalPageVictory

function finalPageDefeat(){
	document.getElementById("gameContent").innerHTML = "" // clears game area
	theme.pause();
	defeatSound.play(); // plays defeat sound
	document.getElementById("gameContent").innerHTML += ('<div id="finalMessage">Sorry, you lost!</div>');
	document.getElementById("gameContent").innerHTML += ('<div id="finalMessage"><a href="index.html"><button class="buttonNew">Play again</button></a></div>');
	document.getElementById("gameContent").innerHTML += ('<footer id="footerGameVic">All Rights Reserved&reg; 2017><div id="logoLego"><img class="legoBrick" src="images/redBrickDefeat.png"></div></footer>')

}// finalPageDefeat
	
});
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}

/* End ----- Hangman by Julian Hasse® 2017 ----- */