/*
* notifications
*/
var useLogs = true;
var infoInitialized = false;

(function($) {
    $.fn.inform = function( options ) {
    	var audio;//<== TODO: text to speech
    	var plugin = this;

        var settings = $.extend({
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
        }, options);

        $.fn.show = function(msg){
        	var inform = '<div id="inform"></div>';
        	if(!infoInitialized) $('body').append(inform); infoInitialized=true;

	    	//populate info
			$('#inform').html(msg);

			//stylize
			$('#inform').css(settings.css);
			
			$('#inform').css({'background-color':settings.bgColor});
			$('#inform').css({'color':settings.fontColor});
			$('#inform').css({'border':settings.borderThickness+'px solid '+settings.borderColor});
			
			if(settings.shadow){
				$('#inform').css({'-moz-box-shadow': settings.shadow});
				$('#inform').css({'-webkit-box-shadow': settings.shadow});
				$('#inform').css({'box-shadow': settings.shadow});
			}

			//display info
			$('#inform').animate(settings.transIn,settings.speed,function(){
				setTimeout($.fn.hide,settings.delay);
			});
		}

		$.fn.hide = function(){
			$('#inform').animate(settings.transOut,settings.speed,function(){
				setTimeout($.fn.hide,settings.delay);
			});
		}

        return this.each( function() {
        	
		});
    }
}(jQuery));