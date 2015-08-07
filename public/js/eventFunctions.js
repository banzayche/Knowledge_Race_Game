// event
$(document).on( "BgMusic:play", playBgMusic).
			on( "BgMusic:stop", stopBgMusic).
			on( "hitWordMusic:play", playHitWordMusic).
			on( "badHitMusic:play", playBadHitMusic).
			on( "startMusic:play", playStartMusic).
			on( "gameOverMusic:play", playGameOverMusic).
			on( "quizBgMusic:play", playQuizBgMusic).
			on( "quizBgMusic:stop", stopQuizBgMusic).
			on( "quizClickingAnswerMusic:play", playQuizClickingAnswerMusic).
			on( "quizGoodResultMusic:play", playQuizGoodResultMusic).
			on( "quizBadResultMusic:play", playQuizBadResultMusic);

// function for event
var backgroundMusic = new Audio(),
	secondPlanMusic = new Audio();


// Game BG music
function playBgMusic(){
	console.log("playing bg music");
}
function stopBgMusic(){
	console.log("stopping bg music");
}
//Quiz BG music
function playQuizBgMusic(){
	console.log("playing Quiz BG music");
}
function stopQuizBgMusic(){
	console.log('stopping Quiz BG music');
}

// good hit music
function playHitWordMusic(){
	console.log("playing hit words music");
}
// bad hit music
function playBadHitMusic(){
	console.log("playing badHit music");
}
// start music
function playStartMusic(){
	console.log("playing start music");
}
// game over music
function playGameOverMusic(){
	console.log("playing game over music");
}
// Clicking answer music
function playQuizClickingAnswerMusic(){
	console.log("playing Clicking answer music");
}
// Quiz result music
function playQuizGoodResultMusic(){
	console.log("playing Quiz good result music");
}
function playQuizBadResultMusic(){
	console.log("playing Quiz bad result music");
}