'use strict'

// CAR
var carImageObj = new Image(),
canDrawCar = false;
carImageObj.onload = function() {
	canDrawCar = true;
};
carImageObj.src = './images/car3.png';
// --------------------------------------------
// BAD
var badImageObj = new Image();
var canDrawBad = false;
carImageObj.onload = function() {
	canDrawBad = true;
};
badImageObj.src = './images/bad.png';
// ----------------------------------------------
// STAR
var starImageObj = new Image();
var canDrawStar = false;
carImageObj.onload = function() {
	canDrawStar = true;
};
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
			height: variablesObj.canvas.height/15,
			width: variablesObj.canvas.width/10,
		},
		car: {
			height: variablesObj.canvas.height/15,
			width: variablesObj.canvas.width/15,
			x: (variablesObj.canvas.width/3)*1.35,
			y: (variablesObj.canvas.width/6)*7,
			turnSpeed: 5,
		},
		star: {
			height: variablesObj.canvas.height/15,
			width: variablesObj.canvas.width/15,
			addHeight: 5,
			addWidth: 5,
			addY: 20,
		},
		gameSpeed: 5,
		rules_splash: {
			title: 'Rules',
			content: '<p>You have to hit the words and in the end of the level answer on some question.</p><p>Control options:<br /> <--- Press Left Arrow - if you want turn left<br /> ---> Press Right Arrow - if you want turn right<br />Press ENTER - if you want Stop/Play the game <br /><br /><br /> Press ENTER - if you understand all this things</p>',
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
				sentenseString: "ONE",
				splitAttr: ' ',
				repeat: 2,
				question: "What do You do when you step away from your workplace?",
				answersVariant : ["1. Make some coffee!", "2. I lock my PC.", "3. I'm calling my mom."],
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
				sentenseString: "PC locking is very important for security policy.",
				splitAttr: ' ',
				repeat: 1,
				question: "What is so important for security policy?",
				answersVariant : ["1. To lock my PC Locking.", "2. Security Guard", "3. None of the above"],
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
				sentenseString: "After work day I have to check if I locked my PC before going home.",
				splitAttr: ' ',
				repeat: 1,
				question: "What do You do when you work day is over?",
				answersVariant : ["Dancing! We have a class.", "2. Listen to the music (Serj Tankain - Sky is over).", "3. First, I check is my PC locked."],
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
				sentenseString: "TWO TWO",
				splitAttr: ' ',
				repeat: 10,
				question: "What do You do when you step away from your workplace?",
				answersVariant : ["1. Make some coffee!", "2. I lock my PC.", "3. I'm calling my mom."],
				rightIndex : 1,
			},
			{
				sentenseString: "PC locking is very important for security policy.",
				splitAttr: ' ',
				repeat: 1,
				question: "What is so important for security policy?",
				answersVariant : ["1. To lock my PC Locking.", "2. Security Guard", "3. None of the above"],
				rightIndex : 0,
			},
			{
				sentenseString: "After work day I have to check if I locked my PC before going home.",
				splitAttr: ' ',
				repeat: 1,
				question: "What do You do when you work day is over?",
				answersVariant : ["Dancing! We have a class.", "2. Listen to the music (Serj Tankain - Sky is over).", "3. First, I check is my PC locked."],
				rightIndex : 3,
			}
		],
		3: [
			{
				sentenseString: "THREE THREE",
				splitAttr: ' ',
				repeat: 10,
				question: "What do You do when you step away from your workplace?",
				answersVariant : ["1. Make some coffee!", "2. I lock my PC.", "3. I'm calling my mom."],
				rightIndex : 1,
			},
			{
				sentenseString: "PC locking is very important for security policy.",
				splitAttr: ' ',
				repeat: 1,
				question: "What is so important for security policy?",
				answersVariant : ["1. To lock my PC Locking.", "2. Security Guard", "3. None of the above"],
				rightIndex : 0,
			},
			{
				sentenseString: "After work day I have to check if I locked my PC before going home.",
				splitAttr: ' ',
				repeat: 1,
				question: "What do You do when you work day is over?",
				answersVariant : ["Dancing! We have a class.", "2. Listen to the music (Serj Tankain - Sky is over).", "3. First, I check is my PC locked."],
				rightIndex : 3,
			}
		],
		4: [
			{
				sentenseString: "FOUR FOUR",
				splitAttr: ' ',
				repeat: 10,
				question: "What do You do when you step away from your workplace?",
				answersVariant : ["1. Make some coffee!", "2. I lock my PC.", "3. I'm calling my mom."],
				rightIndex : 1,
			},
			{
				sentenseString: "PC locking is very important for security policy.",
				splitAttr: ' ',
				repeat: 1,
				question: "What is so important for security policy?",
				answersVariant : ["1. To lock my PC Locking.", "2. Security Guard", "3. None of the above"],
				rightIndex : 0,
			},
			{
				sentenseString: "After work day I have to check if I locked my PC before going home.",
				splitAttr: ' ',
				repeat: 1,
				question: "What do You do when you work day is over?",
				answersVariant : ["Dancing! We have a class.", "2. Listen to the music (Serj Tankain - Sky is over).", "3. First, I check is my PC locked."],
				rightIndex : 3,
			}
		],
		5: [
			{
				sentenseString: "FIFE FIFE",
				splitAttr: ' ',
				repeat: 10,
				question: "What do You do when you step away from your workplace?",
				answersVariant : ["1. Make some coffee!", "2. I lock my PC.", "3. I'm calling my mom."],
				rightIndex : 1,
			},
			{
				sentenseString: "PC locking is very important for security policy.",
				splitAttr: ' ',
				repeat: 1,
				question: "What is so important for security policy?",
				answersVariant : ["1. To lock my PC Locking.", "2. Security Guard", "3. None of the above"],
				rightIndex : 0,
			},
			{
				sentenseString: "After work day I have to check if I locked my PC before going home.",
				splitAttr: ' ',
				repeat: 1,
				question: "What do You do when you work day is over?",
				answersVariant : ["Dancing! We have a class.", "2. Listen to the music (Serj Tankain - Sky is over).", "3. First, I check is my PC locked."],
				rightIndex : 3,
			}
		],
		6: [
			{
				sentenseString: "SIX SIX",
				splitAttr: ' ',
				repeat: 10,
				question: "What do You do when you step away from your workplace?",
				answersVariant : ["1. Make some coffee!", "2. I lock my PC.", "3. I'm calling my mom."],
				rightIndex : 1,
			},
			{
				sentenseString: "PC locking is very important for security policy.",
				splitAttr: ' ',
				repeat: 1,
				question: "What is so important for security policy?",
				answersVariant : ["1. To lock my PC Locking.", "2. Security Guard", "3. None of the above"],
				rightIndex : 0,
			},
			{
				sentenseString: "After work day I have to check if I locked my PC before going home.",
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
	var sentenseString = gameRules.sentenseString,
		wordsArr = sentenseString.split(gameRules.splitAttr);
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

	variablesObj.gameRulesObject.pointsAtAll = variablesObj.gameRulesObject.arr.length*gameRules.repeat;
	variablesObj.gameRulesObject.question = gameRules.question;
	variablesObj.gameRulesObject.answersVariant = gameRules.answersVariant;
	variablesObj.gameRulesObject.rightIndex = gameRules.rightIndex;
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
