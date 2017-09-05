/* ------- Hangman by Julian Hasse, 2017 ---------- */
/* ------- ============================= ---------- */



/* ------ Plain javascript trick which works across all browsers to check when the DOM is available ----- */
r(function(){


/* ----- Audio ----- */
	
	var theme = new Audio('audio/themeCredits.mp3');  // loads theme audio
	var success = new Audio('audio/cheers.mp3');  // loads success audio
	var defeatSound = new Audio('audio/defeat.mp3');  // loads defeat audio
	theme.loop = true; // theme loops
	theme.volume = 0.5; // set volume
	
/* ----- Calls titleScreen ----- */	
	(function(){  
				titleScreen(); // calls opening screen
	 })(); // function()

/* ----- Credits ----- */
function titleScreen(){ 
	theme.play(); // plays theme
	document.getElementById("gameContent").innerHTML = ('<div id="gameTitle">HANGMAN<sup>&reg;</sup></div><div id="startButton" class="button">THE GAME</div>');
} // titleScreen

	
});
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}

/* End ----- Hangman by Julian Hasse® 2017 ----- */