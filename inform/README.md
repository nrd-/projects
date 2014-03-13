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