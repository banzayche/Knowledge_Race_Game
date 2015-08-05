// creating of words array--------------------------------------------------------------
		var gameRulesObject = new Object();
		var sentenseString = "You have to lock your PC, when you step away. It's very important for security policy!",
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

		gameRulesObject.pointsAtAll = gameRulesObject.arr.length*3;

		gameRulesObject.question = "What do you need to do when you step away from your workplace?";
		gameRulesObject.answersVariant = ["You have to lock your PC, when you step away.", "You have to call your mom.", "You have to play on your phone"];
		gameRulesObject.rightIndex = 0;
// -----------------------------------------------------------------------------------------------
// -------------------POSITIONS #1-------------------------------------
var variantsPosition = [
		[
			{
				id: 0,
				type: "good",
				x: 140,
				y: -355,
				indexValue: 1,
				value: wordsArr[1],
			}, {
				id: 1,
				type: "good",
				x: 50,
				y: -70,
				indexValue: 0,
				value: wordsArr[0],
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