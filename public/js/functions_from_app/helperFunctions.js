'use strict'

$(document).ready(function(){
	// volume Events
	$("#volume").click(function(){
		var volume_button = $('#volume'),
			get_document_DOM = $(document);
		if(volume_button.hasClass('volume-on') === true){
			get_document_DOM.trigger("volume:off");
			volume_button.removeClass("volume-on");
			volume_button.html('<span class="glyphicon glyphicon-volume-off"></span>');
			get_document_DOM.focus();
		} else{
			get_document_DOM.trigger("volume:on");
			volume_button.addClass("volume-on");
			volume_button.html('<span class="glyphicon glyphicon-volume-up"></span>');
			get_document_DOM.focus();
		}
	});
	// =============
});
