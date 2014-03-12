/**
 * [amRadio][jQuery plugin for audio streams][2013][2014][cc]
 * 
 */
var useLogs   	= true;
var isPlaying 	= false;
(function($) {
    $.fn.amRadio = function( options ) {
    	var _this = this;
    	var audio;
        var settings = $.extend({
            station     : 'amRadio',
            slogan 		: 'amRadio!',
            trackName 	: '---',
            artistName 	: '---',
            artwork 	: null,
            playBtn 	: null,
            stopBtn 	: null,
            color       : 'inherit',
            fontFamily  : 'inherit',
            autoPlay 	: false,
            showDetails : false,
            complete 	: null,//complete    : function() {}
            audioSrc 	: '',
            controls 	: '<span class="controls" onclick="$(this).parent().amRadio.stop()">stop</span> | <span class="controls" onclick="$(this).parent().amRadio.play()">play</span><br>'
        }, options);

        $.fn.amRadio.stop = function(){
	      nrd.log('stop');
	      $('#amRadioControl').attr('src',settings.playBtn);
	      audio.pause();
	      return _this;
	    };

	    $.fn.amRadio.play = function(){
	      nrd.log('play');
	      $('#amRadioControl').attr('src',settings.stopBtn);
	      audio.play();
	      return _this;
	    };

	    $.fn.amRadio.togglePlay = function(){
	    	nrd.log('toggle')
	    	if(isPlaying===true) {
	    		isPlaying = false;
	    		$('#amRadioControl').attr('src',settings.playBtn);
	    		audio.stop();
	    	}
	    	else {
	    		isPlaying = true;
	    		$('#amRadioControl').attr('src',settings.stopBtn);
	    		audio.play();
	    	}
	    }

	    $.fn.amRadio.inform = function(msg,delay){
	      nrd.log('amRadio: '+msg);
	      return _this;
	    };

        return this.each( function() {

        	//apply styles
        	$(this).css( 'color', settings.color );
		    $(this).css( 'font-style', settings.fontStyle );
		    $(this).css( 'font-family', settings.fontFamily );
		    $(this).css( 'font-size', settings.fontSize );	

		    //apply methods
		    if ( $.isFunction( settings.complete ) ) settings.complete.call( this );

		    //build ui
		    var ui='';
        	if(settings.showDetails) ui += '<span style="color:'+settings.color+';font-family:'+settings.fontFamily+'">'+settings.station+'<br>'+settings.audioSrc+'</span><br>';
        	if(settings.artwork) ui += '<div class="amRadioArtworkContainer"><img src="'+settings.artwork+'"/></div><br>';
        	if(settings.playBtn && settings.stopBtn){
        		var controlBtn = '<img id="amRadioControl" src="'+settings.playBtn+'" onclick="$(this).parent().amRadio.togglePlay()"/>';
        		ui += controlBtn;
        	}else{
        		ui += '<span style="color:'+settings.color+';font-family:'+settings.fontFamily+'">'+settings.controls+'</span>';
        	}
        	//do audio
        	audio = new Audio();

        	if (audio != null && audio.canPlayType && audio.canPlayType("audio/mpeg")){
				audio.src = settings.audioSrc;
				if(settings.autoPlay == true) audio.play();

				//errors
				audio.addEventListener('error', function failed(e) {
					var delay 		= 6000;
					var errorCode 	= e.target.error.code;
					var errorObj 	= e.target.error;
					for(key in errorObj){
						if(errorObj[key]==errorCode) $(this).parent().amRadio.inform(key,delay);
					}
				}, true);
			}

		    return [ $(this).html(ui), audio] ;

		});

    }

}(jQuery));