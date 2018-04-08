//var queueLength = 0;
var queueArr = [];
var inAnimtion = false; // 正在播放动画时禁止插入删除等按钮事件
/**
 * 二维数组[i][shift], 用来存储排序可视化时扫描的顺序
 * i:当前扫描的元素位置
 * shift:是否需要与前一个元素交换,1是0否
 */
var sortAnimationArr = [];

// 生成随机数据,初始化队列
function initQueue() {
	for(var i=0;i<50;i++) {
		var randomNum = Math.ceil(Math.random()*90+10);
		queueArr.push(randomNum);
	}
	renderQueue();
}
function getNumber() {
	var reg = /^\d+$/;
	var val = document.querySelector('#input-number').value;
	if(reg.test(val)) {
		return val;
	}
	return undefined;
}

function enqueueBefore() {
	var value = getNumber();
	if(inAnimtion) {alert('动画播放时不能进行操作!');return false;}
	if(value !=undefined) {
		if(value>100 || value<10) {alert('数字必须在10-100之间');return false;}
		if(queueArr.length>=60) {alert('长度不能大于60');return false;}
		queueArr.unshift(value);
		renderQueue();
	}
}

function enqueueAfter () {
	var value = getNumber();
	if(inAnimtion) {alert('动画播放时不能进行操作!');return false;}
	if(value != undefined) {
		if(value>100 || value<10) {alert('数字必须在10-100之间');return false;}
		if(queueArr.length>=60) {alert('长度不能大于60');return false;}
		queueArr.push(value);
		renderQueue();
	}
}

function dequeueBefore() {
	if(inAnimtion) {alert('动画播放时不能进行操作!');return false;}
	if(queueArr.length) {
		queueArr.shift();
		renderQueue();
	}
	else {
		alert('没有可出列元素');
	}
}

function dequeueAfter() {
	if(inAnimtion) {alert('动画播放时不能进行操作!');return false;}
	if(queueArr.length) {
		queueArr.pop();
		renderQueue();
	}
	else {
		alert('没有可出列元素');
	}
}

function deleteElement(e) {
	if(inAnimtion) {alert('动画播放时不能进行操作!');return false;}
	if(e.target.nodeName.toLowerCase() == 'li') {
		//alert(e.target.style.height);
		var i = nodeIndex(e.target);
		e.target.remove();
		queueArr.splice(i-1,1);
		console.log(queueArr);
	}
	// 返回此节点是其父元素的第几个子元素
	function nodeIndex(node) {
		var i=1;
		while(node = node.previousSibling) {
			if(node.nodeType ===1) { i++;}
		}
		return i;
	}
}

function renderQueue() {
	var queue = document.querySelector('.queue');
	while(queue.firstChild) {
		queue.removeChild(queue.firstChild);
	}
	for(var index in queueArr) {
		var value = queueArr[index];
		var node = document.createElement('li');
		node.style.height = value+'%';
		queue.appendChild(node);
	}
}

function sortQueue() {
	var temp;
	if(inAnimtion) {alert('动画播放时不能进行操作!');return false;}
	sortAnimationArr = [];
	for(var i=0; i<queueArr.length-1; i++) {
		for(var j=queueArr.length-1; j>i; j--) {
			if(queueArr[j]<queueArr[j-1]) {
				temp = queueArr[j];
				queueArr[j] = queueArr[j-1];
				queueArr[j-1] = temp;
				sortAnimationArr.push([j,1]);
			}
			else {
				sortAnimationArr.push([j,0]);
			}
		}
	}
	showSortAnimation();
}

function showSortAnimation() {
	var queue = document.querySelector('.queue');
	var delay = document.querySelector('#animation-speed').value;
	if(/^\d+$/.test(delay)) {delay = delay<10 ? 10:delay;}
	else {delay=50;}
	console.log(delay);
	inAnimtion = true;
	for(var i=0;i<sortAnimationArr.length;i++) {
		setTimeout(function(index){
			var curNode = document.querySelector('li:nth-child('+(sortAnimationArr[index][0]+1)+')');
			var prevNode = document.querySelector('li:nth-child('+sortAnimationArr[index][0]+')');
			highlight(curNode, 'blue', delay);
			highlight(prevNode, 'green', delay);
			if(sortAnimationArr[index][1] == 1) {
				queue.insertBefore(curNode, prevNode);
			}
		},i*delay,i);
	}
	setTimeout(function(){
		completeAnimation();
		inAnimtion = false;
	},delay*sortAnimationArr.length);

	// 扫描完成后的动画
	function completeAnimation() {
		var node = queue.firstChild;
		var timer = setInterval(function(){
			highlight(node,'blue',1000);
			node = node.nextSibling;
			if(nodeType != 1) {clearInterval(timer);}
		},10)
	}
}

function highlight(el, color, duration) {
	el.style.backgroundColor = color;
	setTimeout(function() {
		el.style.backgroundColor = 'red';
	}, duration/2);
}

function initBtnHandle() {
	document.querySelector('#enqueue-before').addEventListener('click',enqueueBefore);
	document.querySelector('#enqueue-after').addEventListener('click',enqueueAfter);
	document.querySelector('#dequeue-before').addEventListener('click',dequeueBefore);
	document.querySelector('#dequeue-after').addEventListener('click',dequeueAfter);
	document.querySelector('#sort').addEventListener('click',sortQueue);
	document.querySelector('.queue').addEventListener('click',deleteElement);
}

function init() {
	initBtnHandle();
	initQueue();
}

init();