inform
========
jQuery plugin for displaying 'growl' like notifications.

Usage (using nrd.checkin.js as data source):

    var info = function(msg){
		$.fn.inform().show(msg);
	}

	$(document).ready(function() {
		//get navigator info then inform
		var getUserInfo = $.fn.checkIn().getInfo();
		info(getUserInfo);
	});

settings
========
There are a fair amount of defaults to play with...

bgColor: 			'rgba(0,0,0,0.6)',
borderColor: 		'rgba(255,255,255,0.6)',
borderThickness: 	1,
fontColor: 			'#dcdcdc',
padding: 			10,
margin: 			5,
delay: 				5000,
initHeight: 		0,
speed: 				500,
css: 				{'font-size':12,'height':0,'padding':40,'right':5,'bottom':5},
shadow: 			'0 4px 30px 2px rgba(0,0,0,0.6)',
speak: 				null,
transIn: 			{'opacity':1.0,'height':165},
transOut: 			{'opacity':0.0,'height':0}