'use strict'

var Game = {
	// constructor for game objects
	gameObjConstructor: {
		// static car
		car: function(x, y, width, height, type){
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.type = type;

			// for getting center of box
			this.get_box_center = function(){
				var x = (this.width/2)+this.x;
		     	x = Math.round(x);
		     	var y = (this.height/2)+this.y;
		     	y = Math.round(y);
				return {x: x, y: y}
			};
			// personal zone of object
			this.get_box_radius = function(){
				if(this.width > this.height){
					return Math.floor(this.height/2);
				} else{
					return Math.floor(this.width/2);
				}
			};
		},
		// for runing boxes
		box: function(x, y, width, height, type, id, value, indexValue){
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.type = type;
			this.id = id;
			this.distance = undefined;
			this.points = 0;

			if(this.type === "good"){
				this.hit = true;
				this.indexValue= indexValue;
				this.value = value;
			}

			// for getting center of box
			this.get_box_center = function(){
				var x = (this.width/2)+this.x;
		     	x = Math.round(x);
		     	var y = (this.height/2)+this.y;
		     	y = Math.round(y);
				return {x: x, y: y}
			};
			// personal zone of object
			this.get_box_radius = function(){
				if(this.width > this.height){
					return Math.floor(this.height/2);
				} else{
					return Math.floor(this.width/2);
				}
			};
			// get destance from box to car
			this.get_distance = function(box_center, car_center){
				var newPlace = {x: box_center.x, y: car_center.y};

				var B_side = Math.floor(newPlace.y - box_center.y);
			    var C_side = Math.floor(newPlace.x - car_center.x);
			    var A_side = Math.floor(Math.sqrt(B_side*B_side+C_side*C_side));

			    return A_side;
			}
		}
	},
	getMusic : {
		bgMusic: './music/car_bg.mp3',
		wordHit: './music/word_hit.mp3',
		startMusic: './music/intro_game.mp3',
		gameOver: './music/game_over.mp3',
		quizStartMusic: './music/beginning_of_quiz.mp3',
		clickingAnswer: './music/clicking_answer.mp3',
		goodResultQuiz: './music/good_answer.mp3',
		badResultQuiz: './music/something_bad.mp3',
	}
};