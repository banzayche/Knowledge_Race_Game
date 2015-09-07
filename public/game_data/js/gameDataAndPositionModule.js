var variablesObj;
$(document).ready(function(){
	variablesObj = (function(){
		var gameDataObject = {
			canvas: '',
			gameRulesObject: '',
			enteredDATA: '',
			variantsPosition: '',
		};

		var addImage = function(){
			// CAR
			gameDataObject.carImageObj = new Image();
			gameDataObject.carImageObj.src = './images/falcon.png';
			// BAD
			gameDataObject.badImageObj = new Image();
			gameDataObject.badImageObj.src = './images/fighter.png';
			// ----------------------------------------------
			// burst
			gameDataObject.burst1ImageObj = new Image();
			gameDataObject.burst1ImageObj.src = './images/burst1.png';
			gameDataObject.burst2ImageObj = new Image();
			gameDataObject.burst2ImageObj.src = './images/burst2.png';
			gameDataObject.burst3ImageObj = new Image();
			gameDataObject.burst3ImageObj.src = './images/burst3.png';
			// ----------------------------------------------
			// STAR
			gameDataObject.starImageObj = new Image();
			gameDataObject.starImageObj.src = './images/star.png';
			// --------------------------------------
		};
		// All functions of this part
		// Creating level of Game
		var levelInfo = function() {
			gameDataObject.canvas = document.getElementById('myCanvas');
			// current Level object
			gameDataObject.gameRulesObject = {
				boxes: {
					height: 40,
					width: 45,
				},
				car: {
					height: 45,
					width: 55,
					x: (gameDataObject.canvas.width/3)*1.35,
					y: (gameDataObject.canvas.width/6)*7,
					turnSpeed: 4,
				},
				star: {
					height: gameDataObject.canvas.height/15,
					width: gameDataObject.canvas.width/15,
					// addHeight: 1,
					// addWidth: 1,
					// addY: 5,
					// addX: 20,
				},
				gameSpeed: 4,
				rules_splash: {
					title: 'Instructions',
					content: '<div class="rules-container"><p>You have to hit the words in the right order and in the end of the level answer on some question.<h3>Controls:</h3><div class="alert"><img src="images/left-arrow.png" class="pull-left" />&nbsp;&nbsp;Left arrow - to slide left</div> <div class="alert"><img src="images/right-arrow.png" class="pull-left" />&nbsp;&nbsp;Right arrow - to slide right</div> <div class="alert"><img src="images/up-arrow.png" class="pull-left" />&nbsp;&nbsp;Up arrow - to speed up</div> <div class="alert"><img src="images/down-arrow.png" class="pull-left" />&nbsp;&nbsp;Down arrow - to speed down</div> <div class="alert"><img src="images/enter.png" class="pull-left" />&nbsp;&nbsp;Enter - to Pause/Play the game</div> <div class="alert"><img src="images/ctrl.png" class="pull-left" />&nbsp;&nbsp;Ctrl - to clear line with sentence</div><h3>Gameplay:</h3><img src="images/instruction.png" class="instruction" /> <button id="go-quiz" class="btn-game">Go to quiz, right now!</button> </div>',
					show: true
				},
				result_splash: {
					title: 'You Won This Topic!',
					content: '<img src="images/yoda.png" class="yoda-img" /><p>Knowledge is a big power. Use them in right way! </p><p>You can close this game and choose another topic. Or click "OK" and try this topic again.</p>',
					show: true
				}
			};
			//

			var themesObj = {
				1: [
					{
						sentenceString: "Google Calendar will help you in management your time and in creating rotating meeting requests for regular meetings.",
						// sentenceString: "Google as",
						splitAttr: ' ',
						repeat: 1,
						question: "Which one of the following guidelines stands correct for Google Calendar?",
						answersVariant : ["Check the free/busy status in Google Calendar to ensure all participants are available in the proposed time slot.", "Use the calendar to block the time you need to spend on critical tasks.", "Create rotating meeting requests for regular meetings.", "All of the above."],
						rightIndex : 3,
						start_splash: {
							title: "Сommunication Guidelines. <br />Welcome to First Level!",
							content: 'You have to hit all words',
							show: true
						},
						end_splash: {
							title: "This is the end of the First Level!",
							content: 'Good job!',
							show: true
						}
					},
					{
						sentenceString: "Our company allows the usage of Email, Instant Messaging and Phone as mode of communication.",
						splitAttr: ' ',
						repeat: 2,
						question: "Our company allows the usage of Email, Instant Messaging and Phone as mode of communication.",
						answersVariant : ["True", "False"],
						rightIndex : 0,
						start_splash: {
							title: "Сommunication Guidelines. <br />Welcome to Second Level!",
							content: 'You have to hit all words',
							show: true
						},
						end_splash: {
							title: "This is the end of the Second Level!",
							content: 'Good job!',
							show: true
						}
					},
					{
						sentenceString: "Don't send a TO email even when action is not required.",
						splitAttr: ' ',
						repeat: 3,
						question: "Which of the following is not a good practice for sending an email?",
						answersVariant : ["Send a TO email even when action is not required.", "Never use REPLY ALL, except in group discussions.", "Do not use email for potentially emotional content.", "Include CONFIDENTIAL in an email’s subject line when appropriate."],
						rightIndex : 0,
						start_splash: {
							title: "Сommunication Guidelines. <br />Welcome to Third Level!",
							content: 'You have to hit all words',
							show: true,
						},
						end_splash: {
							title: "This is the end of the Third Level!",
							content: 'Good job!',
							show: true
						}
					},
					{
						sentenceString: "Gtalk - is our choise!",
						splitAttr: ' ',
						repeat: 3,
						question: "Our company yses ____ as its official messenger.",
						answersVariant : ["Yahoo!", "Facebook", "Gtalk", "MSN"],
						rightIndex : 2,
						start_splash: {
							title: "Сommunication Guidelines. <br />Welcome to Fourth Level!",
							content: 'You have to hit all words',
							show: true,
						},
						end_splash: {
							title: "This is the end of the Fourth Level!",
							content: 'Good job!',
							show: true
						}
					}
				],
				2: [
					{
						sentenceString: "The standart time zone of Argentina Time (ART) - 0300 UTC",
						splitAttr: ' ',
						repeat: 1,
						question: "What standart time zone of Argentina?",
						answersVariant : ["Time zone of Argentina Time (ART) - 0500 UTC", "Time zone of Argentina Time (ART) - 0100 UTC", "Time zone of Argentina Time (ART) - 0300 UTC"],
						rightIndex : 2,
						start_splash: {
							title: "Cross-cultural Communication - Argentina. <br />Welcome to First Level!",
							content: 'You have to hit all words',
							show: true
						},
						end_splash: {
							title: "This is the end of the First Level!",
							content: 'Good job!',
							show: true
						}
					},
					{
						sentenceString: "The majority of the population of Argentina speaks Spanish (Castilian).",
						splitAttr: ' ',
						repeat: 2,
						question: "What is the most popular language in Argentina?",
						answersVariant : ["Spanish (Castilian)", "French", "English"],
						rightIndex : 0,
						start_splash: {
							title: "Cross-cultural Communication - Argentina. <br />Welcome to Second Level!",
							content: 'You have to hit all words',
							show: true
						},
						end_splash: {
							title: "This is the end of the Second Level!",
							content: 'Good job!',
							show: true
						}
					},
					{
						sentenceString: "Both men and women greet each other by kissing on the cheek.",
						splitAttr: ' ',
						repeat: 1,
						question: "Argentines can greet by kissing on the cheek?",
						answersVariant : ["a.False", "True"],
						rightIndex : 1,
						start_splash: {
							title: "Cross-cultural Communication - Argentina. <br />Welcome to Third Level!",
							content: 'You have to hit all words',
							show: true,
						},
						end_splash: {
							title: "This is the end of the Third Level!",
							content: 'Good job!',
							show: true
						}
					},
				],
				3: [
					{
						sentenceString: "The standart time zone is Indian Standart Time (IST) - UTC+5:30.",
						splitAttr: ' ',
						repeat: 1,
						question: "The standart time zone of India is ____ ?",
						answersVariant : ["(ASM) - 0500 UTC", "(ART) - 0100 UTC", "(IST) - UTC+5:30"],
						rightIndex : 2,
						start_splash: {
							title: "Cross-cultural Communication - India. <br />Welcome to First Level!",
							content: 'You have to hit all words',
							show: true
						},
						end_splash: {
							title: "This is the end of the First Level!",
							content: 'Good job!',
							show: true
						}
					},
					{
						sentenceString: "India is the world's second populous country.",
						splitAttr: ' ',
						repeat: 2,
						question: "India is among the densely populated countries of the world??",
						answersVariant : ["Yes", "No"],
						rightIndex : 0,
						start_splash: {
							title: "Cross-cultural Communication - India. <br />Welcome to Second Level!",
							content: 'You have to hit all words',
							show: true
						},
						end_splash: {
							title: "This is the end of the Second Level!",
							content: 'Good job!',
							show: true
						}
					},
					{
						sentenceString: "In most indian cities, drivers don't use specified road lines and may cut in front of you without warnings.",
						splitAttr: ' ',
						repeat: 1,
						question: "Drivers can appear aggressive in India?",
						answersVariant : ["No they adhere to all the rules.", "Very rarely", "Yes. In most indian cities, drivers don't use specified road lines and may cut in front of you without warnings."],
						rightIndex : 2,
						start_splash: {
							title: "Cross-cultural Communication - India. <br />Welcome to Third Level!",
							content: 'You have to hit all words',
							show: true,
						},
						end_splash: {
							title: "This is the end of the Third Level!",
							content: 'Good job!',
							show: true
						}
					},
					{
						sentenceString: "Conversations or jokes about sex are not acceptable!",
						splitAttr: ' ',
						repeat: 3,
						question: "Conversations or jokes about sex are acceptable in India?",
						answersVariant : ["Yes, it's not a problem.", "As the rule, conversations or jokes about sex are not acceptable and may be treated as abuse.", "Maybe."],
						rightIndex : 1,
						start_splash: {
							title: "Cross-cultural Communication - India. <br />Welcome to Fourth Level!",
							content: 'You have to hit all words',
							show: true,
						},
						end_splash: {
							title: "This is the end of the Fourth Level!",
							content: 'Good job!',
							show: true
						}
					},
				],
				4: [
					{
						sentenceString: "The standart time zone is UTS/GMT +2 hours, IST - Israel Standart Time.",
						splitAttr: ' ',
						repeat: 1,
						question: "The standart time zone of Israel is ____ ?",
						answersVariant : ["UTS/GMT +2 hours, IST - Israel Standart Time", "(ART) - 0100 UTC", "(IST) - UTC+5:30"],
						rightIndex : 0,
						start_splash: {
							title: "Cross-cultural Communication - Israel. <br />Welcome to First Level!",
							content: 'You have to hit all words',
							show: true
						},
						end_splash: {
							title: "This is the end of the First Level!",
							content: 'Good job!',
							show: true
						}
					},
					{
						sentenceString: "Israelis tend to dress informally.",
						splitAttr: ' ',
						repeat: 2,
						question: "Are Israelis tend to dress informally?",
						answersVariant : ["No.", "Yes, but you should wear a suit if that is how you are using to dressing."],
						rightIndex : 1,
						start_splash: {
							title: "Cross-cultural Communication - Israel. <br />Welcome to Second Level!",
							content: 'You have to hit all words',
							show: true
						},
						end_splash: {
							title: "This is the end of the Second Level!",
							content: 'Good job!',
							show: true
						}
					},
					{
						sentenceString: "It is considered impolite for ladies to wear defiant clothes and make-up.",
						splitAttr: ' ',
						repeat: 1,
						question: "Are ladies can wear defiant clothtes and make-up in Israel?",
						answersVariant : ["No, never.", "Usually - yes.", "Yes the are, but it's considered impolite for ladies to wear defiant clothes and make-up."],
						rightIndex : 2,
						start_splash: {
							title: "Cross-cultural Communication - Israel. <br />Welcome to Third Level!",
							content: 'You have to hit all words',
							show: true,
						},
						end_splash: {
							title: "This is the end of the Third Level!",
							content: 'Good job!',
							show: true
						}
					},
					{
						sentenceString: "Jokes about ladies, police or religion are not acceptable!",
						splitAttr: ' ',
						repeat: 3,
						question: "Can you joke about religion or ladies in Israel?",
						answersVariant : ["Yes, it's not a problem.", "No", "Sometimes, it's depends on situation."],
						rightIndex : 1,
						start_splash: {
							title: "Cross-cultural Communication - Israel. <br />Welcome to Fourth Level!",
							content: 'You have to hit all words',
							show: true,
						},
						end_splash: {
							title: "This is the end of the Fourth Level!",
							content: 'Good job!',
							show: true
						}
					},
				],
				5: [
					{
						sentenceString: "The Ukrainian standart time zone is Eastern European Time (EET) +0200 UTC.",
						splitAttr: ' ',
						repeat: 1,
						question: "The standart time zone of India is ____ ?",
						answersVariant : ["(ASM) - 0500 UTC", "(EET) +0200 UTC", "(IST) - UTC+5:30"],
						rightIndex : 1,
						start_splash: {
							title: "Cross-cultural Communication - Ukraine. <br />Welcome to First Level!",
							content: 'You have to hit all words',
							show: true
						},
						end_splash: {
							title: "This is the end of the First Level!",
							content: 'Good job!',
							show: true
						}
					},
					{
						sentenceString: "Ukraine and Russia are the different countries.",
						splitAttr: ' ',
						repeat: 2,
						question: "Are Ukraine and Russia the same countries?",
						answersVariant : ["Yes", "Of course not."],
						rightIndex : 1,
						start_splash: {
							title: "Cross-cultural Communication - Ukraine. <br />Welcome to Second Level!",
							content: 'You have to hit all words',
							show: true
						},
						end_splash: {
							title: "This is the end of the Second Level!",
							content: 'Good job!',
							show: true
						}
					},
					{
						sentenceString: "Dress formally during your first meeting.",
						splitAttr: ' ',
						repeat: 1,
						question: "How you have to wear during your first meeting in Ukraine?",
						answersVariant : ["It's doesn't matter.", "It is necessary to wear bright clothes.", "Dress formally during your first meeting."],
						rightIndex : 2,
						start_splash: {
							title: "Cross-cultural Communication - Ukraine. <br />Welcome to Third Level!",
							content: 'You have to hit all words',
							show: true,
						},
						end_splash: {
							title: "This is the end of the Third Level!",
							content: 'Good job!',
							show: true
						}
					},
					{
						sentenceString: 'For Ukrainians, "now" means one business day; "urgent" means 3-4 hours; and "critical" means one hour.',
						splitAttr: ' ',
						repeat: 3,
						question: 'For Ukrainians, "now" means one business day; "urgent" means 3-4 hours; and "critical" means one hour?',
						answersVariant : ["True", "False"],
						rightIndex : 0,
						start_splash: {
							title: "Cross-cultural Communication - Ukraine. <br />Welcome to Fourth Level!",
							content: 'You have to hit all words',
							show: true,
						},
						end_splash: {
							title: "This is the end of the Fourth Level!",
							content: 'Good job!',
							show: true
						}
					},
				],
				6: [
					{
						sentenceString: "Americans inspect individual views and allow everyone to voice their own ideas on a subject.",
						splitAttr: ' ',
						repeat: 1,
						question: "Are Americans will not respect your opinions?",
						answersVariant : ["Yes they are.", "Usually - yes.", "No. Americans inspect individual views and allow everyone to voice their own ideas on a subject."],
						rightIndex : 2,
						start_splash: {
							title: "Cross-cultural Communication - USA. <br />Welcome to First Level!",
							content: 'You have to hit all words',
							show: true
						},
						end_splash: {
							title: "This is the end of the First Level!",
							content: 'Good job!',
							show: true
						}
					},
					{
						sentenceString: "Americans are very friendly and helpful.",
						splitAttr: ' ',
						repeat: 3,
						question: "Are Americans are unfriendly and rude?",
						answersVariant : ["True", "False"],
						rightIndex : 1,
						start_splash: {
							title: "Cross-cultural Communication - USA. <br />Welcome to Second Level!",
							content: 'You have to hit all words',
							show: true
						},
						end_splash: {
							title: "This is the end of the Second Level!",
							content: 'Good job!',
							show: true
						}
					},
					{
						sentenceString: "Americans expect you to smile and shake hands when you meet someone.",
						splitAttr: ' ',
						repeat: 2,
						question: "Smile and shaking of hands when you meet someone it's not important in USA?",
						answersVariant : ["Yes.", "Americans expect you to smile and shake hands when you meet someone.", "No, only shakin of hans very important when you meet someone."],
						rightIndex : 1,
						start_splash: {
							title: "Cross-cultural Communication - USA. <br />Welcome to Third Level!",
							content: 'You have to hit all words',
							show: true,
						},
						end_splash: {
							title: "This is the end of the Third Level!",
							content: 'Good job!',
							show: true
						}
					},
					{
						sentenceString: "Time is money!",
						splitAttr: ' ',
						repeat: 4,
						question: "Punctuality is very important for business occasions.",
						answersVariant : ["True", "False"],
						rightIndex : 0,
						start_splash: {
							title: "Cross-cultural Communication - USA. <br />Welcome to Fourth Level!",
							content: 'You have to hit all words',
							show: true,
						},
						end_splash: {
							title: "This is the end of the Fourth Level!",
							content: 'Good job!',
							show: true
						}
					},
				],
			}
			// read url
			var readUrlParams = function(name){
				var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);

				if(results !== null){
					return results[1]
				} else{
					return 1
				}
			}
			// entered DATA
			gameDataObject.enteredDATA = themesObj[readUrlParams('game')];

		};
		// Function of adding data
		var addDataLevel = function(numberLevel) {
			gameDataObject.gameRulesObject.currentLevel = numberLevel;

			var gameRules = gameDataObject.enteredDATA[numberLevel];
			var sentenceString = gameRules.sentenceString,
				wordsArr = sentenceString.split(gameRules.splitAttr);
			function detect_words(arr){
			    var lengthArr = arr.length;
			    if(lengthArr%2 === 0){
			        return arr;
			    } else if(lengthArr === 1){
			    	arr.push(arr[0]);
			    	gameRules.repeat = Math.round(gameRules.repeat/2);
			    	return arr;
			    } else{
			        return searchMin(arr);
			    }
			    function searchMin(arr){
			        var minEl = arr[0],
			            minElIndex = 0;
			        arr.forEach(function(el, index){
			            if(el.length <= minEl.length){
			                minEl = arr[index];
			                minElIndex = index;
			            }
			        });
			        if(arr[minElIndex-1].length <= arr[minElIndex+1].length && minElIndex-1 !== -1){
			            arr[minElIndex-1] = arr[minElIndex-1]+' '+minEl;
			            arr.splice(minElIndex, 1);
			        } else if(minElIndex+1 !== arr.length){
			            arr[minElIndex+1] = minEl+' '+arr[minElIndex+1];
			            arr.splice(minElIndex, 1);
			        }
			        return arr;
			    }
			}
			gameDataObject.gameRulesObject.arr = detect_words(wordsArr);

			gameDataObject.gameRulesObject.lengthSentence = gameDataObject.gameRulesObject.arr.length;
			gameDataObject.gameRulesObject.starsQuantity = gameRules.repeat;
			gameDataObject.gameRulesObject.question = gameRules.question;
			gameDataObject.gameRulesObject.answersVariant = gameRules.answersVariant;
			gameDataObject.gameRulesObject.rightIndex = gameRules.rightIndex;
			gameDataObject.gameRulesObject.sentenceString = gameRules.sentenceString;
			// splashes
			gameDataObject.gameRulesObject.start_splash = gameRules.start_splash;
			gameDataObject.gameRulesObject.end_splash = gameRules.end_splash;
		}

		// Creating varian position
		var creatingVarianPosition = function() {
			gameDataObject.variantsPosition = [
				[
					{
						id: 0,
						type: "good",
						x: 140,
						y: -355,
						indexValue: 1,
						value: gameDataObject.gameRulesObject.arr[1],
					}, {
						id: 1,
						type: "good",
						x: 50,
						y: -70,
						indexValue: 0,
						value: gameDataObject.gameRulesObject.arr[0],
					}, {
						id: 2,
						type: "bad",
						x: 1000,
						y: -30
					}, {
						id: 3,
						type: "bad",
						x: 1000,
						y: -165

					}, {
						id: 4,
						type: "bad",
						x: 1000,
						y: -260
					}, {
						id: 5,
						type: "bad",
						x: 1000,
						y: -440
					}, {
						id: 6,
						type: "bad",
						x: 1000,
						y: -460
					}
				],
				{
					levels: {
						"1": [
							[{x:40}, {x:210}, {x:100}, {x:1000}, {x:1000}, {x:1000}, {x:1000}],
							[{x:210}, {x:120}, {x:1000}, {x:200}, {x:1000}, {x:1000}, {x:1000}],
							[{x:210}, {x:40}, {x:300}, {x:1000}, {x:100}, {x:1000}, {x:1000}],
							[{x:120}, {x:210}, {x:1000}, {x:1000}, {x:1000}, {x:1000}, {x:1000}],
							[{x:300}, {x:120}, {x:350}, {x:100}, {x:1000}, {x:300}, {x:1000}],
							[{x:120}, {x:210}, {x:1000}, {x:1000}, {x:1000}, {x:1000}, {x:1000}],
							[{x:40}, {x:210}, {x:350}, {x:100}, {x:1000}, {x:300}, {x:1000}],
							[{x:120}, {x:210}, {x:1000}, {x:100}, {x:1000}, {x:200}, {x:300}],
							[{x:210}, {x:120}, {x:1000}, {x:1000}, {x:1000}, {x:100}, {x:1000}],
							[{x:210}, {x:40}, {x:100}, {x:1000}, {x:300}, {x:1000}, {x:1000}],
						],
						"2": [
							[{x:40}, {x:210}, {x:100}, {x:1000}, {x:1000}, {x:1000}, {x:1000}],
							[{x:210}, {x:120}, {x:1000}, {x:200}, {x:1000}, {x:1000}, {x:1000}],
							[{x:210}, {x:40}, {x:300}, {x:1000}, {x:100}, {x:1000}, {x:1000}],
							[{x:120}, {x:210}, {x:1000}, {x:1000}, {x:1000}, {x:1000}, {x:1000}],
							[{x:300}, {x:120}, {x:350}, {x:100}, {x:1000}, {x:300}, {x:1000}],
							[{x:120}, {x:210}, {x:1000}, {x:1000}, {x:1000}, {x:1000}, {x:1000}],
							[{x:40}, {x:210}, {x:350}, {x:100}, {x:1000}, {x:300}, {x:1000}],
							[{x:210}, {x:120}, {x:1000}, {x:1000}, {x:1000}, {x:100}, {x:1000}],
							[{x:210}, {x:40}, {x:100}, {x:1000}, {x:300}, {x:1000}, {x:1000}],
							[{x:120}, {x:210}, {x:1000}, {x:100}, {x:1000}, {x:200}, {x:300}]
						],
						"3": [
							[{x:120}, {x:210}, {x:1000}, {x:1000}, {x:1000}, {x:1000}, {x:1000}],
							[{x:40}, {x:210}, {x:350}, {x:100}, {x:1000}, {x:300}, {x:1000}],
							[{x:210}, {x:120}, {x:1000}, {x:1000}, {x:1000}, {x:100}, {x:1000}],
							[{x:210}, {x:40}, {x:100}, {x:1000}, {x:300}, {x:1000}, {x:1000}],
							[{x:120}, {x:210}, {x:1000}, {x:100}, {x:1000}, {x:200}, {x:300}],
							[{x:40}, {x:210}, {x:100}, {x:1000}, {x:1000}, {x:1000}, {x:1000}],
							[{x:210}, {x:120}, {x:1000}, {x:200}, {x:1000}, {x:1000}, {x:1000}],
							[{x:210}, {x:40}, {x:300}, {x:1000}, {x:100}, {x:1000}, {x:1000}],
							[{x:120}, {x:210}, {x:1000}, {x:1000}, {x:1000}, {x:1000}, {x:1000}],
							[{x:300}, {x:120}, {x:350}, {x:100}, {x:1000}, {x:300}, {x:1000}],
						],
						"4": [
							[{x:120}, {x:210}, {x:1000}, {x:1000}, {x:1000}, {x:1000}, {x:1000}],
							[{x:300}, {x:120}, {x:350}, {x:100}, {x:1000}, {x:300}, {x:1000}],
							[{x:120}, {x:210}, {x:1000}, {x:1000}, {x:1000}, {x:1000}, {x:1000}],
							[{x:40}, {x:210}, {x:350}, {x:100}, {x:1000}, {x:300}, {x:1000}],
							[{x:210}, {x:120}, {x:1000}, {x:1000}, {x:1000}, {x:100}, {x:1000}],
							[{x:40}, {x:210}, {x:100}, {x:1000}, {x:1000}, {x:1000}, {x:1000}],
							[{x:210}, {x:120}, {x:1000}, {x:200}, {x:1000}, {x:1000}, {x:1000}],
							[{x:210}, {x:40}, {x:300}, {x:1000}, {x:100}, {x:1000}, {x:1000}],
							[{x:210}, {x:40}, {x:100}, {x:1000}, {x:300}, {x:1000}, {x:1000}],
							[{x:120}, {x:210}, {x:1000}, {x:100}, {x:1000}, {x:200}, {x:300}]
						],
					}
				},
			];
		}

		var initialize = function(){
			// Subscribing mediator on new events
			mediator.subscribe( "add_new_data_level", addDataLevel).
					 subscribe( "create_new_variant_position", creatingVarianPosition);

			// All variables of this part
			addImage();
			//
			levelInfo();
			//
			addDataLevel(0);
			//
			creatingVarianPosition();
			//
			var newGame = new GameProcess(gameDataObject);

			return "Data and rules has been loaded successfully!";
		}

		return initialize();
	} ());
});
