var doc = $(document);
doc.on( "game:show_1", function(){ ifarameObj.gameShow('show', 1) }).
	on( "game:show_2", function(){ ifarameObj.gameShow('show', 2) }).
	on( "game:show_3", function(){ ifarameObj.gameShow('show', 3) }).
	on( "game:show_4", function(){ ifarameObj.gameShow('show', 4) }).
	on( "game:show_5", function(){ ifarameObj.gameShow('show', 5) }).
	on( "game:show_6", function(){ ifarameObj.gameShow('show', 6) }).
	// ---------------------------------------------
	on( "game:stop_1", function(){ ifarameObj.gameShow('stop', 1) }).
	on( "game:stop_2", function(){ ifarameObj.gameShow('stop', 2) }).
	on( "game:stop_3", function(){ ifarameObj.gameShow('stop', 3) }).
	on( "game:stop_4", function(){ ifarameObj.gameShow('stop', 4) }).
	on( "game:stop_5", function(){ ifarameObj.gameShow('stop', 5) }).
	on( "game:stop_6", function(){ ifarameObj.gameShow('stop', 6) }).

	on( "get-fullscreen", function(){ ifarameObj.getFullScreen() });

var ifarameObj = {
	links: {
		theme_1: './game_data/index.html?game=1',
		theme_2: './game_data/index.html?game=2',
		theme_3: './game_data/index.html?game=3',
		theme_4: './game_data/index.html?game=4',
		theme_5: './game_data/index.html?game=5',
		theme_6: './game_data/index.html?game=6'
	},
	fullscreen: false,
	currentIframes: {},
	getFullScreen: function() {
		var parent = $(".fullscreen-button").parent();
		if(this.fullscreen === false){
			parent.css('z-index', '100');
			parent.removeClass('no-fullscreen-container').addClass('fullscreen-container');
			$("iframe.no-fullscreen").removeClass('no-fullscreen').addClass('fullscreen');

			this.fullscreen = true;
		} else if(this.fullscreen === true){
			parent.removeClass('fullscreen-container').addClass('no-fullscreen-container');
			$("iframe.fullscreen").removeClass('fullscreen').addClass('no-fullscreen');
			parent.css('z-index', '1');

			this.fullscreen = false;
		}
	},
	gameShow: function(what, number) {
		// --- Closing of active games ---
		for(var i = 6; i > 0; i--){
			if(this.currentIframes['Game_'+i] != undefined && i!= number){
				// show standart content
				$('#section-'+i+' ul.section').show();
				// destroy current iframe from object and from DOM
				delete this.currentIframes['Game_'+i];

				// append default button
				this.createGameContainer(i, 'game_stop');
			}
		}
		// --- End closing of active games ---

		if(what === "show" && this.currentIframes['Game_'+number] == undefined){
			console.log('create')
			// hide standart content
			$('#section-'+number+' ul.section').hide();
			// create current iframe
			this.currentIframes['Game_'+number] = this.createFrame(number);

			// append game canvas
			this.createGameContainer(number, 'game_start');


		} else if(what === "stop" && this.currentIframes['Game_'+number] != undefined){
			// show standart content
			$('#section-'+number+' ul.section').show();
			// destroy current iframe from object and from DOM
			delete this.currentIframes['Game_'+number];

			// append default button
			this.createGameContainer(number, 'game_stop');
		} else{
			try {
			  throw new Error('Whoops!');
			} catch (e) {
			  alert(e.name + ': Worng event');
			}
		}
	},
	createFrame: function(number) {
		var iframe = document.createElement('iframe');
		iframe.setAttribute('scrolling', 'yes');
		iframe.setAttribute('class', 'no-fullscreen');
		iframe.setAttribute('src', this.links['theme_'+number]);
		iframe.setAttribute('id', 'game-theme-'+number);
		return iframe;
	},
	createCloseButton: function(number, action) {
		var button = document.createElement('button');
			button.setAttribute('class', 'game-button');
			button.setAttribute('title', 'Open/Close game');

		if(action === 'stop_game'){
			button.innerHTML = 'Close Game';
			button.setAttribute('id', 'game-close-button-'+number);
			button.setAttribute('onClick', 'doc.trigger("game:stop_'+number+'")');
		} else if(action === 'start_game'){
			button.innerHTML = 'Open Game';
			button.setAttribute('id', 'game-open-button-'+number);
			button.setAttribute('onClick', 'doc.trigger("game:show_'+number+'")');
		}

		return button;
	},
	createGameContainer: function(number, station){
		$('#container-game-'+number).remove();
		var divContainer = document.createElement('div');
			divContainer.setAttribute('id', 'container-game-'+number);
			divContainer.setAttribute('class', 'no-fullscreen-container');

		var fullscreen_button = document.createElement('button');
			fullscreen_button.setAttribute('class', 'fullscreen-button');
			fullscreen_button.innerHTML = 'Open/Close Full Screen';
			fullscreen_button.setAttribute('title', 'Open/Close full screen');
			fullscreen_button.setAttribute('onClick', 'doc.trigger("get-fullscreen")');

		if(station === 'game_start'){
			divContainer.appendChild(this.currentIframes['Game_'+number]);
			divContainer.appendChild(this.createCloseButton(number, 'stop_game'));

			divContainer.appendChild(fullscreen_button);
			// append iframe to container
			$('#section-'+number).append(divContainer);
		} else if(station === 'game_stop'){
			divContainer.appendChild(this.createCloseButton(number, 'start_game'));
			$('#section-'+number).append(divContainer);
		}
	},
	createAllButtons: function(){
		$("head").append($("<link rel='stylesheet' href='./game_data/css/moodle.css' type='text/css'/>"));
		for(var i = 1; i<=6; i++){
			this.createGameContainer(i, 'game_stop')
		}
	}
}


$(document).ready(function(){
	ifarameObj.createAllButtons();
});