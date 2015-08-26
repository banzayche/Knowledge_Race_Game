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
			title: 'Rules',
			content: '<p>You have to hit the words in the right order and in the end of the level answer on some question.</p><p>Control options:<br /> <--- Press Left Arrow - if you want turn left<br /> ---> Press Right Arrow - if you want turn right<br />Press ENTER - if you want Stop/Play the game <br />Press Ctrl - if you want to clear line with sentence<br /><br /> Press ENTER - if you understand all this things</p>',
			show: true
		},
		result_splash: {
			title: 'You Won This Theme!',
			content: 'You can close this game and choose another theme. Or click "OK" and try this Theme again.',
			show: true
		}
	};
	//

	var themesObj = {
		1: [
			{
				sentenceString: "Object oriented programming it right way!",
				splitAttr: ' ',
				repeat: 2,
				question: "What is the right way for programmer?",
				answersVariant : ["Always listen mom.", "Using of object oriented programming.", "Keep calm."],
				rightIndex : 1,
				start_splash: {
					title: "Welcome to First Level!",
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
				sentenceString: "Facade is one of javascript patterns.",
				splitAttr: ' ',
				repeat: 3,
				question: "What is Facade in our work?",
				answersVariant : ["Facade is one of programming patterns.", "Facade is part of building.", "I don't care!"],
				rightIndex : 0,
				start_splash: {
					title: "Welcome to Second Level!",
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
				sentenceString: "I like this game!",
				splitAttr: ' ',
				repeat: 2,
				question: "What do you think about this game?",
				answersVariant : ["Sucks!!!", "Very hard for me.", "Dude it's perfect game!"],
				rightIndex : 2,
				start_splash: {
					title: "Welcome to Third Level!",
					content: 'You have to hit all words',
					show: true,
				},
				end_splash: {
					title: "This is the end of the Third Level!",
					content: 'Good job!',
					show: true
				}
			}
		],
		2: [
			{
				sentenceString: "TWO TWO",
				splitAttr: ' ',
				repeat: 10,
				question: "What do You do when you step away from your workplace?",
				answersVariant : ["1. Make some coffee!", "2. I lock my PC.", "3. I'm calling my mom."],
				rightIndex : 1,
			},
			{
				sentenceString: "PC locking is very important for security policy.",
				splitAttr: ' ',
				repeat: 1,
				question: "What is so important for security policy?",
				answersVariant : ["1. To lock my PC Locking.", "2. Security Guard", "3. None of the above"],
				rightIndex : 0,
			},
			{
				sentenceString: "After work day I have to check if I locked my PC before going home.",
				splitAttr: ' ',
				repeat: 1,
				question: "What do You do when you work day is over?",
				answersVariant : ["Dancing! We have a class.", "2. Listen to the music (Serj Tankain - Sky is over).", "3. First, I check is my PC locked."],
				rightIndex : 3,
			}
		],
		3: [
			{
				sentenceString: "THREE THREE",
				splitAttr: ' ',
				repeat: 10,
				question: "What do You do when you step away from your workplace?",
				answersVariant : ["1. Make some coffee!", "2. I lock my PC.", "3. I'm calling my mom."],
				rightIndex : 1,
			},
			{
				sentenceString: "PC locking is very important for security policy.",
				splitAttr: ' ',
				repeat: 1,
				question: "What is so important for security policy?",
				answersVariant : ["1. To lock my PC Locking.", "2. Security Guard", "3. None of the above"],
				rightIndex : 0,
			},
			{
				sentenceString: "After work day I have to check if I locked my PC before going home.",
				splitAttr: ' ',
				repeat: 1,
				question: "What do You do when you work day is over?",
				answersVariant : ["Dancing! We have a class.", "2. Listen to the music (Serj Tankain - Sky is over).", "3. First, I check is my PC locked."],
				rightIndex : 3,
			}
		],
		4: [
			{
				sentenceString: "FOUR FOUR",
				splitAttr: ' ',
				repeat: 10,
				question: "What do You do when you step away from your workplace?",
				answersVariant : ["1. Make some coffee!", "2. I lock my PC.", "3. I'm calling my mom."],
				rightIndex : 1,
			},
			{
				sentenceString: "PC locking is very important for security policy.",
				splitAttr: ' ',
				repeat: 1,
				question: "What is so important for security policy?",
				answersVariant : ["1. To lock my PC Locking.", "2. Security Guard", "3. None of the above"],
				rightIndex : 0,
			},
			{
				sentenceString: "After work day I have to check if I locked my PC before going home.",
				splitAttr: ' ',
				repeat: 1,
				question: "What do You do when you work day is over?",
				answersVariant : ["Dancing! We have a class.", "2. Listen to the music (Serj Tankain - Sky is over).", "3. First, I check is my PC locked."],
				rightIndex : 3,
			}
		],
		5: [
			{
				sentenceString: "FIFE FIFE",
				splitAttr: ' ',
				repeat: 10,
				question: "What do You do when you step away from your workplace?",
				answersVariant : ["1. Make some coffee!", "2. I lock my PC.", "3. I'm calling my mom."],
				rightIndex : 1,
			},
			{
				sentenceString: "PC locking is very important for security policy.",
				splitAttr: ' ',
				repeat: 1,
				question: "What is so important for security policy?",
				answersVariant : ["1. To lock my PC Locking.", "2. Security Guard", "3. None of the above"],
				rightIndex : 0,
			},
			{
				sentenceString: "After work day I have to check if I locked my PC before going home.",
				splitAttr: ' ',
				repeat: 1,
				question: "What do You do when you work day is over?",
				answersVariant : ["Dancing! We have a class.", "2. Listen to the music (Serj Tankain - Sky is over).", "3. First, I check is my PC locked."],
				rightIndex : 3,
			}
		],
		6: [
			{
				sentenceString: "SIX SIX",
				splitAttr: ' ',
				repeat: 10,
				question: "What do You do when you step away from your workplace?",
				answersVariant : ["1. Make some coffee!", "2. I lock my PC.", "3. I'm calling my mom."],
				rightIndex : 1,
			},
			{
				sentenceString: "PC locking is very important for security policy.",
				splitAttr: ' ',
				repeat: 1,
				question: "What is so important for security policy?",
				answersVariant : ["1. To lock my PC Locking.", "2. Security Guard", "3. None of the above"],
				rightIndex : 0,
			},
			{
				sentenceString: "After work day I have to check if I locked my PC before going home.",
				splitAttr: ' ',
				repeat: 1,
				question: "What do You do when you work day is over?",
				answersVariant : ["Dancing! We have a class.", "2. Listen to the music (Serj Tankain - Sky is over).", "3. First, I check is my PC locked."],
				rightIndex : 3,
			}
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
