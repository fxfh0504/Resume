$(function(){
	var $ct      = $('.slider-ct'),
		$liArr   = $('.slider-ct li'),
		$pre     = $('.pre'),
		$next    = $('.next'),
		imgWidth = $liArr.width(),
		imgSize  = $liArr.size();
	var clock;
	$ct.css('width',imgWidth*imgSize);
	$next.on('click',function(){
		stopAuto();
		playNext();
		autoPlay();
	});
	$pre.on('click',function(){
		stopAuto();
		playPre();
		autoPlay();
	});
	//auto Play()
	function stopAuto(){
		clearInterval(clock);
	}
	function autoPlay(){
		clock = setInterval(function(){
			playNext();
		},5000);
	}
	function playNext(){
		$ct.animate({'left': 0-imgWidth},function(){
		$ct.append($ct.children().first());
		$ct.css({'left': 0});
			});
		}

	function playPre(){
		$ct.prepend($ct.children().last());
		$ct.css('left', 0-imgWidth);
		$ct.animate({'left': 0});		
	}
	autoPlay();
});