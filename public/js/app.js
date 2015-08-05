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

		pointsFlag = true,
		positionVariation = 1,
		whoBehidLine = 0,
		starFrame,
		// for arrow keys
		keyState = {},
		// -------------
		points = 47,
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
				arr.push(new Game.gameObjConstructor.box(obj.x, obj.y, width, height, obj.type, index, obj.value, obj.indexValue));
			});
		};
		createDrawArray(drawArray, variantsPosition[0])
		// -----------------------------------------------------------------------------


		// --------------FOR ANIMATION FRAME------------------------
			var runAnimation,
				stopRuning;
				getFrame("start");
			// function which calls requestAnimationFrame
			function getFrame(value){
				if(value === "start"){
					runAnimation = requestAnimationFrame(drawCanvas);
					stopRuning = false;
				} else{
					cancelAnimationFrame(runAnimation);
					stopRuning = true;
				}
			}
			$("body").keyup(function(e){
				if(e.keyCode === 13 && stopRuning === true && gameStation === "running"){
					getFrame("start");
				} else if(e.keyCode === 13 && stopRuning === false && gameStation === "running"){
					getFrame("stop");
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
							var carCenter = drawArray[0].get_box_center(),
							successBoxesCenter,
							distance;

							successBoxesCenter = obj.get_box_center(),
							distance = obj.get_distance(successBoxesCenter, carCenter);

							// GoodHit - столкновение с положительным обьектом
							if (distance <= drawArray[0].get_box_radius()+obj.get_box_radius() && obj.type === "good" && obj.hit === true){
							    points ++;

							   starDrawing(obj);
							   // fatalHit - столкновение с нежелательным обьектом, которое влечет перезагрузку уровня
							   obj.hit = false;

							   if(points === gameRulesObject.pointsAtAll){
							   		gameStation = "quiz";
							   }
							}
							if (distance <= drawArray[0].get_box_radius()+obj.get_box_radius() && obj.type === "bad"){
							    	gameStation = "game_over";
							}
						// --------------------------------

						if(obj.y >= 570){
							if(obj.hit === false) {
								obj.hit = true;
							}
							// changing values of good boxes after his hidding
							if(obj.type === "good"){
								if(obj.indexValue+2 < gameRulesObject.arr.length ){
									obj.indexValue = obj.indexValue+2;
									obj.value = gameRulesObject.arr[obj.indexValue];
								} else if(obj.indexValue+2 === gameRulesObject.arr.length){
									obj.indexValue = 0;
									obj.value = gameRulesObject.arr[obj.indexValue];
								} else if(obj.indexValue+2 === gameRulesObject.arr.length+1) {
									obj.indexValue = 1;
									obj.value = gameRulesObject.arr[obj.indexValue];
								}
							}


							whoBehidLine++;
					    	if(positionVariation === 1){
					    		obj.y = 0;
								obj.x = variantsPosition[0][i-1].x;
								if(whoBehidLine >= drawArray.length){
						    		whoBehidLine = 0;
						    		positionVariation++;
						    	}
					    	} else if(positionVariation === 2){
					    		obj.y = 0;
								obj.x = variantsPosition[1][i-1].x;
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
			function starDrawing(obj){
				// Window wich show to us the star
					var width = 30,
						height = 40,
                        y = obj.y-60,
                        x = obj.x;
					function drawStar(){
                        width +=15;
                        height +=15;
                        y -= 20;
						context.drawImage(starImageObj, x, y, width, height);
						starFrame = requestAnimationFrame(drawStar);
					}
					starFrame = requestAnimationFrame(drawStar);
					setTimeout(function(){cancelAnimationFrame(starFrame); pointsFlag = true;}, 1000);
			}
			function drawBoxes(index){
				if(drawArray[index].type === 'good'){
					context.beginPath();
					context.font = 'bold 25pt Calibri';
					context.fillStyle = 'red';
					context.shadowColor = 'grey';
					context.fillText(drawArray[index].value, drawArray[index].x, drawArray[index].y);
					context.closePath();
				} else{
				   	context.beginPath();
				   	context.drawImage(badImageObj, drawArray[index].x, drawArray[index].y, drawArray[index].width, drawArray[index].height);
				   	context.closePath();
				}
			};
			function drawCar(){
				context.beginPath();
				context.shadowColor = 'transparent';
				context.rect(0, 0, canvas.width, canvas.height);
				context.drawImage(carImageObj, drawArray[0].x, drawArray[0].y, drawArray[0].width, drawArray[0].height);
				context.closePath();
			};
			function drawGameOver(){
				context.clearRect(0, 0, canvas.width, canvas.height);
			    context.beginPath();
				context.rect(0, 0, canvas.width, canvas.height);

				context.fillStyle = 'rgba(4,4,4,0.8)';
				context.fill();

				context.font = 'bold 25pt Calibri';
				context.fillStyle = 'red';
				context.fillText('Game Over!', 120, 280);

				context = canvas.getContext('2d');
				context.font = 'bold 40pt Calibri';
				context.fillStyle = 'white';
				context.fillText("Your's points: "+points, 30, 550);

				context.closePath();
				// stopping of AnimationFrame
				getFrame("stop")

				setTimeout(getStartAttrs, 2000);
			};
			function drawStart(){
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.beginPath();

				context.rect(0, 0, canvas.width, canvas.height);
				context.fillStyle = 'rgba(4,4,4,0.9)';
				context.shadowColor = 'black';
			    context.shadowBlur = 20;
			    context.shadowOffsetX = 10;
			    context.shadowOffsetY = 10;

				context.font = 'bold 25pt Calibri';
				context.fillStyle = 'green';
				context.fillText('Press Enter!', 120, 280);
				context.shadowColor = 'black';
				context.shadowColor = 'black';

				context.closePath();

				// stopping of AnimationFrame
				getFrame("stop");

				// next gameStation
				gameStation = "running";
			};
			function getStartAttrs(){
				gameStation = "starting";
			    points = 0;
			    drawArray=[car];
			    createDrawArray(drawArray, variantsPosition[0])
			    getFrame("start")
			}
			function showTheQuiz(quizObj){
				// canceling drawing of star
				cancelAnimationFrame(starFrame);
				// canceling drawing of all game
				getFrame("stop");
				// clearing of quiz element


				gameRulesObject.answersVariant.map(function(ans, index){
					var answer = document.createElement('a');
					answer.setAttribute("class", "list-group-item answers");
					answer.setAttribute("index", index);
					answer.innerHTML = ans;
					$("#quizAnswers").append(answer);
				});
				$('#myModal').modal('show');

				// checking the answer
				$("#quizAnswers>a").click(function(e){
					// result of clicked answer
					var result = $(e.target).html();

					if(result === gameRulesObject.answersVariant[gameRulesObject.rightIndex]){
						console.log('Nice Work')
						setTimeout(function(){
							gameStation = "starting";
							$('#myCanvas').show();
							$('h1').css('visibility', 'hidden');
							getStartAttrs();
							$('#myModal').modal('hide')
							$("#quizAnswers").html('')
						}, 4000)
					} else{
						console.log('Nice try')
					setTimeout(function(){
						gameStation = "starting";
						$('#myCanvas').show();
						$('h1').css('visibility', 'hidden');
						getStartAttrs();
						$('#myModal').modal('hide')
						$("#quizAnswers").html('')
					}, 4000)
					}

				});
			}
		// -------------------------------------------------------------------------------------------







		// ----------------------DRAWING of CANVAS------------------------------------------------
			function drawCanvas(){
				// getting car position
				// (when we call this function we also do closure of "runAnimation = requestAnimationFrame(drawCanvas);" that's why we have a looping drawing)
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

			    if(gameStation === "quiz"){
			    	showTheQuiz();
			    	return;
		        }
			    // when you hit "Bad" box
			    if(gameStation === "game_over"){
			    	drawGameOver();
		        }

		        context.beginPath();
		        context.font = 'bold 30pt Calibri';
				context.fillStyle = 'yellow';
				context.fillText("Total points: "+points, 80, 80);
				context.lineWidth = 1;
			      // stroke color
			      context.strokeStyle = 'orange';
			      context.strokeText("Total points: "+points, 80, 80);
				context.fill();
				context.closePath();
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
			    runAnimation = requestAnimationFrame(drawCanvas);
			}
		// ------------------------------------------------------------------------------------------

	}GameProcess();
});