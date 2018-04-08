$(function() { 
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
			this.$pre = $slider.nextAll('.pre');
			this.$next = $slider.nextAll('.next');
			this.imgWidth = $ct.find('li').width();
			this.imgSize = $ct.find('li').size();
			var $clock =this.$clock ;
			$ct.css('width',this.imgWidth * (this.imgSize+1));
			this.bind();
			// this.autoPlay();// body...
		}
		Slider.prototype = {
			bind:function(){
				var _this = this;
				this.$pre.on('click',function(){
					_this.stopAuto();
					_this.showPre();
					// _this.autoPlay();
				});
				this.$next.on('click',function(){
					_this.stopAuto();
					_this.showNext();
					// _this.autoPlay();
				});
			},
			showPre:function(){
				var $ct = this.$ct;
				var $clone =this.$ct.children().last().clone();
				$ct.append($clone)
				$ct.prepend(this.$ct.children().last());
				$ct.css('left', 0-this.imgWidth);

				$ct.animate({'left': 0},function(){
					$ct.children().last().remove();
				});
				

			},
			showNext:function(){
				var $ct = this.$ct;
				var $cloneFirst = this.$ct.children().first().clone()
				$ct.append($cloneFirst);
				$ct.animate({'left': 0-this.imgWidth},function(){
				$ct.children().first().remove();
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
	//第一个轮播增加点击列表功能（如果要增加的话）
	SliderCenter.getList()[0].clickList=function(){}
	SliderCenter.getList()[0].clickList()
	
} )
