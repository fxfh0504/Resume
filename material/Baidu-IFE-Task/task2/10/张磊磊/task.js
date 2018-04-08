//轨道半径
var orbits = [200,300];

var space;
var mediator;
var controlPanel;
var log;
// 所有飞船
var spaceshipArr = [];

//飞船
var SpaceShip = function(id) {

    var $spaceship;
    var energy = 100;   //总能量
    var consumption = 5;//飞船单位时间(s)能耗
    var chargeSpeed = 2;//飞船能源系统充电速率
    var speed = 1;      //飞船线速度
    var orbitIndex = Math.floor(Math.random()*orbits.length);       //所属轨道
    var fps = 60; //动画播放帧率

    var status = false; //飞船状态，true为飞行中
    var radius = orbits[orbitIndex];    //轨道半径
    var angularSpeed = 360*speed/(2*radius*Math.PI);    //飞船角速度
    var curAngular = 360*Math.random(); //飞船当前角度
    var period = 1000/fps;  //动画播放周期
    var maxEnergy = 100;

    // 飞船动力系统
    var engine = {

        // 初始化动力系统
        init: function() {
            
        },
        // 启动
        start: function() {
            status = true;
            log.out(id+'号飞船启动');
        },
        // 停止
        stop: function() {
            status = false;
            log.out(id+'号飞船已停止');
        },
        // 消耗能源
        consumeEnergy: function() {
            if(energy>0) { energy-=consumption/fps; }
            else { engine.stop(); }
        }
    };

    // 飞船能源系统
    var energySystem = {
        chargeEnergy: function() {
            if(energy<maxEnergy) { energy+=chargeSpeed/fps; }
        }
    }
    // 创建飞船
    var init = function() {
        $spaceship = $('<div id="spaceship'+id+'" class="spaceship"></div>');
        render();
        $spaceship.css({ 
            transform: 'translateY(-'+radius+'px) rotate(0)',
            transformOrigin: 'center '+(20+radius)+'px'
        });
        engine.init();
        log.out(id+'号飞船已发送至'+(orbitIndex+1)+'号轨道');
    }

    // 销毁飞船
    var destroy = function() {
        var index = spaceshipArr.indexOf($spaceship.data('fn'));
        if(index>-1) {
            spaceshipArr.splice(index,1);
        }
        $spaceship.remove();
        log.out(id+'号飞船已销毁')
    }

    //绘制飞船
    var render = function() {
        $spaceship.append('<div class="energy-progress"></div>');
        $spaceship.append('<div class="energy-text"><label>'+id+'号 - </label><span class="energy">'+energy+'</span><span>%</span></div>');
        $spaceship.appendTo('#space');
    }

    // 逐帧渲染飞船动作
    var frameAnimation = setInterval(function(){
        // 任何状态下
        energySystem.chargeEnergy();
        // 飞行状态
        if(status) {
            // 飞船轨迹变化
            curAngular+=angularSpeed;
            // 飞船能源变化
            engine.consumeEnergy();
        }
        // 渲染
        $spaceship.css({
            transform: 'translateY(-'+radius+'px) rotate('+curAngular%360+'deg)'
        });
        $('.energy',$spaceship).text(parseInt(energy));
        $('.energy-progress',$spaceship).css('width',energy);

    },period);

    // 获取飞船的jquery对象
    var getObj = function() {
        return $spaceship;
    }

    // 信号接收
    var receiveSignal = function(cmd) {
        if(cmd.id==id && methods[cmd.command]) {
            methods[cmd.command]();
        }
    }
    // 供command调用的方法
    var methods = {
        create: init,
        start: engine.start,
        stop: engine.stop,
        destroy: destroy
    }

    init();

    // 返回公共接口
    return {
        id: id,   //飞船id
        getObj: getObj,  //飞船的jquery对象
        receiveSignal: receiveSignal    //飞船接收指令
    }
}

var Space = function() {
    var init = function() {
        //渲染轨道
        for(var index in orbits) {
            var radius = orbits[index];
            var orbit = $('<div class="orbit"></div>');
            orbit.css({
                width: 2*radius,
                height: 2*radius
            });
            orbit.appendTo('#space');
        }
    }
    init();
}

var Mediator = function() {

    var errorRate = 0.3; //丢包率

    // 模拟发送信息，返回是否丢包
    var sendPackage = function() {
        var randomValue = Math.random();
        console.log(randomValue);
        if(randomValue<errorRate) { return false; }
        else { return true; }
    }
    // 广播指令
    var broadcast = function(cmd) {
        log.out('正在发送信号...');
        setTimeout(function(){
            if(!sendPackage()) { log.out('发送失败，信息丢失(指挥官不可知)'); return false; }
            for(var i=0; i<spaceshipArr.length; i++) {
                spaceshipArr[i].receiveSignal(cmd);
            }
        },1000)  
    }
    return {
        broadcast: broadcast
    }
}
var ControlPanel = function() {
    var totalShips = 0; //控制台所知的现有飞船总数（与实际未必相符）
    var maxShips = 4;   //最大飞船数量
    var id = 0; //飞船id计数器，自动递增
    // 发射新飞船
    var launchShip = function() {
        if(totalShips == maxShips) { log.out('飞船数量达到上限');return false; }
        var spaceship = new SpaceShip(++id);
        spaceshipArr.push(spaceship);
        createShipPanel(id);
        // 将飞船对象与实体绑定
        $('#spaceship'+spaceship.id).data('fn', spaceship);
        totalShips++;
    }
    /**
     * 创建对应的飞船控制面板
     * @param {spaceship} 面板对应的飞船id
     **/
    var createShipPanel = function(id) {
        var $shipPanel = $('<div class="ship-panel"><label>'+id+'号飞船</label><button class="start-btn">飞行</button><button class="stop-btn">停止</button><button class="destroy-btn">销毁</button></div>');
        $shipPanel.appendTo('#ship-panel-container');
        shipHandler($shipPanel, id);
    }
    /**
     * 控制台与飞船进行绑定
     * @param {$panel} 需要绑定的控制面板
     * @param {$spaceship} 需要绑定的飞船对象
     **/
    var shipHandler = function($panel,id) {
        $('.start-btn',$panel).on('click',function(){
            var cmd = {
                id: id,
                command: 'start'
            }
            mediator.broadcast(cmd);
        });
        $('.stop-btn',$panel).on('click',function(){
            var cmd = {
                id: id,
                command: 'stop'
            }
            mediator.broadcast(cmd);
        });
        $('.destroy-btn',$panel).on('click',function(){
            var cmd = {
                id: id,
                command: 'destroy'
            }
            mediator.broadcast(cmd);
            $panel.remove();
            totalShips--;
        })
    }

    var init = function() {
        $('#launch-btn').on('click', function(event) {
            launchShip();
        });
    }

    init();
    // 公共方法
    return {
        launchShip: launchShip
    }
}

var Log = function($panel) {

    var $logPanel = $panel;
    var out = function(str,type) {
        type = type || '';
        $logPanel.append('<div class="log '+type+'">'+str+'</div>');
    };

    return {
        out: out
    }
}
$(document).ready(function(){

    // 创建宇宙
    space = new Space();

    // 创建信号传输介质
    mediator = new Mediator();

    // 创建飞船控制台
    controlPanel = new ControlPanel();

    // 创建宇航日志
    log = new Log($('#log-panel'));
    
})