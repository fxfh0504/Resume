define(function(require, exports) {
	var $ = require('jquery')
	var countdown = function(hour) {
		var $hour = $('.hou'),
			$min = $('.min'),
			$sec = $('.sec'),
			sumSec = hour * 60 * 60;
		setInterval(function() {
			sumSec = sumSec - 1;
			$sec.html(sumSec % 60 % 60 + '');
			$min.html(Math.floor(sumSec / 60 % 60) + '');
			$hour.html(Math.floor(sumSec / 3600) + '');
		}, 1000);
	}
	return countdown

})