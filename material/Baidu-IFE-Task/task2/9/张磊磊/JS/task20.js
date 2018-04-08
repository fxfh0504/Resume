
	function init($tagInput){
			this.$tagInput = $tagInput,
			this.$result = $tagInput.find('.result');
			this.$input = $tagInput.find('.input');
			this.listArr  = [];
		}
		init.prototype	 = {
			render:function(){
				this.$result[0].innerHTML = "";
				var str = "";
				for (var i = 0; i < this.listArr.length; i++) {
					str += '<div>' + this.listArr[i] + '</div>'; 
				}
				this.$result.append(str);				
			},
			In:function(){
				if(!this.$input.val()){
					alert("请输入");
					return false;
				}
				if(/[\n\r\s 、,，]/.test(this.$input.val())){

					var splitArr = this.$input.val().trim().split(/[\s\r\n、,，]+/);
					for (var i = 0; i < splitArr.length; i++) {
						if(this.listArr.indexOf(splitArr[i]) == -1 && !splitArr[i]==''){
							this.listArr.push(splitArr[i]);
						}
					}
					console.log(this.listArr);
				}
				if(!/[\n\r\s 、,，]/.test(this.$input.val())){
					console.log(1);
					if(this.listArr.indexOf(this.$input.val()) == -1){
						console.log(this.listArr);
						this.listArr.push(this.$input.val())
						console.log(this.listArr);
					}
					
				}	
			},
		}
	//hobby
	var hobbyInit = new init($('.hobby-input'));
	var $hobbyBtn = $('.confirm');

	//绑定事件
	$hobbyBtn.on('click',function(){
		hobbyInit.In();
		hobbyInit.render();
	})
	//tag
	var tag = function($tagInput){
		init.call(this,$tagInput)
	};
	tag.prototype = Object.create(init.prototype);
	tag.prototype.deleteEle = function(){
		function indexOfNumber(ele){
	       var parent = ele.parentElement,
	            siblings = parent.children;
	        for(var i=0; i<siblings.length; i++){
	            if(ele === siblings[i]) return i;
       		}
        }
		var self = this;
		this.$result[0].addEventListener('click',function(e){
			var target    = e.target;
			var deleteNum = indexOfNumber(target),
			deleteAlert = self.listArr[deleteNum];
			self.listArr.splice(deleteNum,1);
			self.render();
		})
	}
	var tagInit = new tag($('.tag-input'));
	//绑定事件
	var $tagInputVal = $('.tag-input input')
	$tagInputVal.on('keyup',function(){
		if(/[,，;；、\s\n]+/.test($tagInputVal.val()) || event.keyCode == 13){
			tagInit.In();
			tagInit.render();
			tagInit.deleteEle();
			$tagInputVal.val ("");
		}
	})