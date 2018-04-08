window.onload = function(){
		var leftIn   = document.querySelector('.leftIn'),
			rightIn  = document.querySelector('.rightIn'),
			leftOut  = document.querySelector('.leftOut'),
			rightOut = document.querySelector('.rightOut'),
			result   = document.querySelector('.result'),
			input 	 = document.querySelector('textarea'),
			searchBtn = document.querySelector('.searchBtn'),
			listArr  = [];//绘制的数组
		
		/*绘制图像函数
		 ***/
		function render(){
			var str = "";
			for (var i = 0; i < listArr.length; i++) {
				str += '<div>' + listArr[i] + '</div>'; 
			}
			result.innerHTML = str ;
		}
		/*操作数组&判断
		 ***/
		function leftInEvent(){
			// 判断输入
			if(!input.value){
				alert("请输入");
				return false;
			}
			else if (/[^\n\r\s 、,，0-9A-Za-z\u4e00-\u9fa5]/.test(input.value)){
				alert("请输入数字");
				return false;
			}
			var splitArr = input.value.trim().split(/[\s\r\n、,，]+/);
			//操作数组 
			listArr = splitArr.concat(listArr);
		}
		function rightInEvent(){
			if(!input.value){
				alert("请输入");
				return false;
			}
			else if (/[^\n\r\s 、,，0-9A-Za-z\u4e00-\u9fa5]/.test(input.value)){
				alert("请输入数字");
				return false;
			}
			var splitArr = input.value.trim().split(/[\s\r\n、,，]+/);
			console.log(splitArr);
			//操作数组 
			listArr = listArr.concat(splitArr);
		}
		function leftOutEvent(){
			//删除数组左侧第一个元素
			listArr.splice(0,1);
		}
		function rightOutEvent(){
			listArr.splice(listArr.length-1,1);//删除数组右侧第一个元素
		}
		/*绑定事件
		 ***/
		function initLeftIn(){
			leftIn.addEventListener('click',function(){
				leftInEvent();
				render();
			});
		}
		function initRightIn(){
			rightIn.addEventListener('click',function(){
				rightInEvent();
				render();
			});
			
		}
		function initLeftOut(){
			leftOut.addEventListener('click',function(){
				var first = listArr[0];
				leftOutEvent();
				render();
				alert(first);
			})
		}
		function initRightOut(){
			rightOut.addEventListener('click',function(){
				var last = listArr[listArr.length-1];
				rightOutEvent();
				render();
				alert(last);
			})
		}
		function indexOF(ele){
	       var parent = ele.parentElement,
	            siblings = parent.children;
	        for(var i=0; i<siblings.length; i++){
	            if(ele === siblings[i]) return i;
       		}
        }
		function deleteEle(){
			var deleteDiv = document.querySelector('.result');
			deleteDiv.addEventListener('click',function(e){
			 var target    = e.target;
			 console.log(target);
			 var deleteNum = indexOF(target),
			 	 deleteAlert = listArr[deleteNum];
			 console.log(deleteNum);
			 listArr.splice(deleteNum,1);
			 render();
			 alert(deleteAlert );
			})
		}
		function search(){
			var searchWord = document.querySelector('.search'),
				sarchReg   = new RegExp(searchWord.value);
			for (var i=0 ; i < listArr.length ; i++){
				if(sarchReg.test(listArr[i])){
					var searchResult = document.querySelector('.result div:nth-child('+(i+1)+')');
					searchResult.style.color = '#ff9900';
				}
			}
		}
		function initSearch(){
			searchBtn.addEventListener('click',search);
		}
		function init(){
			initLeftIn();
			initRightIn();
			initLeftOut();
			initRightOut();
			deleteEle();
			initSearch();
		}
		init();
}