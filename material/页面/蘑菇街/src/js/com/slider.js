define(function(require, exports) {
	var $ = require('jquery');
	var SliderCenter = (function() {
		var sliderList = [];

		function init($slider) {
			$slider.each(function() {
				var $sld = $(this);

				if ($sld.hasClass('init')) {
					return;
				}
				sliderList.push(new Slider($sld));
				$sld.addClass('init');
			})
		}

		function getList() {
			return sliderList;
		}

		function Slider($slider) {
			this.$slider = $slider;
			this.isAnimate = false;
			this.createDot();
			this.bind();
			this.autoPlay();
		}
		Slider.prototype = {
			showNext: function(idx) {
				var self = this;
				var $curr = this.$slider.find('.curr');
				if (idx != undefined) {
					var $currNext = $(this.$slider.find('ul li')[idx])
				} else {
					if ($curr[0] == this.$slider.find('ul li').last()[0]) {
						var $currNext = this.$slider.find('ul li').first();
					} else {
						var $currNext = $curr.next();
					}
				}
				this.$tpl.find('a').removeClass('rotate')
					.eq($currNext.index()).addClass('rotate');

				if (!this.isAnimate) {
					this.isAnimate = true;
					$curr.animate({
						'left': '-178.75px',
						'opacity': '0',
						'flter': 'Alpha(Opacity=0)',
					}, function() {
						$curr.removeClass('curr');
						self.isAnimate = false
					});
					$currNext.css({
						'left': 0
					});
					$currNext.animate({
						'opacity': '1',
						'flter': 'Alpha(Opacity=100)',
					}, function() {
						$currNext.addClass('curr');
						self.isAnimate = false
					});
				}
			},
			showPre: function(idx) {
				var self = this;
				var $curr = this.$slider.find('.curr');
				if (idx != undefined) {
					var $currPre = $(this.$slider.find('ul li')[idx])
				} else {
					if ($curr[0] == this.$slider.find('ul li').first()[0]) {
						var $currPre = this.$slider.find('ul li').last();
					} else {
						var $currPre = $curr.prev();
					}
				}
				this.$tpl.find('a').removeClass('rotate')
					.eq($currPre.index()).addClass('rotate');
				if (!this.isAnimate) {
					this.isAnimate = true;
					$curr.animate({
						'left': '178.75px',
						'opacity': '0',
						'flter': 'Alpha(Opacity=0)',
					}, function() {
						$curr.removeClass('curr');
						self.isAnimate = false
					});
					$currPre.css('left', '0');
					$currPre.animate({
						'opacity': '1',
						'flter': 'Alpha(Opacity=100)',
					}, function() {
						$currPre.addClass('curr');
						self.isAnimate = false
					});

				}

			},
			createDot: function() {
				var $tpl = $('<div class="dot-box clear-float"></div>'),
					dotArr = [],
					dotLength = this.$slider.find('ul li').length,
					dotStr = '';
				for (var i = 0; i < dotLength; i++) {
					if (i == 0) {
						dotStr += '<a class="rotate" href="javascript:void(0)"></a>'
					} else {
						dotStr += '<a  href="javascript:void(0)"></a>'
					}
				}
				$tpl.html(dotStr);
				this.$slider.append($tpl);
				$tpl.css({
					'margin-left': -(dotLength * 20 + 20) / 2 + 'px',
				});
				this.$tpl = $tpl;


			},
			bind: function() {
				var self = this;
				this.$slider.find('.next').on('click', function() {
					self.stopAuto();
					self.showNext();
					self.autoPlay();
				});
				this.$slider.find('.pre').on('click', function() {
					self.stopAuto();
					self.showPre();
					self.autoPlay();
				});
				this.$tpl.find('a').on('click', function() {
					var clickIdx = $(this).index();
					var nowIdx = self.$slider.find('.curr').index();
					if (nowIdx > clickIdx) {
						self.stopAuto();
						self.showPre(clickIdx);
						self.autoPlay();
					}
					if (nowIdx < clickIdx) {
						self.stopAuto();
						self.showNext(clickIdx);
						self.autoPlay();
					}

				})
			},
			stopAuto: function() {
				clearInterval(this.$clock);
			},
			autoPlay: function() {
				var self = this;
				this.$clock = setInterval(function() {
					self.showNext();
				}, 5000);
			}

		};
		return {
			init: init,
			getList: getList
		}
	})()
	return SliderCenter;


})