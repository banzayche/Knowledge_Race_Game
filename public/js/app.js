'use strict'

$(document).ready(function(){
	function GameProcess(){
		var canvas = document.getElementById('myCanvas'),
		context = canvas.getContext('2d'),
		succesLearning = 1,
		currentLearning,
		// gameStation = "starting" --> start of the game
		// gameStation = "running" --> gaming process
		// gameStation = "game_over" --> end of the game
		gameStation = "starting",
		points = 0,
		pointsFlag = true,
		positionVariation = 1,
		whoBehidLine = 0,
		// for arrow keys
		keyState = {},
		// -------------
		points = 0,
		car = new Game.gameObjConstructor.car(185, 480, 22,35, "car"),

		// CAR
		carImageObj = new Image(),
		canDrawCar = false;
		carImageObj.onload = function() {
			canDrawCar = true;
		};
		carImageObj.src = '/images/car3.png';
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

		// ----CONTROLLERS-----------------------------
			function Correction(){
				// adding new value of y position-
				if(gameStation === "running"){
					for (var i = 1; i<drawArray.length; i++) {
						drawArray[i].y +=6;
					}
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
						// get current distance-----------
							(function(){
								var carCenter = drawArray[0].get_box_center(),
								successBoxesCenter,
								distance;

								successBoxesCenter = obj.get_box_center(),
								distance = obj.get_distance(successBoxesCenter, carCenter);

								// GoodHit - столкновение с положительным обьектом
								if (distance <= drawArray[0].get_box_radius()+obj.get_box_radius() && obj.type === "good"){
							    	console.log("Win")
							    	console.log(obj.value)
							    	// obj.type = "noneGod";
							    	// drawArray.splice(i,1);
							    	if(pointsFlag === true){
							    		points ++;
							    		pointsFlag = false;
							    	}
							    	// Window wich show to us the star
							    	var width = 30,
							    		height = 40;
							    	function drawStar(){
							    			width +=2;
							    			height +=2;
							    		context = canvas.getContext('2d');
						        		context.drawImage(starImageObj, obj.x, obj.y-20, width, height);
						        		winningWindow = requestAnimationFrame(drawStar);
							    	}
						        	var winningWindow = requestAnimationFrame(drawStar);
									setTimeout(function(){cancelAnimationFrame(winningWindow); pointsFlag = true;}, 200);
									// ----------------------------------------------------------------

							    // fatalHit - столкновение с нежелательным обьектом, которое влечет перезагрузку уровня
							    }
							    if (distance <= drawArray[0].get_box_radius()+obj.get_box_radius() && obj.type === "bad"){
							    	console.log("Looser")
							    	gameStation = "game_over";
							    }
							})()
						// --------------------------------

						if(obj.y >= 570){
							whoBehidLine++;
					    	if(positionVariation === 1){
					    		obj.y = -50;
								obj.x = variantsPosition[0][i-1].x;
								console.log("positionVariation 1")
								if(whoBehidLine >= drawArray.length){
						    		whoBehidLine = 0;
						    		positionVariation++;
						    	}
					    	} else if(positionVariation === 2){
					    		obj.y = -50;
								obj.x = variantsPosition[1][i-1].x;
								console.log("positionVariation 2")
								if(whoBehidLine >= drawArray.length){
						    		whoBehidLine = 0;
						    		positionVariation--;
						    	}
					    	}
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

				context = canvas.getContext('2d');
				context.font = 'bold 40pt Calibri';
				context.fillStyle = 'white';
				context.fillText("Your's points: "+points, 30, 550);
				// stopping of AnimationFrame
				getFrame("stop")

				setTimeout(function(){
			    		gameStation = "starting";
			    		points = 0;
			    		drawArray=[car];
			    		createDrawArray(drawArray, variantsPosition[0])
			    		getFrame("start")
			    }, 2000);
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

		        context.font = 'bold 40pt Calibri';
				context.fillStyle = 'green';
				context.fillText(points, 350, 80);
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
			        drawArray[0].x -= 5;
			    }
			    if (keyState[39] || keyState[68]){
			        drawArray[0].x += 5;
			    }

			    // redraw/reposition your object here
			    // also redraw/animate any objects not controlled by the user
			    globalID = requestAnimationFrame(drawCanvas);
			}
		// ------------------------------------------------------------------------------------------

	}GameProcess();
});