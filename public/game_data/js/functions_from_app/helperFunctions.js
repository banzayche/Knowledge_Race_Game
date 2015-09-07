'use strict'

$(document).ready(function(){
	// volume Events
	$("#volume").click(function(){
		var volume_button = $('#volume'),
			get_document_DOM = $(document);
		if(volume_button.hasClass('volume-on') === true){
			mediator.publish("volume:off");
			volume_button.removeClass("volume-on");
			volume_button.html('<span class="glyphicon glyphicon-volume-off"></span>');
			get_document_DOM.focus();
		} else{
			mediator.publish("volume:on");
			volume_button.addClass("volume-on");
			volume_button.html('<span class="glyphicon glyphicon-volume-up"></span>');
			get_document_DOM.focus();
		}
	});
	// =============
});

var calcWinning = {
	counter: 0,
	addWord: function(obj){
		this.current_sentense = obj.line.html();
		this.line = obj.line;

		if(this.counter < obj.quantity_word){
			this.counter += 1;
			this.line.html(this.current_sentense + ' ' + obj.new_word);
		};

		if(this.counter >= obj.quantity_word){
			this.line.html(this.current_sentense + ' ' + obj.new_word);
			var those = this;
			setTimeout(function(){
				those.line.html('');
				those.counter = 0;
			}, 700);
		}
	},
}
