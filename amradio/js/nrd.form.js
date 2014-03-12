/**
 * [nrd][form][js]
 * generate forms via objects...
 *
 * example:
 * $('#div').nrdForm({
 *      title       : 'nrdContact',
 *      formClass   : 'contactContainer',
 *      heading     : '',
 *      form        : [
 *                      {name:'name',type:'text',value:'name',required:false},
 *                      {name:'email',type:'text',value:'email',required:true},
 *                      {name:'subject',type:'text',value:'subject',required:true},
 *                      {name:'comments',type:'textarea',value:'comments',required:true},
 *                      {name:'submit',type:'submit',value:'send'}
 *                  ],
 *      action      : '../yourFormEngine.php',
 *      validate    : true,
 *      useLabels   : false,
 *      noBots      : true,
 *      method      : 'POST'
 *  });
 *
 * ENJOY!
 */

(function($) {
    $.fn.nrdForm = function( options ) {
        var settings = $.extend({
            title       : 'nrdContact',
            heading     : 'fill in the form...',
            formClass   : '',
            form        : [
                            {name:'name',type:'text',value:'please enter name',required:true},
                            {name:'email',type:'text',value:'please enter email address',required:true},
                            {name:'subject',type:'text',value:'please enter subject',required:true},
                            {name:'comments',type:'textarea',value:'please enter message',required:true},
                            {name:'submit',type:'submit',value:'send',required:true}
            ],
            action      : '',
            method      : 'POST',
            noBots      : false,
            validate    : false,
            useLabels   : false,
            clearFields : true,
            complete 	: null//complete    : function() { alert( 'Done!' ) }
        }, options);

        return this.each( function() {
            $(this).css( 'color', settings.color );
		    $(this).css( 'font-style', settings.fontStyle );
		    $(this).css( 'font-family', settings.fontFamily );
		    $(this).css( 'font-size', settings.fontSize );	
		    if ( $.isFunction( settings.complete ) ) settings.complete.call( this );

            //build form
		    var ui = '<div class="'+settings.formClass+'">'+settings.heading+'<div class="'+settings.formClass+'">';
            if(settings.validate===true){
                ui += '<form \
                            id="'+settings.title+'" \
                            name="'+settings.title+'" \
                            action="'+settings.action+'" \
                            method="'+settings.method+'" \
                            onsubmit="return nrd.validateForm('+settings.title+');">';
            }
            else{
                ui += '<form \
                            id="'+settings.title+'" \
                            name="'+settings.title+'" \
                            action="'+settings.action+'" \
                            method="'+settings.method+'">';
            }

            //build form elements
            for(key in settings.form){
                var field       = key;
                var value       = settings.form[key];
                var formElement = '';
                if(settings.useLabels === true && value.type != 'submit'){ 
                    formElement += '<label class="'+settings.formClass+'">'+value.name+':</label>';
                }
                if(value.type === 'textarea'){
                    formElement += '<textarea \
                                        class="'+settings.formClass+'" \
                                        name="'+value.name+'" \
                                        data-required="'+value.required+'">'+value.value+'</textarea>';
                }else{
                    if(value.type != 'submit'){
                        formElement += '<input \
                                        class="'+settings.formClass+'" \
                                        name="'+value.name+'" \
                                        type="'+value.type+'" \
                                        value="'+value.value+'" \
                                        data-required="'+value.required+'"/>';
                    }else{
                        formElement += '<input \
                                        class="'+settings.formClass+'" \
                                        name="'+value.name+'" \
                                        type="'+value.type+'" \
                                        value="'+value.value+'"/>';
                    }
                }
                ui += formElement+'<br>';
            }
            
            //wrap up
            ui += '</form>\
                </div></div>';

            //output
		    $(this).html(ui);
		});
    }
}(jQuery));