function soundConfigurator(engineMusic){
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
				on( "quizBadResultMusic:play", playQuizBadResultMusic).
				on( "introAnimation:play", introAnimation);

	var standartVolume = 0.8,
		currentVolume = 0.8,
		backgroundMusic = new Audio(),
		secondPlanMusic = new Audio();

		function changeVolume(value){
			if(value === "off"){
				currentVolume = 0;
			} else{
				currentVolume = standartVolume;
			}
			backgroundMusic.volume = currentVolume;
			secondPlanMusic.volume = currentVolume;
			start_music.volume = currentVolume;
			bg_car_engine.volume = currentVolume;
			quiz_start_music.volume = currentVolume;
			clicking_answer.volume = currentVolume;
			good_result_quiz.volume = currentVolume;
			bad_result_quiz.volume = currentVolume;
			game_over.volume = currentVolume;
			word_hit.volume  = currentVolume;
			intro_animation.volume = currentVolume;
		}

		var start_music = new Audio(engineMusic.startMusic);
		start_music.preload = "true";

		var bg_car_engine = new Audio(engineMusic.bgMusic);
		bg_car_engine.preload = "true";

		var quiz_start_music = new Audio(engineMusic.quizStartMusic);
		quiz_start_music.preload = "true";

		var clicking_answer = new Audio(engineMusic.clickingAnswer);
		bg_car_engine.preload = "true";

		var good_result_quiz = new Audio(engineMusic.goodResultQuiz);
		good_result_quiz.preload = "true";

		var bad_result_quiz = new Audio(engineMusic.badResultQuiz);
		bg_car_engine.preload = "true";

		var game_over = new Audio(engineMusic.gameOver);
		start_music.preload = "true";

		var word_hit = new Audio(engineMusic.wordHit);
		bg_car_engine.preload = "true";

		var intro_animation = new Audio(engineMusic.intro);
		bg_car_engine.preload = "true";

		changeVolume();
	// function for event
	// Operations with volume
	function volumeOn(){
		changeVolume();
	}
	function volumeOff(){
		changeVolume('off');
	}
	// Game BG music
	function playBgMusic(){
		backgroundMusic.pause();
		console.log("playing bg music");
		backgroundMusic = bg_car_engine;
		backgroundMusic.loop = true;
		backgroundMusic.currentTime="0";
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
		secondPlanMusic = quiz_start_music;
		secondPlanMusic.play();
	}
	// good hit music
	function playHitWordMusic(){
		secondPlanMusic.pause();
		console.log("playing hit words music");
		secondPlanMusic = word_hit;
		secondPlanMusic.currentTime="0";
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
		backgroundMusic = start_music;
		backgroundMusic.loop = true;
		backgroundMusic.currentTime="0";
		backgroundMusic.play();
	}
	// intro animation
	// game over music
	function introAnimation(){
		backgroundMusic.pause();
		console.log("playing game over music");
		backgroundMusic = intro_animation;
		backgroundMusic.loop = false;
		backgroundMusic.currentTime="0";
		backgroundMusic.play();
	}
	// game over music
	function playGameOverMusic(){
		backgroundMusic.pause();
		console.log("playing game over music");
		backgroundMusic = game_over;
		backgroundMusic.loop = false;
		backgroundMusic.currentTime="0";
		backgroundMusic.play();
	}
	// Clicking answer music
	function playQuizClickingAnswerMusic(){
		secondPlanMusic.pause();
		console.log("playing Clicking answer music");
		secondPlanMusic = clicking_answer;
		secondPlanMusic.currentTime="0";
		secondPlanMusic.play();
	}
	// Quiz result music
	function playQuizGoodResultMusic(){
		secondPlanMusic.pause();
		console.log("playing Quiz good result music");
		secondPlanMusic = good_result_quiz;
		secondPlanMusic.currentTime="0";
		secondPlanMusic.play();
	}
	function playQuizBadResultMusic(){
		backgroundMusic.pause();
		console.log("playing Quiz bad result music");
		secondPlanMusic = bad_result_quiz;
		secondPlanMusic.currentTime="0";
		secondPlanMusic.play();
	}
};

soundConfigurator(Game.getMusic);