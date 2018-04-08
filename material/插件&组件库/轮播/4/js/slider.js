var SliderCenter = (function(){
	var sliderList = [];
	function init($slider) {
		$slider.each(function(){
			var $sld = $(this);

			if($sld.hasClass('init')){
				return;
			}
			sliderList.push(new Slider($sld));
			$sld.addClass('init');
		})
	}
	function getList(){
		return sliderList;
	}
	function Slider($slider) {
	this.$slider = $slider;
		var $ct = this.$ct = $slider.find('.slider-ct');
		this.$pre = $slider.find('.pre');
		this.$next = $slider.find('.next');
		this.imgWidth = $ct.find('li').width();
		this.imgSize = $ct.find('li').size();
		var $clock =this.$clock ;
		$ct.css('width',this.imgWidth * this.imgSize);
		this.bind();
		this.autoPlay();// body...
	}
	Slider.prototype = {
		bind:function(){
			var _this = this;
			this.$pre.on('click',function(){
				_this.stopAuto();
				_this.showPre();
				_this.autoPlay();
			});
			this.$next.on('click',function(){
				_this.stopAuto();
				_this.showNext();
				_this.autoPlay();
			});
		},
		showPre:function(){
			this.$ct.prepend(this.$ct.children().last());
			this.$ct.css('left', 0-this.imgWidth);
			this.$ct.animate({'left': 0});
		},
		showNext:function(){
			var $ct = this.$ct;
			$ct.animate({'left': 0-this.imgWidth},function(){
			$ct.append($ct.children().first());
			$ct.css({'left': 0});
				});
		},
		stopAuto:function(){
			clearInterval(this.$clock);
		},
		autoPlay:function(){
			var self = this;
			this.$clock = setInterval(function(){
				self.showNext();
			},3000);
		}
	};
	return{
		init:init,
		getList:getList
	}

})();
SliderCenter.init($('.slider')) 

SliderCenter.getList()[0].clickList=function(){
	
}
	SliderCenter.getList()[0].clickList()