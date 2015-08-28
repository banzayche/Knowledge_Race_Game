	function GameProcess(variablesObj){
		var canvas = variablesObj.canvas,
		context = canvas.getContext('2d'),
		// game_station = "starting" --> start of the game
		// game_station = "running" --> gaming process
		// game_station = "game_over" --> end of the game
		info_star = function (){
			return {
				container: document.getElementById('stars-container'),
				quantity: variablesObj.gameRulesObject.starsQuantity,
				color_quantity: stars_counter
			}
		},
		hitStarObj = {
			width: 0,
			height: 0,
			x: 0,
			y: 0,
			can_draw: false
		},
		deffault_game_speed = variablesObj.gameRulesObject.gameSpeed,
		deffault_car_speed = variablesObj.gameRulesObject.car.turnSpeed,
		reading_of_rules = true,
		game_station = "starting",
		get_document_DOM = $(document),
		position_variation = 1,
		who_behid_line = 0,
		starFrame,
		plumeCounter = 0,
		stars_counter = 0,
		frame_counter = 0,
		last_hit_word_index = 0,
		intro_animation_counter = true,
		intro_animation_timeout,
		// For animation frame
		runAnimation,
		stop_runing,
		//
		keyState = {},
		points_counter = 0,
		car = new Game.gameObjConstructor.car(variablesObj.gameRulesObject.car.x, variablesObj.gameRulesObject.car.y, variablesObj.gameRulesObject.car.width, variablesObj.gameRulesObject.car.height, "car"),
		drawArray = [car];


		// -------------CREATING_OF_DRAW-ARRAY--------------------------------------
		function createDrawArray(arr, obj){
			obj.map(function( obj, index ) {
				arr.push(new Game.gameObjConstructor.box(obj.x, obj.y, variablesObj.gameRulesObject.boxes.width, variablesObj.gameRulesObject.boxes.height, obj.type, index, obj.value, obj.indexValue));
			});
		};

		// For default starting game
		// get_document_DOM.trigger("startMusic:play");
		createDrawArray(drawArray, variablesObj.variantsPosition[0]);
		getFrame("start");
		// -----------------------------------------------------------------------------


		// --------------FOR ANIMATION FRAME------------------------
		// function which calls requestAnimationFrame
		function getFrame(value){
			playButtonDecor(value);
			if(value === "start"){
				frame_counter ++;
				runAnimation = requestAnimationFrame(drawCanvas);
				stop_runing = false;
				if(frame_counter > 1){
					cancelAnimationFrame(runAnimation);
					frame_counter = 1;
				}
			} else{
				cancelAnimationFrame(runAnimation);
				stop_runing = true;
				frame_counter --;
			}

		}
		$("body").keyup(function(e){

			if(e.keyCode === 13 && game_station === "running"){
				playOnClick()
			}

			if(e.keyCode === 17){
				clearWords()
			}

			if(e.keyCode === 38){
				if(variablesObj.gameRulesObject.gameSpeed > 10){
					console.log('Max speed!')
				} else{
					variablesObj.gameRulesObject.gameSpeed += 1;
					variablesObj.gameRulesObject.car.turnSpeed += 1;
				}
			} else if(e.keyCode === 40){
				if(variablesObj.gameRulesObject.gameSpeed <= 2){
					console.log('Min speed!')
				} else{
					variablesObj.gameRulesObject.gameSpeed -= 1;
					variablesObj.gameRulesObject.car.turnSpeed -= 1;
				}
			}
		});

		$("#reset-words").click(function(){
			clearWords()
		});
		function clearWords(){
			last_hit_word_index = 0;

			points_counter = 0;
			var lineObj = {
					line: $('#current-sentence'),
					info: $('#info-words'),
					quantity: variablesObj.gameRulesObject.lengthSentence,
					catch_quantity: 0,
				}
			createSentese.clearLine(lineObj);
		}

		$("#myCanvas").click(function(e){
			playOnClick();
		});

		$("#play").click(function(e){
			playOnClick();
		});
		function playButtonDecor(value){
			var play_button_DOM = $('#play'),
			get_document_DOM = $(document);
			if(value === 'stop'){
				play_button_DOM.removeClass("play-on");
				play_button_DOM.html('<span class="glyphicon glyphicon-play"></span>');
				get_document_DOM.focus();
			} else{
				play_button_DOM.addClass("play-on");
				play_button_DOM.html('<span class="glyphicon glyphicon-pause"></span>');
				get_document_DOM.focus();
			}
		}
		function playOnClick(){
			if(stop_runing === true && game_station === "running"){
				getFrame("start");
				get_document_DOM.trigger("BgMusic:play");
			} else if(stop_runing === false && game_station === "running"){
				getFrame("stop");

				// Pause Drawing
				context.font = 'bold 25pt Calibri';
				context.fillStyle = '#008EFF';
				context.fillText('PAUSE!', 155, 280);
				context.shadowColor = 'black';
				context.shadowColor = 'black';
				// Pause Drawing //

				get_document_DOM.trigger("BgMusic:stop");
				get_document_DOM.trigger("startMusic:play");
			}
		};

		// ----CONTROLLER-----------------------------
			function Correction(){
				// adding new value of y position
				if(game_station === "running"){
					for (var i = 1; i<drawArray.length; i++) {
						drawArray[i].y += variablesObj.gameRulesObject.gameSpeed;
					}
				}
				// -------------------------------

				// rules for Car motion----
				var maxX = canvas.width-car.width,
					minX = 0;
				if(drawArray[0].x <= minX) {
					drawArray[0].x = minX;
				} else if (drawArray[0].x >= maxX){
					drawArray[0].x = maxX;
				}
				drawArray[0]
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
							word_y,
							word_x_begin,
							word_x_end,
							carRadius = drawArray[0].get_box_radius(),
							variationPositionsQuantity = variablesObj.variantsPosition.length;

							successBoxesCenter = obj.get_box_center(),
							distance = obj.get_distance(successBoxesCenter, carCenter);

							// distance to words
							if(obj.type === "good"){
			      				obj.width = Math.floor(context.measureText(obj.value).width);

								word_y = obj.y+carRadius;
								word_x_begin = Math.floor(obj.x-carRadius/2);
								word_x_end = Math.floor(obj.x + obj.width + carRadius/2);
							}

							// GoodHit - столкновение с положительным обьектом
							if (word_y >= carCenter.y && carCenter.x > word_x_begin && carCenter.x < word_x_end && obj.type === "good" && obj.hit === true){

							   // if right index of word
							   if(obj.indexValue === last_hit_word_index){
							   		points_counter++;
							   		starDrawing(obj);
							   		// add word to line
								   var sentenceInfo = {
									   	line: $('#current-sentence'),
									   	new_word: obj.value,
									   	quantity_word: variablesObj.gameRulesObject.arr.length,

									   	info: $('#info-words'),
										quantity: variablesObj.gameRulesObject.lengthSentence,
										catch_quantity: points_counter,
								   };
								   createSentese.addWord(sentenceInfo);

								   last_hit_word_index = obj.indexValue+1;

								   get_document_DOM.trigger("hitWordMusic:play");
							   } else{
							   		get_document_DOM.trigger("quizBadResultMusic:play");
							   }

							   obj.hit = false;

							   // when quiz run
							   // если собранных слов столько же, сколько в начальном массиве - сравниваем предложения.
							   var sentence_from_Dom = $('#current-sentence').html();
							   if(points_counter >= variablesObj.gameRulesObject.lengthSentence){
							   		// строки верны - +звезда
							   		if(sentence_from_Dom === ' '+variablesObj.gameRulesObject.sentenceString){
							   			stars_counter++;
							   			createStar.addStars(info_star());
							   		}
							   		points_counter = 0;
							   }
							   if(stars_counter >= variablesObj.gameRulesObject.starsQuantity){
							   		game_station = "quiz";
							   }
							}
							if (distance <= drawArray[0].get_box_radius()+obj.get_box_radius() && obj.type === "bad" && obj.can_hit === true){

							    	getSecondChance(obj);

							    	get_document_DOM.trigger("badHitMusic:play");
							}
						// --------------------------------

						if(obj.y >= canvas.height){
							obj.can_hit = true;

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


							// variationPositionsQuantity - quantity of changing positions
							who_behid_line++;
							for(var j = 1; j <= variationPositionsQuantity; j++){
								if(j < variationPositionsQuantity && position_variation === j){
						    		obj.y = 0-obj.height;
									obj.x = variablesObj.variantsPosition[(j-1)][i-1].x;
									if(who_behid_line >= drawArray.length){
							    		who_behid_line = 0;
							    		position_variation++;
							    	}
						    	} else if(j === variationPositionsQuantity && position_variation === j){
						    		obj.y = 0-obj.height;
									obj.x = variablesObj.variantsPosition[(j-1)][i-1].x;
									if(who_behid_line >= drawArray.length){
							    		who_behid_line = 0;
							    		position_variation = 1;
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
			// CANVAS VIEW========================================================
			function starDrawing(obj){
				// Window wich show to us the star
					hitStarObj.can_draw = true;
					hitStarObj.width = variablesObj.gameRulesObject.star.width,
					hitStarObj.height = variablesObj.gameRulesObject.star.height,
                    hitStarObj.y = obj.y-obj.height,
                    hitStarObj.x = obj.x;
					function drawStar(){
                        hitStarObj.width += variablesObj.gameRulesObject.star.addWidth;
                        hitStarObj.height += variablesObj.gameRulesObject.star.addHeight;
                       	hitStarObj. y -= variablesObj.gameRulesObject.star.addY;
						starFrame = requestAnimationFrame(drawStar);
					}
					starFrame = requestAnimationFrame(drawStar);
					setTimeout(function(){cancelAnimationFrame(starFrame); hitStarObj.can_draw = false;}, 500);
			}
			function drawBoxes(index){
				if(drawArray[index].type === 'good'){
					context.beginPath();
					context.font = 'bold 25px Calibri';
					context.fillStyle = 'white';
					context.shadowColor = '#539FE2';

					wordBlinking(drawArray[index]);

					context.shadowBlur = 3;
				    context.shadowOffsetX = 0;
				    context.shadowOffsetY = 1;
					context.fillText(drawArray[index].value, drawArray[index].x, drawArray[index].y);
					context.closePath();
				} else{
				   	context.beginPath();
				   	context.shadowColor = '#539FE2';
					context.shadowBlur = 3;
				    context.shadowOffsetX = 0;
				    context.shadowOffsetY = 1;
				   	context.drawImage(badImageObj, drawArray[index].x, drawArray[index].y, drawArray[index].width, drawArray[index].height);
				   	context.closePath();
				}
			};


			// word lightning===================
			function wordBlinking(obj){
				if(last_hit_word_index >= variablesObj.gameRulesObject.lengthSentence){
					last_hit_word_index = 0;
				}

				if(obj.indexValue === last_hit_word_index){
					obj.lightning = true;
				} else{
					obj.lightning = false;
				}

				if(obj.lightning === true){
					if(plumeCounter < 6){
						return context.fillStyle = '#539FE2';
					} else if(plumeCounter >= 6){
						return context.fillStyle = 'white';
					} else if(plumeCounter > 12){
						plumeCounter = 0;
					}
					plumeCounter++;
				}
			}
			// plumeOfEngine===================
			function plumeOfEngine(){
				if(plumeCounter < 6){
					var x = drawArray[0].x+drawArray[0].width/2;
					var y = drawArray[0].y-8+drawArray[0].height/2;
					var radius = 30;
			      	var startAngle = 0.3 * Math.PI;
			      	var endAngle = 0.7 * Math.PI;
			      	var counterClockwise = false;

			      	context.beginPath();
			      	context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
			      	context.lineWidth = 6;

			      	// line color
			      	context.strokeStyle = 'rgba(66,245,242,.33)';
			      	context.shadowColor = 'yellow';
			      	context.shadowBlur = 20;
			      	context.stroke();
				} else if(plumeCounter > 12){
					plumeCounter = 0;
				}
				plumeCounter++;
			}
			// / plumeOfEngine=============
			function getBurst(obj){
				get_document_DOM.trigger("BgMusic:stop");
				get_document_DOM.trigger("gameOverMusic:play");

				$('#frame').addClass('burst-animation');
				setTimeout(function(){$('#frame').removeClass('burst-animation');}, 2000);

				var step = [200, 400, 600];
				setTimeout(function(){
					context.beginPath();
					context.shadowColor = 'transparent';
					context.drawImage(burst1ImageObj, obj.x, obj.y, obj.width, obj.height);
					context.closePath();
				}, step[0])
				setTimeout(function(){
					context.beginPath();
					context.shadowColor = 'transparent';
					context.drawImage(burst2ImageObj, obj.x, obj.y, obj.width+20, obj.height+20);
					context.closePath();
				}, step[1])
				setTimeout(function(){
					context.beginPath();
					context.shadowColor = 'transparent';
					context.drawImage(burst3ImageObj, obj.x, obj.y, obj.width+30, obj.height+30);
					context.closePath();
				}, step[2])

				return step[2];
			}
			function drawCar(){
				plumeOfEngine()

				context.beginPath();
				context.shadowColor = 'transparent';
				context.rect(0, 0, canvas.width, canvas.height);
				context.drawImage(carImageObj, drawArray[0].x, drawArray[0].y, drawArray[0].width, drawArray[0].height);
				context.closePath();
			};
			function drawGameOver(){
				$(".game-over").show(500);
				// stopping of AnimationFrame
				getFrame("stop")

				// 600 ms
				getBurst(drawArray[0]);
				// restart level
				setTimeout(getStartAttrs, 2000);
			};
			function drawStartCanvas(){
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.beginPath();

				context.rect(0, 0, canvas.width, canvas.height);
				context.fillStyle = 'rgba(4,4,4,0.9)';
				context.shadowColor = 'black';
			    context.shadowBlur = 20;
			    context.shadowOffsetX = 10;
			    context.shadowOffsetY = 10;

				context.font = 'bold 25pt Calibri';
				context.fillStyle = '#008EFF';
				context.fillText('Click to start!', 120, 280);
				context.shadowColor = 'black';
				context.shadowColor = 'black';

				context.closePath();

				// Level and stars
				$('#current-level').html("Level "+(variablesObj.gameRulesObject.currentLevel+1));

				createStar.addStars(info_star());
				// Clear line
				last_hit_word_index = 0;
				var lineObj = {
					line: $('#current-sentence'),
					info: $('#info-words'),
					quantity: variablesObj.gameRulesObject.lengthSentence,
					catch_quantity: 0,
				}
				createSentese.clearLine(lineObj);

				// next game_station
				game_station = "running";
			};

			// MODALS VIEW==============================================
			function drawStartModals(){
				$(".game-over").hide(500);
				if(reading_of_rules === true){
					drawRulesModal('onStart');
				} else if(reading_of_rules === false){
					// get music
					get_document_DOM.trigger("startMusic:play");
					// stopping of AnimationFrame
					getFrame("stop");

					var rules_object = {
						title: variablesObj.gameRulesObject.start_splash.title,
						content: variablesObj.gameRulesObject.start_splash.content,
						show: variablesObj.gameRulesObject.start_splash.show,
						toDo: function(){
							drawStartCanvas();
						},
					}
					getModalSplash(rules_object);
				}
			};

			$("#rules-button").click(function(){
				getFrame('stop');
				drawRulesModal();
			});

			function drawRulesModal(val){
				if(val === 'onStart'){
					getFrame('stop');
					var rules_object = {
						title: variablesObj.gameRulesObject.rules_splash.title,
						content: variablesObj.gameRulesObject.rules_splash.content,
						show: variablesObj.gameRulesObject.rules_splash.show,
						toDo: function(){
							intro_animation('stop')
							reading_of_rules = false;
							getFrame('start');
						},
					}
					getModalSplash(rules_object);
				} else{
					var rules_object = {
						title: variablesObj.gameRulesObject.rules_splash.title,
						content: variablesObj.gameRulesObject.rules_splash.content,
						show: variablesObj.gameRulesObject.rules_splash.show,
						toDo: function(){
							reading_of_rules = false;
						},
					}
					getModalSplash(rules_object);
				}
			}

			// QUIZ====================================================================
			function showTheQuiz(quizObj){
				get_document_DOM.trigger("BgMusic:stop");
				get_document_DOM.trigger("quizStartMusic:play");

				var my_modal_DOM = $('#quizModal'),
					quiz_question_DOM = $('#quizQuestion'),
					quiz_answers_DOM = $('#quizAnswers');
				// canceling drawing of star
				cancelAnimationFrame(starFrame);
				// canceling drawing of all game
				getFrame("stop");
				quiz_question_DOM.html(variablesObj.gameRulesObject.question);
				variablesObj.gameRulesObject.answersVariant.map(function(ans, index){
					var answer = document.createElement('a');
					answer.setAttribute("class", "list-group-item answers");
					answer.setAttribute("index", index);
					answer.setAttribute("href", "#");
					answer.innerHTML = ans;
					quiz_answers_DOM.append(answer);
				});
				my_modal_DOM.modal('show');

				workingWithAnswers();
			}
		// -------------------------------------------------------------------------------------------
		// Help Functions---------------------------------------------------------------------------------
		function getModalSplash(obj){
			if(obj.show == true){
				var splash_modal = true;
				var rules_modal_DOM = $('#splashModal'),
						rules_header_DOM = $('#splash-header'),
						rules_content_DOM = $('#splash-content'),
						rules_footer_DOM = $('#splash-footer');

				rules_header_DOM.html(obj.title);
				rules_content_DOM.html(obj.content);
				rules_modal_DOM.modal('show');


				$('#splashModal .modal-content').slideDown();


				function onKeupEvent(e){
					if(e.keyCode === 13 && splash_modal === true){
						$('#splashModal .modal-content').hide(500);
						splash_modal = false;
						unbinEvents();
						rules_modal_DOM.modal('hide');

						obj.toDo();
					}
				}
				function onclickEvent(){
					$('#splashModal .modal-content').hide(500);
					splash_modal = false;
					unbinEvents();
					rules_modal_DOM.modal('hide');

					obj.toDo();
				}
				function unbinEvents(){
					$("#splash-footer>.hide-splash").unbind( "click", onclickEvent );
					$("body").unbind( "keyup", onKeupEvent );
				}

				$("body").bind( "keyup", onKeupEvent );
				$("#splash-footer>.hide-splash").bind( "click", onclickEvent );
			} else{
				obj.toDo();
			}
		}

		function getStartAttrs(){
				variablesObj.gameRulesObject.gameSpeed = deffault_game_speed;
				variablesObj.gameRulesObject.car.turnSpeed = deffault_car_speed;
				game_station = "starting";
			    points_counter = 0;
			    stars_counter = 0;
			    drawArray=[car];
			    createDrawArray(drawArray, variablesObj.variantsPosition[0])
			    getFrame("start")
		}
		function getSecondChance(obj){
			if(stars_counter > 0){
				stars_counter--;

				createStar.addStars(info_star());
				points_counter = 0;

				// Clear line
				last_hit_word_index = 0;
				var lineObj = {
					line: $('#current-sentence'),
					info: $('#info-words'),
					quantity: variablesObj.gameRulesObject.lengthSentence,
					catch_quantity: 0,
				}
				createSentese.clearLine(lineObj);

				getFrame('stop');
				obj.can_hit = false;
				getBurst(obj);

				setTimeout(function(){getFrame('start');get_document_DOM.trigger("BgMusic:play");}, 2000);
			} else{
				game_station = "game_over";
			}
		}

		function workingWithAnswers(){
				var can_answer = true,
					value_on_focus,
					my_modal_DOM = $('#quizModal'),
					quiz_answers_DOM = $('#quizAnswers'),
					quiz_answers_a_DOM = $("#quizAnswers>a"),
					body_DOM = $('body');

				function focusAnswer(index){
					quiz_answers_DOM.find("a[index="+index+"]").focus()
					value_on_focus = index;
				}

				setTimeout(function(){focusAnswer(0);}, 500);
				quiz_answers_a_DOM.mouseover(function(e){
					var index = $(e.target).attr('index');
					focusAnswer(index);
				});

				quiz_answers_a_DOM.keydown(function(e){
					if(e.keyCode === 38){
			        	e.preventDefault();
						if(value_on_focus > 0){
							focusAnswer(value_on_focus-1);
						} else{
							focusAnswer(variablesObj.gameRulesObject.answersVariant.length-1);
						}
					}
					if(e.keyCode === 40){
						e.preventDefault();
						if(value_on_focus < variablesObj.gameRulesObject.answersVariant.length-1){
							focusAnswer(value_on_focus+1);
						} else{
							focusAnswer(0);
						}
					}
				});
				quiz_answers_a_DOM.keyup(function(e){
					if(e.keyCode === 13 && can_answer == true){
						checkingAncwer(e)
					}
				});
				// checking the answer
				quiz_answers_a_DOM.click(function(e){
					// user can unswer only one time
					if(can_answer == true){
						checkingAncwer(e)
					}
					});
					// =======================================CLICK=====================================
					function checkingAncwer(e){
						get_document_DOM.trigger("quizClickingAnswerMusic:play");

						// result of clicked answer
						var result = $(e.target).html();
							// animation of pressed answer
						$(e.target).addClass("pressedAnswer");
						// marking of answers
						setTimeout(function(){
							quiz_answers_a_DOM.removeClass("pressedAnswer");
							quiz_answers_a_DOM.addClass("wrongAnswers");
							quiz_answers_DOM.find("a[index="+variablesObj.gameRulesObject.rightIndex+"]").removeClass("wrongAnswers").addClass("trueAnswers");
						},1000);
							// if answer right
						if(result === variablesObj.gameRulesObject.answersVariant[variablesObj.gameRulesObject.rightIndex]){
							setTimeout(function(){
								body_DOM.addClass("bodyGood");
								get_document_DOM.trigger("quizGoodResultMusic:play");
							},1000);
							can_answer = false;
							setTimeout(function(){
								body_DOM.removeClass("bodyGood").removeClass("bodyBad")


								my_modal_DOM.modal('hide');
								quiz_answers_DOM.html('');

								// obj for splash screen
								var rules_object = {
									title: variablesObj.gameRulesObject.end_splash.title,
									content: variablesObj.gameRulesObject.end_splash.content,
									show: variablesObj.gameRulesObject.end_splash.show,
									toDo: function(){
										game_station = "starting";
										getStartAttrs();
									},
								}
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

									rules_object.toDo = function(){
										var rules_object = {
											title: variablesObj.gameRulesObject.result_splash.title,
											content: variablesObj.gameRulesObject.result_splash.content,
											show: variablesObj.gameRulesObject.result_splash.show,
											toDo: function(){
												game_station = "starting";
												getStartAttrs();
											},
										}
										getModalSplash(rules_object);
									}
								}
								//--------------------------------------------------------------------
								getModalSplash(rules_object);

							}, 2400)


						// if answer false
						} else{
							setTimeout(function(){
								body_DOM.addClass("bodyBad");
								get_document_DOM.trigger("quizBadResultMusic:play");
							},1000);
							can_answer = false;
							setTimeout(function(){
								body_DOM.removeClass("bodyGood").removeClass("bodyBad")
								game_station = "starting";
								getStartAttrs();
								my_modal_DOM.modal('hide')
								quiz_answers_DOM.html('')
							}, 2400)
						}
					}
			}
		// ------------------------------------------------------------------------------------------




		function intro_animation(value){
			function intro_animationEvent(e){
				if(e.keyCode === 13){
					intro_animation('stop')
					drawStartModals();
					clearTimeout(intro_animation_timeout);

					$("body").unbind('keyup', intro_animationEvent);
				}
			}

			if(value === 'start'){
				get_document_DOM.trigger("introAnimation:play");
				getFrame('stop');
				$("header").hide();
			    $("footer").hide();

			    $("#intro_animation").show();

			    $("body").bind('keyup', intro_animationEvent);

			    $("#intro_animation").click(function(){
					intro_animation('stop')
					drawStartModals();
					clearTimeout(intro_animation_timeout);
				});
			} else if(value === 'stop'){
				get_document_DOM.trigger("startMusic:play");
				$("#intro_animation").hide();

				$("header").show();
			    $("footer").show();
			}


		}

		// ----------------------DRAWING of CANVAS------------------------------------------------
			function drawCanvas(){
				// getting car position
				// (when we call this function we also do closure of "runAnimation = requestAnimationFrame(drawCanvas);" that's why we have a looping drawing)
				// gameLoop();
				runAnimation = requestAnimationFrame(gameLoop);
				//

				context.clearRect(0, 0, canvas.width, canvas.height);
				// when the game is starting
			    if(game_station === "starting"){
			    	if(intro_animation_counter === true){

				    	$('#intro_animation').load(function(){
				    		intro_animation('start');
			    			intro_animation_counter = false;

			    			intro_animation_timeout = setTimeout(function(){
								drawStartModals();
								intro_animation('stop');
							}, 30000);
				    	});

						return;
			    	} else{
			    		drawStartModals();
				    	// stopping running this function
				    	// we don't need drawing of boxes or car
				    	return;
			    	}
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

			    if(game_station === "quiz"){
			    	showTheQuiz();
			    	return;
		        }
			    // when you hit "Bad" box
			    if(game_station === "game_over"){
			    	drawGameOver();
		        }

		        // star drawing
		        if(hitStarObj.can_draw === true){
		        	context.drawImage(starImageObj, hitStarObj.x, hitStarObj.y, hitStarObj.width, hitStarObj.height);
		        }
			}
		// ------------------------------------------------------------------------


		//--------------------------------MOVING of CAR-----------------------------------------------------
			// loop for redrawing of canvas when keydown or keyup happened
			window.addEventListener('keydown',function(e){
				if (e.keyCode == 37 || e.keyCode == 65 || e.keyCode == 38){
			        e.preventDefault();
			    }
			    if (e.keyCode == 39 || e.keyCode == 68 || e.keyCode == 40){
			        e.preventDefault();
			    }

				keyState[0];
			    keyState[e.keyCode || e.which] = true;
			},true);
			window.addEventListener('keyup',function(e){
			    keyState[e.keyCode || e.which] = false;
			},true);

			function gammaControlling(){
			    if (window.DeviceOrientationEvent) {
			    	window.addEventListener("deviceorientation", function(event){
			    		var gammaResult = Math.round(event.gamma),
			    			car = drawArray[0];
			    		if(gammaResult > 5){
			    			keyState[0] = true;
			    		} else if(gammaResult < -5){
			    			keyState[0] = false;
			    		} else{
			    			keyState[0] = 'middle';
			    		}

			    		console.log("Listen")
			    	});
			    }
			} gammaControlling();

			function gameLoop() {
				var car = drawArray[0];

			    if (keyState[37] || keyState[65]){
			        car.x -= variablesObj.gameRulesObject.car.turnSpeed;
			    }
			    if (keyState[39] || keyState[68]){
			        car.x += variablesObj.gameRulesObject.car.turnSpeed;
			    }

				if(keyState[0] === true){
					car.x += variablesObj.gameRulesObject.car.turnSpeed;
				}
				if(keyState[0] === false){
					car.x -= variablesObj.gameRulesObject.car.turnSpeed;
				}
				if(keyState[0] === 'middle'){
					car.x = car.x;
				}

			    if(car.x >= canvas.width){
					car.x = canvas.width-car.width;
				} else if(car.x <= 0){
					car.x = 0;
				}
			    // redraw/reposition your object here
			    // also redraw/animate any objects not controlled by the user
			    drawCanvas();
			}
		// ------------------------------------------------------------------------------------------

	}
