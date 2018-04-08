define(function(require,exports){
	var $ = require('jquery');
	var GoTop = (function() {

		function init() {
			$(window).on('scroll', function(e) {
				var offsetTop = $('body').scrollTop()||$('html').scrollTop();
				if (offsetTop > 100) {
					$('.go-to-top').show();
				} else {
					$('.go-to-top').hide();
				}
			})
			$('.go-to-top').on('click', function() {
				$('body,html').animate({
					scrollTop: 0
				}, 400);
			});

		}


		return {
			init: init
		}
	})();
	return GoTop
})

