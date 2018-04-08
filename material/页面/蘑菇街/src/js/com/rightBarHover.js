define(function(require,exports){
	var $ = require('jquery');
	//右侧固定导航栏
	var rightBarHover = function (){
		$('#right-bar').find('ul li').hover(
			function(e) {
				e.stopPropagation()
				var $target = $(e.target)
				if(e.target && e.target.nodeName.toUpperCase() == "LI") {
					$target.css({
						'background-color':'#F46',
					})
					$target.find('a').css('border-bottom','1px solid #F46');
					$target.prev().find('a').css('border-bottom','1px solid #202020');
				}
				else{
					$target.parents('li').css('background-color','#F46')
					$target.parents('li').find('a').css('border-bottom','1px solid #F46');
					$target.parents('li').prev().find('a').css('border-bottom','1px solid #202020');
				}
			},
			function(e) {
				e.stopPropagation()
				var $target = $(e.target)
				if(e.target && e.target.nodeName.toUpperCase() == "LI") {
					$target.css({
						'background-color':'#202020',
					})
					$target.find('a').css('border-bottom','1px solid #919191');
					$target.prev().find('a').css('border-bottom','1px solid #919191');
				}
				else{
					$target.parents('li').css('background-color','#202020')
					$target.parents('li').find('a').css('border-bottom','1px solid #919191');
					$target.parents('li').prev().find('a').css('border-bottom','1px solid #919191');
				}
			}

		);
	}
	return rightBarHover;
})
	






