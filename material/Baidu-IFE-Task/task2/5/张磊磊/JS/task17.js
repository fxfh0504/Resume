
  /* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: Object.keys(aqiSourceData)[0],
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var wrap = document.querySelector('.aqi-chart-wrap'),
      renderHTML = "",
      colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
              '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'],
      qualityColor = "",
      title = document.querySelector('.chart h1'),
      until = "";
  for(var key in chartData ){
    switch (true){
      case chartData [key] < 42:
        qualityColor = colors[0];
        break;
      case chartData [key] < 84:
        qualityColor = colors[1];
        break;
      case chartData [key] < 126:
        qualityColor = colors[2];
        break;
      case chartData [key] < 168:
        qualityColor = colors[3];
        break;
      case chartData [key] < 210:
        qualityColor = colors[4];
        break;
      case chartData [key] < 252:
        qualityColor = colors[5];
        break;
      case chartData [key] < 294:
        qualityColor = colors[6];
        break;
      case chartData [key] < 336:
        qualityColor = colors[7];
        break;
      case chartData [key] < 378:
        qualityColor = colors[8];
        break;
      case chartData [key] < 420:
        qualityColor = colors[9];
        break;
      case chartData [key] < 462:
        qualityColor = colors[10];
        break;
      case chartData [key] < 500:
        qualityColor = colors[11];
        break;
    }
    renderHTML += "<div class='" + pageState.nowGraTime + "' style='height:" 
    + chartData[key] + "px; background:" + qualityColor + ";'></div>"
  }
  wrap.innerHTML = renderHTML;
  switch(pageState.nowGraTime){
    case "day":
      until = "日";
      break;
    case "week":
      until = "周平均";
      break;
    case "month":
      until = "月平均";
      break;
  }
  title.textContent = pageState.nowSelectCity + "1-3月每" +  until + "空气质量报告";
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  var time = document.querySelector('input[name=gra-time]:checked').value;
  // 确定是否选项发生了变化 
  pageState.nowGraTime = time;
  // 设置对应数据
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  var select = document.querySelector('#city-select'),
  // 确定是否选项发生了变化 
      city   = select.options[select.selectedIndex].value;
  // 设置对应数据
  pageState.nowSelectCity = city;
  initAqiChartData();
  // 调用图表渲染函数
  renderChart();
  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  document.querySelector('#form-gra-time').addEventListener('click',graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.querySelector('#city-select');
  for(city in aqiSourceData){
    var option = document.createElement('option');
    option.textContent = city;
    citySelect .appendChild(option);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
   citySelect.addEventListener('change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var allData = aqiSourceData[pageState.nowSelectCity];
  chartData = {};
  if(pageState.nowGraTime == "day"){
    chartData = allData;
  }
  else if(pageState.nowGraTime == "week"){
    var weekCount = 0,
        weekSum   = 0,
        weekth    = 1,
        weekAver     ;
    for (data in allData){
      var weekDay = (new Date(data)).getDay();
      weekCount += 1 ;
      weekSum   += allData[data];
      if(weekDay == 0 ){
        weekAver = weekSum/weekCount;
        chartData['第'+weekth+'周'] = weekAver ;
        //清空继续遍历
        weekCount = 0 ;
        weekSum   = 0 ;
        weekth++;
      }
    }
  }
 else if(pageState.nowGraTime == "month"){
    var Jan = 0,
        Feb = 0,
        Mar = 0;
    for(data in allData){
      var month = (new Date(data)).getMonth();
      switch(month){
        case 0:
          Jan = Jan + allData[data];
          break;
        case 1:
          Feb = Feb + allData[data];
          break;
        case 2:
          Mar = Mar + allData[data];
          break;
      }
    }
    chartData["1月"] = Jan/31;
    chartData["2月"] = Feb/29;
    chartData["3月"] = Mar/31;

  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();
