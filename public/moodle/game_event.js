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
	on( "game:stop_6", function(){ ifarameObj.gameShow('stop', 6) });

var ifarameObj = {
	links: {
		theme_1: '.././index.html?game=1',
		theme_2: '.././index.html?game=2',
		theme_3: '.././index.html?game=3',
		theme_4: '.././index.html?game=4',
		theme_5: '.././index.html?game=5',
		theme_6: '.././index.html?game=6'
	},
	currentIframes: {},
	gameShow: function(what, number) {
		if(what === "show" && this.currentIframes['Game_'+number] == undefined){

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
		iframe.style.width = '100%';
		iframe.style.height = '700px';
		iframe.style.margin = '0 auto';
		iframe.style.display = 'block';
		iframe.style.border = 'none';
		iframe.setAttribute('scrolling', 'yes');
		iframe.setAttribute('src', this.links['theme_'+number]);
		iframe.setAttribute('id', 'game-theme-'+number);
		return iframe;
	},
	createCloseButton: function(number, action) {
		var button = document.createElement('button');
			button.style.display = 'block';
			button.style.backgroundColor = 'orange';
			button.style.color = 'white';
			button.style.position = 'absolute';
			button.style.bottom = '0';
			button.style.right = '0';
			button.style.zIndex = '9999999999999999999';

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
				divContainer.style.position = 'relative';

		if(station === 'game_start'){
				divContainer.appendChild(this.currentIframes['Game_'+number]);
				divContainer.appendChild(this.createCloseButton(number, 'stop_game'));
			// append iframe to container
			$('#section-'+number).append(divContainer);
		} else if(station === 'game_stop'){
			divContainer.appendChild(this.createCloseButton(number, 'start_game'));
			$('#section-'+number).append(divContainer);
		}
	},
	createAllButtons: function(){
		for(var i = 1; i<=6; i++){
			this.createGameContainer(i, 'game_stop')
		}
	}
}


$(document).ready(function(){
	ifarameObj.createAllButtons();
});
// doc.trigger("game:show_1");