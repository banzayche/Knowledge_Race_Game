var createStar = {
	star: '<span class="glyphicon glyphicon-star"></span>',
	empty_star: '<span class="glyphicon glyphicon-star-empty"></span>',
	createStar: function(value){
		var item_star_container = document.createElement('div');
			item_star_container.setAttribute('class', 'col-sm-2 col-md-2 col-xs-2 star');
			if(value === 'color'){
				item_star_container.innerHTML = this.star;
			} else{
				item_star_container.innerHTML = this.empty_star;
			}
			return item_star_container;
	},
	addStars: function(obj){
		this.container = obj.container;
		this.container.innerHTML = '';

		this.quantity = obj.quantity;
		this.color_quantity = obj.color_quantity;

		var empty = this.quantity - this.color_quantity;
		for(var i = 1; i <= this.quantity; i++){
			if(i <= this.color_quantity){
				this.container.appendChild(this.createStar('color'));
			} else{
				this.container.appendChild(this.createStar('empty'));
			}

		}
	}
};

var createSentese = {
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
	clearLine: function(value){
		value.html('');
		this.counter = 0;
	}
};
