// CAR
var carImageObj = new Image();
carImageObj.src = './images/falcon.png';
// BAD
var badImageObj = new Image();
badImageObj.src = './images/fighter.png';
// ----------------------------------------------
// burst
var burst1ImageObj = new Image();
burst1ImageObj.src = './images/burst1.png';
var burst2ImageObj = new Image();
burst2ImageObj.src = './images/burst2.png';
var burst3ImageObj = new Image();
burst3ImageObj.src = './images/burst3.png';
// ----------------------------------------------
// STAR
var starImageObj = new Image();
starImageObj.src = './images/star.png';
// --------------------------------------



$(document).ready(function(){
	// All variables of this part
	var variablesObj = {
		canvas: '',
		gameRulesObject: '',
		enteredDATA: '',
		variantsPosition: ''
	}
	//
	levelInfo(variablesObj);
	//
	addDataLevel(0, variablesObj);
	//
	creatingVarianPosition(variablesObj);
	//
	var newGame = new GameProcess(variablesObj);
});

// All functions of this part
// Creating level of Game
function levelInfo(variablesObj){
	variablesObj.canvas = document.getElementById('myCanvas');
	// current Level object
	variablesObj.gameRulesObject = {
		boxes: {
			height: 40,
			width: 45,
		},
		car: {
			height: 45,
			width: 55,
			x: (variablesObj.canvas.width/3)*1.35,
			y: (variablesObj.canvas.width/6)*7,
			turnSpeed: 4,
		},
		star: {
			height: variablesObj.canvas.height/15,
			width: variablesObj.canvas.width/15,
			addHeight: 5,
			addWidth: 5,
			addY: 20,
		},
		gameSpeed: 4,
		rules_splash: {
			title: 'Instructions',
			content: '<div class="rules-container"><p>You have to hit the words in the right order and in the end of the level answer on some question.<h3>Control:</h3><div class="alert"><img src="images/left-arrow.png" class="pull-left" />&nbsp;&nbsp;Press Left Arrow - if you want turn left</div> <div class="alert"><img src="images/right-arrow.png" class="pull-left" />&nbsp;&nbsp;Press Right Arrow - if you want turn right</div> <div class="alert"><img src="images/up-arrow.png" class="pull-left" />&nbsp;&nbsp;Press Up Arrow - if you want to go faster</div> <div class="alert"><img src="images/down-arrow.png" class="pull-left" />&nbsp;&nbsp;Press Down Arrow - if you want to go slowly</div> <div class="alert"><img src="images/enter.png" class="pull-left" />&nbsp;&nbsp;Press Enter - if you want Stop/Play the game</div> <div class="alert"><img src="images/ctrl.png" class="pull-left" />&nbsp;&nbsp;Press Ctrl - if you want to clear line with sentence</div><h3>Gameplay:</h3><img src="images/instruction.png" class="instruction" /></div>',
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
				splitAttr: ' ',
				repeat: 1,
				question: "Which one of the following guidelines stands correct for Google Calendar?",
				answersVariant : ["a. Check the free/busy status in Google Calendar to ensure all participants are available in the proposed time slot.", "b. Use the calendar to block the time you need to spend on critical tasks.", "c. Create rotating meeting requests for regular meetings.", "d. All of the above."],
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
				answersVariant : ["a. Send a TO email even when action is not required.", "b. Never use REPLY ALL, except in group discussions.", "c. Do not use email for potentially emotional content.", "d. Include CONFIDENTIAL in an email’s subject line when appropriate."],
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
				answersVariant : ["a. Yahoo!", "b. Facebook", "c. Gtalk", "d. MSN"],
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
				answersVariant : ["a. Time zone of Argentina Time (ART) - 0500 UTC", "b. Time zone of Argentina Time (ART) - 0100 UTC", "c. Time zone of Argentina Time (ART) - 0300 UTC"],
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
				answersVariant : ["a. Spanish (Castilian)", "b. French", "c. English"],
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
				answersVariant : ["a.False", "b. True"],
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
				answersVariant : ["a. (ASM) - 0500 UTC", "b. (ART) - 0100 UTC", "c. (IST) - UTC+5:30"],
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
				answersVariant : ["a. Yes", "b. No"],
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
				answersVariant : ["a. No they adhere to all the rules.", "b. Very rarely", "c. Yes. In most indian cities, drivers don't use specified road lines and may cut in front of you without warnings."],
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
				answersVariant : ["a. Yes, it's not a problem.", "b. As the rule, conversations or jokes about sex are not acceptable and may be treated as abuse.", "c. Maybe."],
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
				answersVariant : ["a. UTS/GMT +2 hours, IST - Israel Standart Time", "b. (ART) - 0100 UTC", "c. (IST) - UTC+5:30"],
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
				answersVariant : ["a. No.", "b. Yes, but you should wear a suit if that is how you are using to dressing."],
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
				answersVariant : ["a. No, never.", "b. Usually - yes.", "c. Yes the are, but it's considered impolite for ladies to wear defiant clothes and make-up."],
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
				answersVariant : ["a. Yes, it's not a problem.", "b. No", "c. Sometimes, it's depends on situation."],
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
				answersVariant : ["a. (ASM) - 0500 UTC", "b. (EET) +0200 UTC", "c. (IST) - UTC+5:30"],
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
				answersVariant : ["a. Yes", "b. Of course not."],
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
				answersVariant : ["a. It's doesn't matter.", "b. It is necessary to wear bright clothes.", "c. Dress formally during your first meeting."],
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
				answersVariant : ["a. True", "b. False"],
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
				answersVariant : ["a. Yes they are.", "b. Usually - yes.", "c. No. Americans inspect individual views and allow everyone to voice their own ideas on a subject."],
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
				answersVariant : ["a. True", "b. False"],
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
				answersVariant : ["a. Yes.", "b. Americans expect you to smile and shake hands when you meet someone.", "c. No, only shakin of hans very important when you meet someone."],
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
				answersVariant : ["a. True", "b. False"],
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
	variablesObj.enteredDATA = themesObj[readUrlParams('game')];

};
// Function of adding data
function addDataLevel(numberLevel, variablesObj){
	variablesObj.gameRulesObject.currentLevel = numberLevel;

	var gameRules = variablesObj.enteredDATA[numberLevel];
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
	variablesObj.gameRulesObject.arr = detect_words(wordsArr);

	variablesObj.gameRulesObject.lengthSentence = variablesObj.gameRulesObject.arr.length;
	variablesObj.gameRulesObject.starsQuantity = gameRules.repeat;
	variablesObj.gameRulesObject.question = gameRules.question;
	variablesObj.gameRulesObject.answersVariant = gameRules.answersVariant;
	variablesObj.gameRulesObject.rightIndex = gameRules.rightIndex;
	variablesObj.gameRulesObject.sentenceString = gameRules.sentenceString;
	// splashes
	variablesObj.gameRulesObject.start_splash = gameRules.start_splash;
	variablesObj.gameRulesObject.end_splash = gameRules.end_splash;
}

// Creating varian position
function creatingVarianPosition(variablesObj){
	variablesObj.variantsPosition = [
		[
			{
				id: 0,
				type: "good",
				x: 140,
				y: -355,
				indexValue: 1,
				value: variablesObj.gameRulesObject.arr[1],
			}, {
				id: 1,
				type: "good",
				x: 50,
				y: -70,
				indexValue: 0,
				value: variablesObj.gameRulesObject.arr[0],
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
		],
		[{x:40}, {x:210}, {x:280}, {x:0}, {x:100}, {x:0}, {x:360}],
		[{x:120}, {x:120}, {x:120}, {x:1000}, {x:120}, {x:1020}, {x:120}],
		[{x:40}, {x:210}, {x:280}, {x:0}, {x:100}, {x:0}, {x:360}],
		[{x:120}, {x:120}, {x:120}, {x:1000}, {x:120}, {x:1020}, {x:120}],
		[{x:120}, {x:120}, {x:10000}, {x:10000}, {x:10000}, {x:10000}, {x:10000}],
		[{x:120}, {x:120}, {x:120}, {x:1000}, {x:120}, {x:1020}, {x:120}],
		[{x:40}, {x:210}, {x:280}, {x:0}, {x:100}, {x:0}, {x:360}],
		[{x:120}, {x:120}, {x:120}, {x:1000}, {x:120}, {x:1020}, {x:120}],
	];
}
//
