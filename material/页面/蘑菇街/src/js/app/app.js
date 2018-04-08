define(['jquery','com/countDown','com/goToTop','com/rightBarHover','com/slider','com/stickUp'],function($,countdown,GoTop,rightBarHover,SliderCenter,StickUp){

countdown(3);
GoTop.init();
rightBarHover();
SliderCenter.init($('.slider')) ;
StickUp.init();



})