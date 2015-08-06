// creating of words array--------------------------------------------------------------
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

// current Level object
var gameRulesObject = {
	boxes: {
		boxHeight: 40,
		boxWidth: 40,
	},
	car: {
		carHeight: 35,
		carWidth: 22,
		carX: 185,
		carY: 480,
		turnSpeed: 5,
	},
	gameSpeed: 5,
};
//

// entered DATA
var enteredDATA = [
	{
		sentenseString: "I have to lock your PC, when you step away. It's very important for security policy!",
		repeat: 3,
		question: "What do I need to do when you step away from your workplace?",
		answersVariant : ["I have to lock your PC, when you step away.", "I have to call your mom.", "I have to play on your phone"],
		rightIndex : 0,
	},
	{
		sentenseString: "Music is your chance to have some rest!",
		repeat: 3,
		question: "What do I need to do when the sky is over?",
		answersVariant : ["I have to lock your PC, when you step away.", "I have to listen music (Serj Tankain - Sky is over).", "I have to play on your phone"],
		rightIndex : 1,
	},
	{
		sentenseString: "After work day I have to go home.",
		repeat: 3,
		question: "What do I need to do when you work day is over?",
		answersVariant : ["I have to lock your PC, when you step away.", "I have to listen music (Serj Tankain - Sky is over).", "I have go to home."],
		rightIndex : 2,
	}
];
//

// Function of adding data
function addDataLevel(numberLevel){
	gameRulesObject.currentLevel = numberLevel;

	var gameRules = enteredDATA[numberLevel];
	var sentenseString = gameRules.sentenseString,
		wordsArr = sentenseString.split(' ');
	function detect_words(arr){
	    var lengthArr = arr.length;
	    if(lengthArr%2 === 0){
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
	gameRulesObject.arr = detect_words(wordsArr);

	gameRulesObject.pointsAtAll = gameRulesObject.arr.length*gameRules.repeat;
	gameRulesObject.question = gameRules.question;
	gameRulesObject.answersVariant = gameRules.answersVariant;
	gameRulesObject.rightIndex = gameRules.rightIndex;
}
addDataLevel(0);
//


// -----------------------------------------------------------------------------------------------
// -------------------POSITIONS #1-------------------------------------
var variantsPosition = new Array();
// Creating varian position
function creatingVarianPosition(){
	variantsPosition = [
		[
			{
				id: 0,
				type: "good",
				x: 140,
				y: -355,
				indexValue: 1,
				value: gameRulesObject.arr[1],
			}, {
				id: 1,
				type: "good",
				x: 50,
				y: -70,
				indexValue: 0,
				value: gameRulesObject.arr[0],
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
	];
}
creatingVarianPosition();
//
