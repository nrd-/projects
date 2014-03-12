/**
 * nrd.js
 */
var nrd = (function(){
	//var useLogs = true;

	var log = function(msg){
		if(parent.useLogs) console.log(msg);
	}
	var time = function(label){
		console.time(label);
	}
	var timeEnd = function(){
		console.timeEnd(label);
	}
	var hoverNav = function(target,direction){
		var hoverNav = $('#'+target);
		var hoverNavContainer = $('#'+target+'Container'); 
		hoverNav.wrap('<div id="'+hoverNavContainer+'"></div>');
		$('#'+hoverNavContainer).on('mousemove', function (event) {
			if(direction=='up'){
				if (35 - event.clientY < 0) {
				    hoverNav.css({
				        top: 35 - event.clientY
				    });
				} else {
				    hoverNav.css({
				        top: 0
				    });
				}
			}else{
				if (35 - event.clientY < 0) {
				    hoverNav.css({
				        top: 35 - event.clientY
				    });
				} else {
				    hoverNav.css({
				        top: 0
				    });
				}
			}
			}).on('mouseout', function () {
			hoverNav.css({
			    top: -45
			});
		});
	}

	var loadUI = function (template, target, VM, fail) {
	    $.ajax('templates/'+template + '.tmpl', { async: false })
	        .done(function (stream) {
	            $('#' + target).html(stream);
	            if(VM){ ko.applyBindings(VM, document.getElementById(target)) };
	        })
	        .fail(function(){
	        	return fail;
	        });
	};

	var validateForm = function(formId,inputClass){
		var regXurl 	= /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
		var regXemail	= /(.+)@(.+){2,}\.(.+){2,}/;
		var errors 		= [];

        $('input').each(function(index,obj){
        	$curRegX 	= '';
        	$fieldName 	= $(this).attr('name');
        	$fieldReq 	= $(this).data('required');
        	$fieldVal 	= $(this).val();
        	if($fieldName!=undefined && $fieldName!='submit'){
        		//field is required and blank
        		if($fieldReq==true && $fieldVal=='') errors.push($fieldName+' is a required field');
        		else{
	        		if($fieldName === 'email') $curRegX = regXemail;
	        		else if($fieldName === 'url') $curRegX = regXurl;
	        		if($curRegX != ''){
	        			var isValid = $curRegX.test($fieldVal);
	        			if(!isValid){
	        				errors.push($fieldName+' is not valid');
	        			}
	        		}
        		}
        	}
        });

        if(errors.length > 0){
        	alert(errors);
        	return false;
        }
        else{ 
        	log('no errors');
        	return true;
    	}
    }

    var href = function(url,target){

    }

	return {
		log:log,
		time:time,
		timeEnd:timeEnd,
		hoverNav:hoverNav,
		validateForm:validateForm,
		href:href,
		loadUI: loadUI
	}
}());

