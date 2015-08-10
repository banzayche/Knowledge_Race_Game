'use strict'


	function GameProcess(variablesObj){
		var canvas = variablesObj.canvas,
		context = canvas.getContext('2d'),
		// gameStation = "starting" --> start of the game
		// gameStation = "running" --> gaming process
		// gameStation = "game_over" --> end of the game
		readingOfRules = true,
		gameStation = "starting",

		pointsFlag = true,
		positionVariation = 1,
		whoBehidLine = 0,
		starFrame,
		// for arrow keys
		keyState = {},
		// -------------
		points = 47,
		car = new Game.gameObjConstructor.car(variablesObj.gameRulesObject.car.x, variablesObj.gameRulesObject.car.y, variablesObj.gameRulesObject.car.width, variablesObj.gameRulesObject.car.height, "car");

		$(document).trigger("startMusic:play");

		// -------------CREATING_OF_DRAW-ARRAY--------------------------------------
		var drawArray = [car];
		function createDrawArray(arr, obj){
			obj.map(function( obj, index ) {
				arr.push(new Game.gameObjConstructor.box(obj.x, obj.y, variablesObj.gameRulesObject.boxes.width, variablesObj.gameRulesObject.boxes.height, obj.type, index, obj.value, obj.indexValue));
			});
		};
		createDrawArray(drawArray, variablesObj.variantsPosition[0])
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
					$(document).trigger("BgMusic:play");
				} else if(e.keyCode === 13 && stopRuning === false && gameStation === "running"){
					getFrame("stop");
					$(document).trigger("BgMusic:stop");
					$(document).trigger("startMusic:play");
				}
			});
		// ----CONTROLLERS-----------------------------
			function Correction(){
				// adding new value of y position-
				if(gameStation === "running"){
					for (var i = 1; i<drawArray.length; i++) {
						drawArray[i].y += variablesObj.gameRulesObject.gameSpeed;
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
							distance,
							variationPositionsQuantity = variablesObj.variantsPosition.length;

							successBoxesCenter = obj.get_box_center(),
							distance = obj.get_distance(successBoxesCenter, carCenter);

							// GoodHit - столкновение с положительным обьектом
							if (distance <= drawArray[0].get_box_radius()+obj.get_box_radius() && obj.type === "good" && obj.hit === true){
							    points ++;

							   starDrawing(obj);

							   obj.hit = false;

							   if(points === variablesObj.gameRulesObject.pointsAtAll){
							   		gameStation = "quiz";
							   }

							   $(document).trigger("hitWordMusic:play");
							}
							if (distance <= drawArray[0].get_box_radius()+obj.get_box_radius() && obj.type === "bad"){
							    	gameStation = "game_over";
							    	$(document).trigger("badHitMusic:play");
							}
						// --------------------------------

						if(obj.y >= canvas.height){
							if(obj.hit === false) {
								obj.hit = true;
							}
							// changing values of good boxes after his hidding
							if(obj.type === "good"){
								if(obj.indexValue+2 < variablesObj.gameRulesObject.arr.length ){
									obj.indexValue = obj.indexValue+2;
									obj.value = variablesObj.gameRulesObject.arr[obj.indexValue];
								} else if(obj.indexValue+2 === variablesObj.gameRulesObject.arr.length){
									obj.indexValue = 0;
									obj.value = variablesObj.gameRulesObject.arr[obj.indexValue];
								} else if(obj.indexValue+2 === variablesObj.gameRulesObject.arr.length+1) {
									obj.indexValue = 1;
									obj.value = variablesObj.gameRulesObject.arr[obj.indexValue];
								}
							}


							// variationPositionsQuantity - quantity of changing posirions
							whoBehidLine++;
							for(var j = 1; j <= variationPositionsQuantity; j++){
								if(j < variationPositionsQuantity && positionVariation === j){
						    		obj.y = 0-obj.height;
									obj.x = variablesObj.variantsPosition[(j-1)][i-1].x;
									if(whoBehidLine >= drawArray.length){
							    		whoBehidLine = 0;
							    		positionVariation++;
							    	}
						    	} else if(j === variationPositionsQuantity && positionVariation === j){
						    		obj.y = 0-obj.height;
									obj.x = variablesObj.variantsPosition[(j-1)][i-1].x;
									if(whoBehidLine >= drawArray.length){
							    		whoBehidLine = 0;
							    		positionVariation = 1;
							    	}
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
					var width = variablesObj.gameRulesObject.star.width,
						height = variablesObj.gameRulesObject.star.height,
                        y = obj.y-obj.height,
                        x = obj.x;
					function drawStar(){
                        width += variablesObj.gameRulesObject.star.addWidth;
                        height += variablesObj.gameRulesObject.star.addHeight;
                        y -= variablesObj.gameRulesObject.star.addY;
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

				$(document).trigger("BgMusic:stop");
				$(document).trigger("gameOverMusic:play");
				setTimeout(getStartAttrs, 2000);
			};
			function drawStart(){
				if(readingOfRules === true){
					drawRules()
				} else if(readingOfRules === false){

					$(document).trigger("startMusic:play");

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
				}
			};
			function drawRules(){

				context.clearRect(0, 0, canvas.width, canvas.height);
				context.beginPath();

				context.rect(0, 0, canvas.width, canvas.height);
				context.fillStyle = 'rgba(4,4,4,0.9)';
				context.font = 'bold 25pt Calibri';
				context.fillText('You have to read the rules!', 20, 280);
				context.shadowColor = 'transparent';

				context.fillStyle = 'red';
				context.font = 'bold 15pt Calibri';
				context.fillText('You have to hit the words and in the end of', 30, 340);
				context.fillText('the level answer on some question.', 30, 360);


				context.fillStyle = 'rgba(4,4,4,0.9)';
				context.fillText('Control options:', 30, 390);
				context.fillText('<--- Press Left Arrow - if you want turn left', 30, 410);
				context.fillText('---> Press Right Arrow - if you want turn right', 30, 440);
				context.fillText('Press ENTER - if you want Stop/Play the game', 30, 470);

				context.fillStyle = 'red';
				context.fillText('Press ENTER - if you understand all this things', 20, 550);

				context.closePath();

				$("body").keyup(function(e){
					if(e.keyCode === 13 && readingOfRules === true){
						readingOfRules = false
					}
				});
			}
		// -------------------------------------------------------------------------------------------
		// Functions---------------------------------------------------------------------------------
		// volume Events
		$("#volume").click(function(){
			if($('#volume').attr("class") === 'volume-on'){
				$(document).trigger("volume:off");
				$('#volume').removeClass("volume-on");
				$('#volume').html('<span class="glyphicon glyphicon-volume-off"></span>');
				$(document).focus();
			} else{
				$(document).trigger("volume:on");
				$('#volume').addClass("volume-on");
				$('#volume').html('<span class="glyphicon glyphicon-volume-up"></span>');
				$(document).focus();
			}
		});
		// =============

		function getStartAttrs(){
				gameStation = "starting";
			    points = 0;
			    drawArray=[car];
			    createDrawArray(drawArray, variablesObj.variantsPosition[0])
			    getFrame("start")
			}
		function showTheQuiz(quizObj){
			$(document).trigger("BgMusic:stop");
			$(document).trigger("quizStartMusic:play");

			// canceling drawing of star
			cancelAnimationFrame(starFrame);
			// canceling drawing of all game
			getFrame("stop");
			$("#quizQuestion").html(variablesObj.gameRulesObject.question);
			variablesObj.gameRulesObject.answersVariant.map(function(ans, index){
				var answer = document.createElement('a');
				answer.setAttribute("class", "list-group-item answers");
				answer.setAttribute("index", index);
				answer.setAttribute("href", "#");
				answer.innerHTML = ans;
				$("#quizAnswers").append(answer);
			});
			$('#myModal').modal('show');

			workingWithAnswers();
		}

		function workingWithAnswers(){
				var canAnsew = true,
					valueOnFocus;
				function focusAnswer(index){
					$("#quizAnswers").find("a[index="+index+"]").focus()
					valueOnFocus = index;
				}
				focusAnswer(0);
				$("#quizAnswers>a").keyup(function(e){
					if(e.keyCode === 38){
						if(valueOnFocus > 0){
							focusAnswer(valueOnFocus-1);
						} else{
							focusAnswer(variablesObj.gameRulesObject.answersVariant.length-1);
						}
					}
					if(e.keyCode === 40){
						if(valueOnFocus < variablesObj.gameRulesObject.answersVariant.length-1){
							focusAnswer(valueOnFocus+1);
						} else{
							focusAnswer(0);
						}
					}
				});
				$("#quizAnswers>a").keyup(function(e){
					if(e.keyCode === 13 && canAnsew == true){
						checkingAncwer(e)
					}
				});
				// checking the answer
				$("#quizAnswers>a").click(function(e){
					// user can unswer only one time
					if(canAnsew == true){
						checkingAncwer(e)
					}
					});
					// =======================================CLICK=====================================
					function checkingAncwer(e){
						$(document).trigger("quizClickingAnswerMusic:play");

						// result of clicked answer
						var result = $(e.target).html();
							// animation of pressed answer
						$(e.target).addClass("pressedAnswer");
						// marking of answers
						setTimeout(function(){
							$("#quizAnswers>a").removeClass("pressedAnswer");
							$("#quizAnswers>a").addClass("wrongAnswers");
							$("#quizAnswers").find("a[index="+variablesObj.gameRulesObject.rightIndex+"]").removeClass("wrongAnswers").addClass("trueAnswers");
						},2000);
							// if answer right
						if(result === variablesObj.gameRulesObject.answersVariant[variablesObj.gameRulesObject.rightIndex]){
							setTimeout(function(){
								$("body").addClass("bodyGood");
								$(document).trigger("quizGoodResultMusic:play");
							},2000);
							canAnsew = false;
							setTimeout(function(){
								$("body").removeClass("bodyGood").removeClass("bodyBad")
								// Creatin of new Level----------------------------------------------------
								if(variablesObj.gameRulesObject.currentLevel < variablesObj.enteredDATA.length-1){
									console.log("Current level -  "+(variablesObj.gameRulesObject.currentLevel+1));
									addDataLevel(variablesObj.gameRulesObject.currentLevel+1, variablesObj);
									console.log("Next level -  "+(variablesObj.gameRulesObject.currentLevel+1));
									creatingVarianPosition(variablesObj);
								} else{
									addDataLevel(0, variablesObj);
									creatingVarianPosition(variablesObj);
									console.log("The End of Game")
								}
								//--------------------------------------------------------------------
								gameStation = "starting";
								$('#myCanvas').show();
								$('h1').css('visibility', 'hidden');
								getStartAttrs();
								$('#myModal').modal('hide')
								$("#quizAnswers").html('')
							}, 5000)
						// if answer false
						} else{
							setTimeout(function(){
								$("body").addClass("bodyBad");
								$(document).trigger("quizBadResultMusic:play");
							},2000);
							canAnsew = false;
							setTimeout(function(){
								$("body").removeClass("bodyGood").removeClass("bodyBad")
								gameStation = "starting";
								$('#myCanvas').show();
								$('h1').css('visibility', 'hidden');
								getStartAttrs();
								$('#myModal').modal('hide')
								$("#quizAnswers").html('')
							}, 5000)
						}
					}
			}
		// ------------------------------------------------------------------------------------------






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

			    context.fillStyle = 'green';
			    context.fillText("Level #: "+ (variablesObj.gameRulesObject.currentLevel+1), 80, 130);



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
			        drawArray[0].x -= variablesObj.gameRulesObject.car.turnSpeed;
			    }
			    if (keyState[39] || keyState[68]){
			        drawArray[0].x += variablesObj.gameRulesObject.car.turnSpeed;
			    }

			    // redraw/reposition your object here
			    // also redraw/animate any objects not controlled by the user
			    runAnimation = requestAnimationFrame(drawCanvas);
			}
		// ------------------------------------------------------------------------------------------

	}
