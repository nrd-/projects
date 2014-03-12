/**
 * [nrdRadio][jQuery plugin for audio streams][2013][2014][cc]
 * 
 */
var useLogs = true;

(function($) {
    $.fn.nrdRadio = function( options ) {
    	var _this = this;
    	var audio;
        var settings = $.extend({
            station     : 'nrdRadio',
            slogan 		: 'nrdRadio!',
            trackName 	: '---',
            artistName 	: '---',
            artwork 	: null,
            color       : 'inherit',
            fontFamily  : 'inherit',
            autoPlay 	: false,
            showDetails : false,
            complete 	: null,//complete    : function() {}
            audioSrc 	: '',
            controls 	: '<span class="controls" onclick="$(this).parent().nrdRadio.stop()">stop</span> | <span class="controls" onclick="$(this).parent().nrdRadio.play()">play</span><br>'
        }, options);

        $.fn.nrdRadio.stop = function(){
	      nrd.log('stop');
	      audio.pause();
	      return _this;
	    };

	    $.fn.nrdRadio.play = function(){
	      nrd.log('play');
	      audio.play();
	      return _this;
	    };

	    $.fn.nrdRadio.inform = function(msg,delay){
	      nrd.log('nrdRadio: '+msg);
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
        	var ui = '<span style="color:'+settings.color+';font-family:'+settings.fontFamily+'">';
        	if(settings.showDetails) ui += settings.station+'<br>'+settings.audioSrc+'<br>';
        	if(settings.artwork) ui += '<div class="nrdRadioArtworkContainer"><img src="'+settings.artwork+'" width="100%" height="100%"/></div><br>';
        	ui += settings.controls+'</span>';

        	//do audio
        	audio = new Audio();

        	if (audio != null && audio.canPlayType && audio.canPlayType("audio/mpeg")){
				audio.src = settings.audioSrc;
				if(settings.autoPlay == true) audio.play();

				//errors
				audio.addEventListener('error', function failed(e) {
					var delay = 6000;
					var errorCode = e.target.error.code;
					var errorObj = e.target.error;
					for(key in errorObj){
						if(errorObj[key]==errorCode) $(this).parent().nrdRadio.inform(key,delay);
					}
				}, true);
			}

		    return [ $(this).html(ui), audio] ;

		});

    }

}(jQuery));