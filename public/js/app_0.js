'use strict'

$(document).ready(function(){
function GameProcess(){
	var canvas,context,
	succesLearning = 1,
	currentLearning,
	fatalHit,
	positionVariation = 1,
	whoBehidLine = 0,
	gameTimer,
	keyState = {},
	points = 0,
	car = new Game.gameObjConstructor.car(185, 520, 25, 40, "car"),

	// CAR
	carImageObj = new Image(),
	canDrawCar = false;
	carImageObj.onload = function() {
		canDrawCar = true;
	};
	carImageObj.src = '/images/car3.jpg';
	// BAD
	var badImageObj = new Image();
	var canDrawBad = false;
	carImageObj.onload = function() {
		canDrawBad = true;
	};
	badImageObj.src = '/images/bad.png';
	// STAR
	var starImageObj = new Image();
	var canDrawStar = false;
	carImageObj.onload = function() {
		canDrawStar = true;
	};
	starImageObj.src = '/images/star.png';

	(function(){
		$("#myCanvas").mousemove(function(evt){
			var rect = canvas.getBoundingClientRect(),
			x = evt.clientX - rect.left,
			y = evt.clientY - rect.top;
			console.log("x "+x+" "+"y "+y);
		})
	})();

	var successBoxes = [
		new Game.gameObjConstructor.box(100, 350, 40, 30, "good", 5, "You"),
		new Game.gameObjConstructor.box(250, 430, 40, 30, "good", 6, "must"),
	],
	errorBoxes = [
		new Game.gameObjConstructor.box(0, 0, 60, 50, "bad", 0),
		new Game.gameObjConstructor.box(280, 0, 60, 50, "bad", 1),
		new Game.gameObjConstructor.box(140, 190, 60, 50, "bad", 2),
		new Game.gameObjConstructor.box(100, 285, 50, "bad", 1),
		new Game.gameObjConstructor.box(200, 285, 50, "bad", 1),
	],
	succesLearning = 3,
	currentLearning = 0,
	question = "",
	answers = [],
	trueAnsverIndex = 2,
	drawArray = [car, successBoxes[0], successBoxes[1], errorBoxes[0], errorBoxes[1], errorBoxes[2], errorBoxes[3], errorBoxes[4]];

	// --------DEFAULT VALUE--------------------------------------
	function setDeffValue(){
		car = new Game.gameObjConstructor.car(150, 430, 40, 40, "car"),
		successBoxes = [
			new Game.gameObjConstructor.box(100, 350, 40, 30, "good", 5, "You"),
			new Game.gameObjConstructor.box(250, 430, 40, 30, "good", 6, "must"),
		],
		errorBoxes = [
			new Game.gameObjConstructor.box(0, 0, 60, 50, "bad", 0),
			new Game.gameObjConstructor.box(280, 0, 60, 50, "bad", 1),
			new Game.gameObjConstructor.box(140, 190, 60, 50, "bad", 2),
			new Game.gameObjConstructor.box(100, 285, 50, "bad", 1),
			new Game.gameObjConstructor.box(200, 285, 50, "bad", 1),
		],
		drawArray = [car, successBoxes[0], successBoxes[1], errorBoxes[2], errorBoxes[3], errorBoxes[4], errorBoxes[5], errorBoxes[6]];
	}
	// ---------------------------------------------------------

	// ----CORECTION -----------------------------
	function correction(){
		// -------------------------------------------------------------------------------------------------
		// rules for Car motion
		var maxX = 398,
			minX = 2
		if(drawArray[0].x <= minX) {
			drawArray[0].x = minX;
		} else if (drawArray[0].x >= maxX){
			drawArray[0].x = maxX;
		}

		// --------------------------------------------------------------------------------------------------
		// rules for Boxes
		var carCenter = drawArray[0].get_box_center(),
			successBoxesCenter,
			distance;
		for (var i = 1; i<drawArray.length; i++) {
			successBoxesCenter = drawArray[i].get_box_center(),
			distance = drawArray[i].get_distance(successBoxesCenter, carCenter);

			// GoodHit - столкновение с положительным обьектом
			if (distance <= drawArray[0].get_box_radius()+drawArray[i].get_box_radius() && drawArray[i].type === "good"){
		    	console.log("Win")
		    	console.log(drawArray[i].value)

		    	// context = canvas.getContext('2d');
	      //   	context.beginPath();
		    	// context.rect(drawArray[i].x+10, drawArray[i].y-20, drawArray[i].width, drawArray[i].height);
		    	// context.fillStyle = 'green';
		    	// context.fill();

		    	context = canvas.getContext('2d');
	        	context.drawImage(starImageObj, drawArray[0].x+30, drawArray[0].y-50, 30, 40);

		    // fatalHit - столкновение с нежелательным обьектом, которое влечет перезагрузку уровня
		    } else if (distance <= drawArray[0].get_box_radius()+drawArray[i].get_box_radius() && drawArray[i].type === "bad"){
		    	console.log("Looser")
		    	getGameTimer("stop");
		    	setDeffValue();
		    	fatalHit = true;

		    	setTimeout(function(){
		    		currentLearning = 0;
		    		fatalHit = false;
		    		getGameTimer("start");
		    	}, 1500)
		    }

		    // currentBox за пределами камеры
		    if(drawArray[i].y >= 880){
		    	whoBehidLine++;

		    	if(whoBehidLine === 4){
		    		positionVariation++;
		    		if( positionVariation === 8 ){
		    			positionVariation = 1;
		    		}
		    		whoBehidLine = 0;
		    	}

		    	if(positionVariation === 1){
		    		drawArray[i].x = 50*i;
		    		drawArray[i].y = 0;
		    	}	else if(positionVariation === 2){
		    		drawArray[i].x = 40*i;
		    		drawArray[i].y = 0;
		    	}  	else if(positionVariation === 3){
		    		drawArray[i].x = 200/i;
		    		drawArray[i].y = 0;
		    	}	else if(positionVariation === 4){
		    		drawArray[i].x = (40*i)+20;
		    		drawArray[i].y = 0;
		    	}  	else if(positionVariation === 5){
		    		drawArray[i].x = (300/i)+30;
		    		drawArray[i].y = 0;
		    	}	else if(positionVariation === 6){
		    		drawArray[i].x = 30*i;
		    		drawArray[i].y = 0;
		    	}  	else if(positionVariation === 7){
		    		drawArray[i].x = 100/i;
		    		drawArray[i].y = 0;
		    	}
		    }
		};
	};

	function drawCanvas(){
		canvas = document.getElementById('myCanvas');
		context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);

		// отрисовка игрового процесса сама гонка
	    for(var i = 0; i<drawArray.length; i++){
	    	if(i === 0){
	    		context = canvas.getContext('2d');
	        	context.beginPath();
		    	context.rect(0, 0, canvas.width, canvas.height);
		    	context.drawImage(carImageObj, drawArray[i].x, drawArray[i].y, drawArray[i].width, drawArray[i].height);
	    	} else{
	    		// context.beginPath();
			    // context.rect(drawArray[i].x, drawArray[i].y, drawArray[i].width, drawArray[i].height);
			    if(drawArray[i].type === 'good'){
			    	// context.fillStyle = 'green';
			    	// context = canvas.getContext('2d');
		      //   	context.beginPath();
			    	// context.rect(0, 0, canvas.width, canvas.height);
			    	// // if(canDrawBad === true){
			    	// 	context.drawImage(starImageObj, drawArray[i].x, drawArray[i].y, drawArray[i].width, drawArray[i].height);

			    		context.font = 'bold 25pt Calibri';
					    context.fillStyle = 'red';
					    context.fillText(drawArray[i].value, drawArray[i].x, drawArray[i].y);
			    } else{
			    	// context.fillStyle = 'red';
			    	context = canvas.getContext('2d');
		        	context.beginPath();
			    	context.rect(0, 0, canvas.width, canvas.height);
			    	// if(canDrawBad === true){
			    		context.drawImage(badImageObj, drawArray[i].x, drawArray[i].y, drawArray[i].width, drawArray[i].height);
			    	// }

			    }
			    // context.lineWidth = 1;
			    // context.strokeStyle = 'black';
			    // context.fill();
	      // 		context.stroke();
	    	}
	    }
	    // проверка соответствия игры правилам
	    correction();
	    // проверка условий завершонности или
	    if(fatalHit === true){
	        	context = canvas.getContext('2d');
	        	context.beginPath();
		    	context.rect(0, 0, canvas.width, canvas.height);
		    	context.fillStyle = 'rgba(4,4,4,0.5)';
		    	context.fill();

			    context.font = 'bold 25pt Calibri';
			    context.fillStyle = 'red';
			    context.fillText('Game Over!', 80, 280);

	        }


	}


	function getGameTimer(value){
		if(value === 'stop'){
			clearInterval(gameTimer)
		} else if(value === 'start'){
			gameTimer = setTimeout(function(){
				for (var i = 1; i<drawArray.length; i++) {
					drawArray[i].y+=6
				}
				drawCanvas();
			}, 20);
		}
	}
	getGameTimer("start");


	// -------------------------------------------------------------------------------------
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
	    drawCanvas()
	    setTimeout(gameLoop, 10);
	}
	gameLoop();
	// ------------------------------------------------------------------------------------------

}GameProcess()

});