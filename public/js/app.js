'use strict'

$(document).ready(function(){

	var variantsPosition = [
		[
			{
				id: 0,
				type: "good",
				x: 140,
				y: -355,
				value: "You"
			}, {
				id: 1,
				type: "good",
				x: 50,
				y: -70,
				value: "have to"
			}, {
				id: 2,
				type: "bad",
				x: 150,
				y: -30
			}, {
				id: 3,
				type: "bad",
				x: 360,
				y: -165

			}, {
				id: 4,
				type: "bad",
				x: 140,
				y: -260
			}, {
				id: 5,
				type: "bad",
				x: 280,
				y: -440
			}, {
				id: 6,
				type: "bad",
				x: 0,
				y: -460
			}
		], [
			{
				id: 0,
				type: "good",
				x:12,
				y: -355,
				value: "You"
			}, {
				id: 1,
				type: "good",
				x:12,
				y: -70,
				value: "have to"
			}, {
				id: 2,
				type: "bad",
				x:12,
				y: -30
			}, {
				id: 3,
				type: "bad",
				x:12,
				y: -165

			}, {
				id: 4,
				type: "bad",
				x:12,
				y: -260
			}, {
				id: 5,
				type: "bad",
				x:12,
				y: -450
			}, {
				id: 6,
				type: "bad",
				x:12,
				y: -450
			}
		], [
			{
				id: 0,
				type: "good",
				x: 140,
				y: -355,
				value: "You"
			}, {
				id: 1,
				type: "good",
				x: 50,
				y: -70,
				value: "have to"
			}, {
				id: 6,
				type: "bad",
				x: 0,
				y: -450
			}, {
				id: 3,
				type: "bad",
				x: 280,
				y: -450
			}, {
				id: 4,
				type: "bad",
				x: 140,
				y: -260
			}, {
				id: 5,
				type: "bad",
				x: 360,
				y: -165
			}, {
				id: 5,
				type: "bad",
				x: 150,
				y: -30
			}
		], [
			{
				id: 0,
				type: "good",
				x: 140,
				y: -355,
				value: "You"
			}, {
				id: 1,
				type: "good",
				x: 50,
				y: -70,
				value: "have to"
			}, {
				id: 2,
				type: "bad",
				x: 150,
				y: -30
			}, {
				id: 3,
				type: "bad",
				x: 360,
				y: -165

			}, {
				id: 4,
				type: "bad",
				x: 140,
				y: -260
			}, {
				id: 5,
				type: "bad",
				x: 280,
				y: -450
			}, {
				id: 6,
				type: "bad",
				x: 0,
				y: -450
			}
		]
	];

	function GameProcess(){
		var canvas,context,
		succesLearning = 1,
		currentLearning,
		// gameStation = "starting" --> start of the game
		// gameStation = "running" --> gaming process
		// gameStation = "game_over" --> end of the game
		gameStation = "starting",

		positionVariation = 0,
		whoBehidLine = 0,
		// for arrow keys
		keyState = {},
		// -------------
		points = 0,
		car = new Game.gameObjConstructor.car(185, 520, 22,35, "car"),

		// CAR
		carImageObj = new Image(),
		canDrawCar = false;
		carImageObj.onload = function() {
			canDrawCar = true;
		};
		carImageObj.src = '/images/car3.jpg';
		// --------------------------------------------
		// BAD
		var badImageObj = new Image();
		var canDrawBad = false;
		carImageObj.onload = function() {
			canDrawBad = true;
		};
		badImageObj.src = '/images/bad.png';
		// ----------------------------------------------
		// STAR
		var starImageObj = new Image();
		var canDrawStar = false;
		carImageObj.onload = function() {
			canDrawStar = true;
		};
		starImageObj.src = '/images/star.png';
		// --------------------------------------
		var drawArray,
		// var successBoxes = [
		// 	new Game.gameObjConstructor.box(140, -355, 40, 30, "good", 5, "Hey"),
		// 	new Game.gameObjConstructor.box(50, -70, 40, 30, "good", 6, "You"),
		// ],
		// errorBoxes = [
		// 	new Game.gameObjConstructor.box(0, -450, 60, 50, "bad", 0),
		// 	new Game.gameObjConstructor.box(280, -450, 60, 50, "bad", 1),
		// 	new Game.gameObjConstructor.box(140, -260, 60, 50, "bad", 2),
		// 	new Game.gameObjConstructor.box(360, -165, 60, 50, "bad", 3),
		// 	new Game.gameObjConstructor.box(150, -30, 60, 50, "bad", 4),
		// ],
		succesLearning = 3,
		currentLearning = 0,
		question = "",
		answers = [],
		trueAnsverIndex = 2;

		// -------------CREATING_OF_DRAW-ARRAY--------------------------------------
		drawArray = [car];
		function createDrawArray(arr, obj){
			var width = 60,
				height = 50;
			obj.map(function( obj, index ) {
				arr.push(new Game.gameObjConstructor.box(obj.x, obj.y, width, height, obj.type, index, obj.value));
			});
		};
		createDrawArray(drawArray, variantsPosition[0])
		// -----------------------------------------------------------------------------
		var drawArray2 = [car];
		createDrawArray(drawArray2, variantsPosition[1])
		console.log(drawArray2)

		// --------------FOR ANIMATION FRAME------------------------
			var globalID,
				stopID;
				getFrame("start");
			// function which calls requestAnimationFrame
			function getFrame(value){
				if(value === "start"){
					globalID = requestAnimationFrame(drawCanvas);
				} else{
					stopID = cancelAnimationFrame(globalID);
				}
			}
			$("body").keyup(function(e){
				if(e.keyCode === 13){
					getFrame("start");
				}
			});
			$("body").click(function(e){
				if(e.target.id == "start"){
					getFrame("start")
				} else if(e.target.id == "stop"){
					getFrame("stop")
				}
			});
		// cancelAnimationFrame(globalID);



		// --------DEFAULT VALUE--------------------------------------
			function setDeffValue(){
				car = new Game.gameObjConstructor.car(185, 520, 25, 40, "car"),
				successBoxes = [
					new Game.gameObjConstructor.box(140, -355, 40, 30, "good", 5, "Hey"),
					new Game.gameObjConstructor.box(50, -70, 40, 30, "good", 6, "You"),
				],
				errorBoxes = [
					new Game.gameObjConstructor.box(0, -450, 60, 50, "bad", 0),
					new Game.gameObjConstructor.box(280, -450, 60, 50, "bad", 1),
					new Game.gameObjConstructor.box(140, -260, 60, 50, "bad", 2),
					new Game.gameObjConstructor.box(360, -165, 60, 50, "bad", 3),
					new Game.gameObjConstructor.box(150, -30, 60, 50, "bad", 4),
				],
				drawArray = [car, successBoxes[0], successBoxes[1], errorBoxes[0], errorBoxes[1], errorBoxes[2], errorBoxes[3], errorBoxes[4]];
			}
		// ---------------------------------------------------------





		// ----CONTROLLERS-----------------------------
			function Correction(){
				// adding new value of y position-
				for (var i = 1; i<drawArray.length; i++) {
					drawArray[i].y +=5;
				}
				// -------------------------------

				// rules for Car motion----
				var maxX = 395,
					minX = 2
				if(drawArray[0].x <= minX) {
					drawArray[0].x = minX;
				} else if (drawArray[0].x >= maxX){
					drawArray[0].x = maxX;
				}
				//---------------------------

				// rules for boxes--------------
				drawArray.forEach(function( obj, i ) {
					if(i === 0){
						return;
					} else{
						if(obj.y >= 570){
							obj.y = -10;
							obj.x = variantsPosition[0][i-1].x;
							// obj.y = 1;
							// obj.x = 1;
						}
					}
				});
				// -----------------------------
			};
		// -------------------------------------------------------------





		// -------------------VIEWS-------------------------------------------------------------------
			function drawBoxes(index){
				if(drawArray[index].type === 'good'){
					context.font = 'bold 25pt Calibri';
					context.fillStyle = 'red';
					context.fillText(drawArray[index].value, drawArray[index].x, drawArray[index].y);
				} else{
				   	context = canvas.getContext('2d');
				   	context.beginPath();
				   	context.drawImage(badImageObj, drawArray[index].x, drawArray[index].y, drawArray[index].width, drawArray[index].height);
				}
			};
			function drawCar(){
				context = canvas.getContext('2d');
				context.beginPath();
				context.rect(0, 0, canvas.width, canvas.height);
				context.drawImage(carImageObj, drawArray[0].x, drawArray[0].y, drawArray[0].width, drawArray[0].height);
			};
			function drawGameOver(){
				context = canvas.getContext('2d');
			    context.beginPath();
				context.rect(0, 0, canvas.width, canvas.height);
				context.fillStyle = 'rgba(4,4,4,0.5)';
				context.fill();

				context.font = 'bold 25pt Calibri';
				context.fillStyle = 'red';
				context.fillText('Game Over!', 120, 280);

				// stopping of AnimationFrame
				getFrame("stop")
			};
			function drawStart(){
				context = canvas.getContext('2d');
				context.clearRect(0, 0, canvas.width, canvas.height);

				context = canvas.getContext('2d');
			    context.beginPath();
				context.rect(0, 0, canvas.width, canvas.height);
				context.fillStyle = 'rgba(4,4,4,0.5)';
				context.fill();

				context.font = 'bold 25pt Calibri';
				context.fillStyle = 'red';
				context.fillText('Press Enter!', 120, 280);

				// stopping of AnimationFrame
				getFrame("stop");

				// next gameStation
				gameStation = "running";
			};
		// -------------------------------------------------------------------------------------------







		// ----------------------DRAWING of CANVAS------------------------------------------------
			function drawCanvas(){
				// getting car position
				// (when we call this function we also do closure of "globalID = requestAnimationFrame(drawCanvas);" that's why we have a looping drawing)
				gameLoop();
				//

				canvas = document.getElementById('myCanvas');
				context = canvas.getContext('2d');
				context.clearRect(0, 0, canvas.width, canvas.height);

				// when the game is starting
			    if(gameStation === "starting"){
			    	drawStart();
			    	// stopping running this function
			    	// we don't need drawing of boxes or car
			    	return;
		        }

				// отрисовка игрового процесса сама гонка
			    for(var i = 0; i<drawArray.length; i++){
			    	// первый элемент - АВТО
			    	if(i === 0){
			 			drawCar();
			 		// остальные это ЯЩИКИ и СЛОВА
			    	} else{
						drawBoxes(i);
			    	}
			    }

			    // control of game rules
			    Correction();

			    // when you hit "Bad" box
			    if(gameStation === "game_over"){
			    	drawGameOver();
		        }


			}
		// ------------------------------------------------------------------------


		//--------------------------------MOVING of CAR-----------------------------------------------------
			// loop for redrawing of canvas when keydown or keyup happened
			window.addEventListener('keydown',function(e){
			    keyState[e.keyCode || e.which] = true;
			},true);
			window.addEventListener('keyup',function(e){
			    keyState[e.keyCode || e.which] = false;
			},true);

			function gameLoop() {
			    if (keyState[37] || keyState[65]){
			        drawArray[0].x -= 8;
			    }
			    if (keyState[39] || keyState[68]){
			        drawArray[0].x += 8;
			    }

			    // redraw/reposition your object here
			    // also redraw/animate any objects not controlled by the user
			    globalID = requestAnimationFrame(drawCanvas);
			}
		// ------------------------------------------------------------------------------------------

	}GameProcess();
});