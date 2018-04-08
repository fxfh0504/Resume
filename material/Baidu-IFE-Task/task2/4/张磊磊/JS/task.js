/* 声明变量 */
window.onload =  function(){
  var cityInput = document.querySelector('#aqi-city-input'),
      airInput  = document.querySelector('#aqi-value-input'),
      btn       = document.querySelector('#add-btn'),
      table     = document.querySelector('#aqi-table'),
      cityError = document.querySelector('#cityError'),
      airError  = document.querySelector('#airError');

  /**
   * aqiData，存储用户输入的空气指数数据
   * 示例格式：
   * aqiData = {
   *    "北京": 90,
   *    "上海": 40
   * };
   */
  var aqiData = {};
    
  /**
   * 从用户输入中获取数据，向aqiData中增加一条数据
   * 然后渲染aqi-list列表，增加新增的数据
   */
  function addAqiData(){
    var cityValue = cityInput.value.trim(),
        airValue  = airInput.value.trim(),
        cityReg   = /^[\u4E00-\u9FFF]+$/,
        airReg    = /^\d+$/,
        flag      = true;
   
    if(!cityReg.test(cityValue)){
      cityError.innerText = "请输入正确的城市名（中文）";   
      cityInput.focus();
      flag = false;   
    }
    if(!airReg.test(airValue)){
      airError.innerText = "请输入正确的空气质量指数";   
      cityInput.focus();
      flag = false;   
    }
    if(flag){
      clear();
      aqiData[cityValue] = airValue;
    }
    
  }
  /**
   * 清除错误信息
   */
   function clear() {
              cityError.innerHTML = "";
              airError.innerHTML = "";
  }

  /**
   * 渲染aqi-table表格
   */
  function renderAqiList(){
    var str = "";
    for (var key in aqiData ){
      if(aqiData.hasOwnProperty(key)){
       str += "<tr><td>" + key + "</td><td>" + aqiData[key] + 
       "</td><td><button>删除</button></td></tr>"
      }
    }
    table.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>"+str;
  }

  /**
   * 点击add-btn时的处理逻辑
   * 获取用户输入，更新数据，并进行页面呈现的更新
   */
  function addBtnHandle() {
    addAqiData();
    renderAqiList();
    console.log(btn);
  }

  /**
   * 点击各个删除按钮的时候的处理逻辑
   * 获取哪个城市数据被删，删除数据，更新表格显示
   */
  function delBtnHandle() {
  // do sth.
  var key = this.parentNode.parentNode.firstChild.innerHTML;
  delete aqiData[key];
  renderAqiList();
  console.log(btn);
}


  function init() {
    btn.addEventListener('click',function(){
      addBtnHandle() ;
    })


    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById("aqi-table").onclick = function(e){
    
    var target = e.target ;
    target.nodeName.toLowerCase() === "button" &&  delBtnHandle.apply(target);    
  }
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

  }
  init();
}
  