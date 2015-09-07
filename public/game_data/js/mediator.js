var mediator = (function() {
	// Функция подписки
	// Если канал не существует, то создаем его, затем пушим обьект с обозначением контекста подписки и функцией для выполнения.
	var subscribe = function(channel, fn) {
	    if (!mediator.channels[channel]) mediator.channels[channel] = [];
	    mediator.channels[channel].push({ context: this, callback: fn });
	    return this;
	},

	publish = function(channel) {
	    // если канала не существует то ретурн
	    if (!mediator.channels[channel]) return false;
		// считываем второй аргумент
	    var args = Array.prototype.slice.call(arguments, 1);
	    // циклом проходим все подписки канала и выполняем вызов функций
	    for (var i = 0, l = mediator.channels[channel].length; i < l; i++) {
	        var subscription = mediator.channels[channel][i];
	        subscription.callback.apply(subscription.context, args);
	    }
	    return this;
	};

	return {
	    channels: {},
	    publish: publish,
	    subscribe: subscribe,
	    installTo: function(obj) {
	        obj.subscribe = subscribe;
	        obj.publish = publish;
	    }
	};
}());