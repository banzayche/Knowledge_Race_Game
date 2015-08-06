// creating of words array--------------------------------------------------------------
// current Level object
var gameRulesObject = new Object();
//
// entered DATA
var enteredDATA = [
	{
		sentenseString: "I have to lock my PC each time I step away.",
		repeat: 1,
		question: "What do You do when you step away from your workplace?",
		answersVariant : ["1. Make some coffee!", "2. I lock my PC.", "3. I'm calling my mom."],
		rightIndex : 1,
	},
	{
		sentenseString: "PC locking is very important for security policy",
		repeat: 1,
		question: "What is so important for security policy?",
		answersVariant : ["1. To lock my PC Locking.", "2. Security Guard", "3. None of the above"],
		rightIndex : 0,
	},
	{
		sentenseString: "After work day I have to check if I locked my PC before going home",
		repeat: 1,
		question: "What do You do when you work day is over?",
		answersVariant : ["Dancing! We have a class.", "2. Listen to the music (Serj Tankain - Sky is over).", "3. First, I check is my PC locked."],
		rightIndex : 3,
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
		[{x:40}, {x:210}, {x:280}, {x:0}, {x:100}, {x:0}, {x:360}]
	];
}
creatingVarianPosition();
//
