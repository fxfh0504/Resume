var CalenderTool = (function(){
	function init(opts){
			var instance = new calender(opts)
			return instance;
		}
	function calender(opts){
		this.renderTime = new Date();
		this.setOpts(opts);
		this.$contanier = this.opts.append;
		this.openCalender();
		this.clickTimes  = 0;
		
	}

	calender.prototype = {
		defaultOpts:{
			append:$('.calendar-contanier'),
			callBack:function(){},
			chooseRange:30
		},
		setOpts:function(opts){
			if(typeof opts == 'object'){
			this.opts = $.extend({},this.defaultOpts,opts);
			}
		},
		openCalender:function(){
			this.$contanier.find('.calendar-innerhtml').html('');
			this.createCalender();
			this.render(this.renderTime);
			this.$contanier.find('.calendar-innerhtml').html(this.$Calender);
			this.bindEvent();
		},
		createCalender:function(){
			var tpl = 
					'<dl >'
					+ '<div class="calendar-contanier-cover"></div>'
					+'<dt>'
					+'<div class="pre-year-btn"></div>'
					+'<div class="pre-month-btn"></div>'
					+ '<div class="now-data">'
					+'<div class="now-data-month"></div>'
					+'<div class="now-data-year"></div>'
					+'</div>'
					+'<div class="next-month-btn"></div>'
					+'<div class="next-year-btn"></div>'
					+'</dt><dd>'
					+'<ul class="cal-head">'
					+'<li>MON</li>'
					+'<li>TUE</li>'
					+'<li>WED</li>'
					+'<li>THU</li>'
					+'<li>FRI</li>'
					+'<li>SAT</li>'
					+'<li>SUN</li>'
					+'</ul>'
					+'<div class="cal-body ">'
					+'<ul></ul>'
					+'</div></dd>'
					+'<a class="cal-confirm" href="javascirpt:void(0)">Confirm</a>'
					+'</dl>';
			this.$Calender = $(tpl);

		},
		render:function(data){
			var renderYear    = data.getFullYear(),
				renderMonth   = data.getMonth(),
				renderDate    = data.getDate(),
				renderWeekDay = new Date(renderYear,renderMonth,1).getDay(),//
				nowMonthDateCount = new Date(renderYear,renderMonth+1,0).getDate(),//这月有几天
				preMonthDateCount = new Date(renderYear,renderMonth,0).getDate(),//上个月有几天
				renderSpace = this.$Calender.find('.cal-body ul'),
				preMonthStr = '',
				nowMonthStr = '',
				nextMonthStr = '',
				monthArr = ['January','February','March','April','May','June','July','August','September','October','November','December'];
				//如果日历是5行的渲染
				if(renderWeekDay + nowMonthDateCount <= 35){
					for(var i = 0 ; i < renderWeekDay;i++){
						preMonthStr += '<li class="cal-day-5 pre-month"'
						+ 'date="'+  renderYear + '-' + renderMonth +'-' + (preMonthDateCount - renderWeekDay + 1 + i) + 
						'">'+ (preMonthDateCount - renderWeekDay + 1 + i)+'</li>'
					}
					for(var i = 1; i <= nowMonthDateCount ;i++){
						nowMonthStr += '<li class="cal-day-5 now-month"'
						+ 'date="'+  renderYear + '-' + (renderMonth+1) +'-' + i +
						'">'+ i +'</li>'
					}
					for(var i = 0 ; i< 35 - renderWeekDay - nowMonthDateCount; i++){
						nextMonthStr += '<li class="cal-day-5 next-month"'
						+ 'date="'+  renderYear + '-' + (renderMonth+2) +'-' + (i+1) +
						'">'+ (i+1) +'</li>'
					}
				}
				//如果日历是6行的渲染
				else if(renderWeekDay + nowMonthDateCount > 35){
					for(var i = 0 ; i < renderWeekDay;i++){
						preMonthStr += '<li class="cal-day-6 pre-month"'
						+ 'date="'+  renderYear + '-' + renderMonth +'-' + (preMonthDateCount - renderWeekDay + 1 + i) + 
						'"">'+ (preMonthDateCount - renderWeekDay + 1 + i)+'</li>'
					}
					for(var i = 1; i <= nowMonthDateCount ;i++){
						nowMonthStr += '<li class="cal-day-6 now-month"'
						+ 'date="'+  renderYear + '-' + (renderMonth+1) +'-' + i +
						'">'+ i +'</li>'
					}
					for(var i = 0 ; i< 42 - renderWeekDay - nowMonthDateCount; i++){
						nextMonthStr += '<li class="cal-day-6 next-month"'
						+ 'date="'+  renderYear + '-' + (renderMonth+2) +'-' + (i+1) +
						'">'+ (i+1) +'</li>'
					}
				}
				renderSpace.append($(preMonthStr+nowMonthStr+nextMonthStr));
				this.rangeBackground();
				this.$Calender.find('.now-data-month').html(monthArr[renderMonth]);
				this.$Calender.find('.now-data-year').html(renderYear);
		},
		bindEvent:function(){
			var self = this;
			this.renderTimeYear = this.renderTime.getFullYear();
			this.renderTimeMonth = this.renderTime.getMonth();
			this.renderTimeDate= this.renderTime.getDate();
			this.$contanier.find('.data-text').on('focus',function(){
				self.$Calender.show();
			});		
			
			this.$Calender.find('.calendar-contanier-cover').on('click',function(e){
				e.preventDefault();
				self.$Calender.hide();
			});
			this.$Calender.find('.pre-year-btn').on('click',function(){
				self.renderTimeYear = self.renderTimeYear -1;
				self.renderTime = new Date(self.renderTimeYear,self.renderTimeMonth,self.renderTimeDate);
				self.openCalender();
				self.$Calender.show();
			});
			this.$Calender.find('.next-year-btn').on('click',function(){
				self.renderTimeYear = self.renderTimeYear +1;
				self.renderTime = new Date(self.renderTimeYear,self.renderTimeMonth,self.renderTimeDate);
				self.openCalender();
				self.$Calender.show();
			});
			this.$Calender.find('.next-month-btn').on('click',function(){
				self.renderTimeMonth = self.renderTimeMonth +1;
				self.renderTime = new Date(self.renderTimeYear,self.renderTimeMonth,self.renderTimeDate);
				self.openCalender();
				self.$Calender.show();
			});
			this.$Calender.find('.pre-month-btn').on('click',function(){
				self.renderTimeMonth = self.renderTimeMonth -1;
				self.renderTime = new Date(self.renderTimeYear,self.renderTimeMonth,self.renderTimeDate);
				self.openCalender();
				self.$Calender.show();
			});
			this.$Calender.find('.now-month').on('click',function(e){
				var $target = $(e.target);
				self.range($target)
				self.rangeBackground()
			})
			this.$Calender.find('.cal-confirm').on('click',function(){
				var rangeday = self.opts.chooseRange,
				    chooseDayCount = (self.end-self.start)/86400000,
				    startYear = self.start.getFullYear(),
				    startMonth = self.start.getMonth()+1,
				    starDate = self.start.getDate(),
				    endYear = self.end.getFullYear(),
				    endtMonth = self.end.getMonth()+1,
				    endDate = self.end.getDate();
				console.log(rangeday,chooseDayCount);
				if(rangeday<chooseDayCount){
					alert('超出选择范围，请选择'+rangeday+'天范围内'
				)}
				else{
					console.log(self.$Calender.parent().prev()[0])
					self.$Calender.parent().prev().val(startYear+'/'+startMonth+'/'+starDate+'     ——     '+endYear+'/'+endtMonth+'/'+endDate);
					self.opts.callBack()
				}

			})
		},
		range:function(e){
			var rangeStr = e.attr('date'),
				exchange;
			this.clickTimes += 1;
			rangeDate = new Date(rangeStr)
			if (this.clickTimes%2  == 1){
				this. start = rangeDate
				
			}
			else{
				this.end= rangeDate
			}
			if (this.end<this.start){
				exchange = this.end;
				this.end = this.start;
				this.start = exchange;
			}
			console.log(this. start,this.end)
		},
		rangeBackground:function(){
			var self = this;
			this.$Calender.find('.now-month').each(function(index, el) {
				var eachStr = $(el).attr('date');
					eachDate = new Date(eachStr);
					if(eachDate <self.end && eachDate>self.start){
						 $(el).css({
						 	fontWeight:'bold',
						 	background: '#fff',
						 	color:'#ef4f69'
						 });
					}
					else if(eachDate-self.start ==0 || eachDate-self.end ==0){
						$(el).css({
							background: '#ef4f69',
						 	color:'#fff'
						 });
					}
					else{
						$(el).css({
							background: '#fff',
						 	color:'#666'
						 });
					}
			});
		}


	};
	return{
		init:init, 
	}

})();
var calender1 = CalenderTool.init({
	append:$('.calendar-contanier'),
	callBack:function(){alert('这是回调')},
	chooseRange:30
})