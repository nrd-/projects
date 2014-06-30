var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );

(function($) {
    $.fn.nrdGallery = function( options ) {
        var settings = $.extend({
            title       : 'nrd[gallery]',
            galleryClass: 'nrdGallery',
            media       : [{}], 
            maxBlur     : 10,   
            showHeader  : true, 
            previews    : false,
            autoPlay    : false,
            complete 	: null//complete    : function() { alert( 'Done!' ) }
        }, options);

        $.fn.slideRollOver = function(target){
            $(target).removeClass('dropShadow-unfocus').addClass('dropShadow-focus');
            if(settings.previews===true) $.fn.openPreview();
        };

        $.fn.slideRollOut = function(target){
            $(target).removeClass('dropShadow-focus').addClass('dropShadow-unfocus');
            if(settings.previews===true) $.fn.closePreview();
        };

        $.fn.fullImageResize = function(){

        };

        $.fn.thumbImageResize = function(){

        };

        $.fn.openPreview = function(){

        };

        $.fn.closePreview = function(){

        };

        $.fn.showFull = function(src){
            var fullViewer = settings.galleryClass+'fullViewer';
            $('#'+fullViewer).css({'display':'block'});
            $('#'+fullViewer).css({'background':'rgba(0,0,0,0.7) url('+src+') center center fixed no-repeat'});
            //$('#'+fullViewer).css({'backgroundSize':'auto 100%'});
            
            $.fn.blurGallery();

            $('#'+fullViewer).animate({'opacity':1.0},500,function(){
                $('#'+fullViewer).click(function(){
                    $.fn.hideFull();
                });
            });
        };

        $.fn.hideFull = function(){
            var fullViewer = settings.galleryClass+'fullViewer';
            $.fn.focusGallery();
            $('#'+fullViewer).animate({'opacity':0.0},500,function(){
                $('#'+fullViewer).css({'display':'none'});
            });
        };

        $.fn.blurGallery = function(){
            $({blurRadius: 0}).animate({blurRadius: settings.maxBlur}, {
                duration: 500,
                easing: 'swing', 
                step: function() {
                    $('.'+settings.galleryClass).css({
                        "-webkit-filter": "blur("+this.blurRadius+"px)",
                        "filter": "blur("+this.blurRadius+"px)"
                    });
                }
            });
        };

        $.fn.focusGallery = function(){
            $({blurRadius: settings.maxBlur}).animate({blurRadius: 0.0}, {
                duration: 500,
                easing: 'swing', 
                step: function() {
                    $('.'+settings.galleryClass).css({
                        "-webkit-filter": "blur("+this.blurRadius+"px)",
                        "filter": "blur("+this.blurRadius+"px)"
                    });
                },
                complete: function(){ 
                $('.'+settings.galleryClass).css({
                        "-webkit-filter": "blur(0px)",
                        "filter": "blur(0px)"
                });
            }
            });
        };

        return this.each( function() {
		    if ( $.isFunction( settings.complete ) ) settings.complete.call( this );
            if(iOS===true) $('#'+settings.galleryClass).addClass('fluid-scroll');
            var ui = '';

            //build DOM
            if(settings.showHeader===true){
		          ui += '<div class="'+settings.galleryClass+'"><div class="galleryHeader">'+settings.title+'</div>';
            }
            ui += '<div class="'+settings.galleryClass+'Slides">';
            
            $.each(settings.media,function(index,obj){
                    //format DOM
                    ui+= '<div class="'+settings.galleryClass+'Slide" \
                        onclick="$.fn.showFull(\''+obj["full"]+'\')" \
                        onmouseover="$.fn.slideRollOver(this)" \
                        onmouseout="$.fn.slideRollOut(this)">\
                        <img \
                            src="'+obj["thumb"]+'" \
                            data-full="'+obj["full"]+'" \
                            data-label="'+obj["label"]+'" \
                        ><br>\
                        '+obj["label"]+'\
                    </div>';
            })

            //wrap up
            ui += '</div></div><div id="'+settings.galleryClass+'fullViewer"></div>';

            //output
		    $(this).html(ui);
		});
    }
}(jQuery));

