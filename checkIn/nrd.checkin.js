/*
* [nrd][checkIn][2014][cc]
* grabs navigator infos and returns them as a string.
*/
var useLogs = true;

(function($) {

    $.fn.checkIn = function( options ) {
    	var plugin = this;

      var settings = $.extend({
         info: null
      }, options);

      $.fn.getInfo = function() {
        return settings.info;
      }
      return this.each( function() {
        var appVersion  = navigator.appVersion;
        var userAgent   = navigator.userAgent;
        var info = appVersion+'\n\r'+userAgent;
        settings.info = info;
	    });
    }

}(jQuery));