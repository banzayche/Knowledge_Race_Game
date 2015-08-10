// event
$(document).on( "volume:off", volumeOff).
			on( "volume:on", volumeOn).
			on( "BgMusic:play", playBgMusic).
			on( "BgMusic:stop", stopBgMusic).
			on( "hitWordMusic:play", playHitWordMusic).
			// for future functional=================
			on( "badHitMusic:play", playBadHitMusic).
			// ======================================
			on( "startMusic:play", playStartMusic).
			on( "gameOverMusic:play", playGameOverMusic).
			on( "quizStartMusic:play", playQuizStartMusic).
			on( "quizClickingAnswerMusic:play", playQuizClickingAnswerMusic).
			on( "quizGoodResultMusic:play", playQuizGoodResultMusic).
			on( "quizBadResultMusic:play", playQuizBadResultMusic);

// function for event
var standartVolume = 0.8,
	currentVolume = 0.8,
	backgroundMusic = new Audio(),
	secondPlanMusic = new Audio();
	backgroundMusic.volume = currentVolume;
	secondPlanMusic.volume = currentVolume;
// Operations with volume
function volumeOn(){
	currentVolume = standartVolume,
	backgroundMusic.volume = currentVolume;
	secondPlanMusic.volume = currentVolume;
}
function volumeOff(){
	currentVolume = 0,
	backgroundMusic.volume = currentVolume;
	secondPlanMusic.volume = currentVolume;
}
// Game BG music
function playBgMusic(){
	backgroundMusic.pause();
	console.log("playing bg music");
	backgroundMusic.src = './music/car_bg.mp3';
	backgroundMusic.loop = true;
	backgroundMusic.play();
}
function stopBgMusic(){
	backgroundMusic.pause();
	console.log("stopping bg music");
}
//Quiz BG music
function playQuizStartMusic(){
	secondPlanMusic.pause();
	console.log("playing Quiz BG music");
	secondPlanMusic.src = './music/beginning_of_quiz.mp3';
	secondPlanMusic.play();
}

// good hit music
function playHitWordMusic(){
	secondPlanMusic.pause();
	console.log("playing hit words music");
	secondPlanMusic.src = './music/word_hit.mp3';
	secondPlanMusic.play();
}
// bad hit music. For future functionality
function playBadHitMusic(){
	console.log("playing badHit music");
}
// start music
function playStartMusic(){
	backgroundMusic.pause();
	console.log("playing start music");
	backgroundMusic.src = './music/intro_game.mp3';
	backgroundMusic.loop = true;
	backgroundMusic.play();
}
// game over music
function playGameOverMusic(){
	backgroundMusic.pause();
	console.log("playing game over music");
	backgroundMusic.src = './music/game_over.mp3';
	backgroundMusic.loop = false;
	backgroundMusic.play();
}
// Clicking answer music
function playQuizClickingAnswerMusic(){
	secondPlanMusic.pause();
	console.log("playing Clicking answer music");
	secondPlanMusic.src = './music/clicking_answer.mp3';
	secondPlanMusic.play();
}
// Quiz result music
function playQuizGoodResultMusic(){
	secondPlanMusic.pause();
	console.log("playing Quiz good result music");
	secondPlanMusic.src = './music/good_answer.mp3';
	secondPlanMusic.play();
}
function playQuizBadResultMusic(){
	backgroundMusic.pause();
	console.log("playing Quiz bad result music");
	secondPlanMusic.src = './music/something_bad.mp3';
	secondPlanMusic.play();
}