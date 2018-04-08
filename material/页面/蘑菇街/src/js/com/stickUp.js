define(function(require, exports) {
	var $ = require('jquery');
	var StickUp= (function() {

		function init() {
			$(window).on('scroll', function(e) {
				var offsetTop = $('body').scrollTop()||$('html').scrollTop();
				console.log(offsetTop);
				console.log(offsetTop);
				if (offsetTop > 300) {
					$('#stick-up').addClass('moveout')
				} else {
					$('#stick-up').removeClass('moveout')
				}
			})

		}


		return {
			init: init
		}
	})();
	return StickUp
})



