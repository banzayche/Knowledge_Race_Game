'use strict'

$(document).ready(function(){
	var blockObject = function(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	var car, box, newPlace, box_run, points = 0;;
	// статический куб
	car = new blockObject(200, 400, 20, 30);

  // точка центра блока
	var car_center = function(car){
     	var x = (car.width/2)+car.x;
     	x = Math.round(x);
     	var y = (car.height/2)+car.y;
     	y = Math.round(y);
		return new blockObject(x, y, 1, 1);
	}

	var get_radius = function(obj){
		if(obj.width > obj.height){
			return Math.floor(obj.height/2);
		} else{
			return Math.floor(obj.width/2);
		}
	}


  var canvas = document.getElementById('myCanvas');
	function writeMessage(canvas, message) {

      var context = canvas.getContext('2d');
	  context.clearRect(0, 0, canvas.width, canvas.height);


      function drawPoint(point){
	    var canvas = document.getElementById('myCanvas');
	    var context = canvas.getContext('2d');

	    context.font = 'italic 25pt Calibri';
	    context.fillText(point+" /5", 240, 475);
      }
      drawPoint(points)


      var context = canvas.getContext('2d');
      context.beginPath();
      context.rect(car.x, car.y, car.width, car.height);
      context.fillStyle = 'green';
      context.lineWidth = 1;
      context.strokeStyle = 'black';

      var car_center_repeat = new car_center(car);
      context.rect(car_center_repeat.x, car_center_repeat.y, car_center_repeat.width, car_center_repeat.height);

      // роль ящика играет мышь
      box = new blockObject(message[0], message[1], 50, 40);
      context.rect(box.x, box.y, box.width, box.height);
      // находим центр ящика и сним работаем как с центральной точкой
      var box_center = new car_center(box);
      context.rect(box_center.x, box_center.y, box_center.width, box_center.height);
      // var box_buffer_zone = Math.floor((Math.sqrt(box.width*box.width+box.height*box.height))/2);
      // console.log("BUFFER_ZONE "+box_buffer_zone)
      var box_buffer_zone = get_radius(box);
      // console.log("BOX BUFFER_ZONE "+box_buffer_zone)

      // точка - 90градусов в треугольнике
      newPlace = new blockObject(box_center.x, car_center_repeat.y, 5, 5);
      // context.rect(newPlace.x, newPlace.y, newPlace.width, newPlace.height);

      // расчет по теореме пифагора
      var B_side = Math.floor(newPlace.y - box_center.y);
      var C_side = Math.floor(newPlace.x - car_center_repeat.x);
      var A_side = Math.floor(Math.sqrt(B_side*B_side+C_side*C_side));
      // console.log("PIFAGOR "+A_side)
      // расчет допустимого расстояния(буфферная зона)
      // var buffer_zone = Math.floor((Math.sqrt(car.width*car.width+car.height*car.height))/2);
      // console.log("BUFFER_ZONE "+buffer_zone)
      var buffer_zone = get_radius(car);
      // console.log("CAR BUFFER_ZONE "+buffer_zone)

      context.fill();
      context.stroke();

      // если в буфферной зоне
      if(A_side <= buffer_zone+box_buffer_zone || box_center.y == 480){
        var context = canvas.getContext('2d');
        context.beginPath();
        context.rect(car.x, car.y, 40, 30);
        context.fillStyle = 'transparent';
        context.lineWidth = 1;
      	context.strokeStyle = 'red';
        context.fill();
        context.stroke();
        clearInterval(box_run);

		console.log("!!! HIT alert !!!");
		points++;

        var new_y = 100;
        testXY(new_y);

        box_run = setInterval(function(){
		  	new_y = new_y+5;
		  	testXY(new_y);
		  }, 20)
      }


      if(points === 5){

      	clearInterval(box_run);

      	context.clearRect(0, 0, canvas.width, canvas.height);

	    context.font = 'italic 25pt Calibri';
	    context.fillText("The END", 100, 300);

	    setTimeout(function(){
	    	points = 0;
	    }, 3000)
      }
  }
  // function getMousePos(canvas, evt) {
  //     var rect = canvas.getBoundingClientRect();
  //     return {
  //       x: evt.clientX - rect.left,
  //       y: evt.clientY - rect.top
  //     };
  // }

	// $(document).addEventListener('keyup', function(evt) {
	// 	if(evt.keycode == 37){
	// 		console.log("Left")
	// 	}
 //      // var mousePos = getMousePos(canvas, evt);
 //      // car.x = mousePos.x-70;
 //  }, false);





  var new_y = 100;
  var testXY = function(y){
  	var message = [190, y];
  	writeMessage(canvas, message);
  }
  testXY(new_y);
  box_run = setInterval(function(){
  	new_y = new_y+5;
  	testXY(new_y);
  }, 20)


 //  $(document).keydown(function(evt){
	// 	if(evt.keyCode  == 37){
	// 		car.x = car.x-5;
	// 	} else if(evt.keyCode  == 39){
	// 		car.x = car.x+5;
	// 	}
	// 	console.log(evt.keyCode)
	// });

	var keyState = {};
	window.addEventListener('keydown',function(e){
	    keyState[e.keyCode || e.which] = true;
	},true);
	window.addEventListener('keyup',function(e){
	    keyState[e.keyCode || e.which] = false;
	},true);

	function gameLoop() {
	    if (keyState[37] || keyState[65]){
	        car.x -= 5;
	    }
	    if (keyState[39] || keyState[68]){
	        car.x += 5;
	    }

	    // redraw/reposition your object here
	    // also redraw/animate any objects not controlled by the user

	    setTimeout(gameLoop, 20);
	}
	gameLoop();

});