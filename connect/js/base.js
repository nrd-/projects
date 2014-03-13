/*--------------------------------------------------------------------
app
--------------------------------------------------------------------*/
var $enforceLogin 	= true;
var app 			= angular.module("nrd", ["firebase"]);
var fb 				= 'your-firebase-url';
var ref 			= new Firebase('https://'+fb+'.firebaseio.com/conversations/');
var currentUser 	= null;
var currentUserName = null;
var useLogs 	 	= true;

/*--------------------------------------------------------------------
time
--------------------------------------------------------------------*/
var currentDate = function(date,format,library){
	var dateString;
	if(library){
		dateString = moment().format('YYYY.mm.dd');
	}else{
		var now 		= new Date();
		var year 		= now.getFullYear();
		var month 		= ( ( now.getMonth() + 1 ) < 10 )	? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
		var day 		= ( now.getDay() < 10 )				? '0' + now.getDay() : now.getDay();
		var hour 		= ( now.getHours() < 10 )			? '0' + now.getHours() : now.getHours();
		var minute 		= ( now.getMinutes() < 10 )			? '0' + now.getMinutes() : now.getMinutes();
		var second 		= ( now.getSeconds() < 10 )			? '0' + now.getSeconds() : now.getSeconds();
		dateString 		= '['+year+'.'+month+'.'+day+']['+hour+':'+minute+':'+second+']';
	}
	return dateString;
}

var formatDate = function(d,formatString){
	var dateString = moment(Date(d)).format(formatString);
	return dateString;
}

var formatAllDates = function(){
	$('.timestring').each(function(e,f){
		$ts = $(f).text();
		nrd.log($ts);
		$(f).text(formatDate($ts,'YYYY.MM.DD - h:mm:ss'));
	})
}

var logOutUser = function(){
	window.location.href='./?logout=1';
}

var closePopUp = function(){
	$('#popup').fadeOut();
}

var openPopUp = function(head,body,foot,user){
	nrd.log(head+':'+body+':'+foot+':'+user);
	$('#popup').fadeIn();
	(head)? $('#popupHead').html(head):$('#popupHead').html('');
	(foot)? $('#popupFoot').html(foot):$('#popupFoot').html('');
	loadTemplate(body,'popupBody');
}

var loadTemplate = function(template,target){
	nrd.log(template+':'+target)
	$.ajax('templates/'+template + '.tmpl', { async: false })
    .done(function (stream) { $('#' + target).html(stream); })
    .fail(function(){ return fail; });
}

var changeImage = function(){
	nrd.log('change image')
}

var saveChanges = function(){
	nrd.log(currentUser)
	var user = {
		userName: $('#userProfileName').val(),
		email: currentUser.email,
		image: '',
		uid: currentUser.uid
	}
	updateUser(user);
}

var chngPassword = function(){
	nrd.log('changePassword');
	loadTemplate('changePassword','popupBody');
	$('#changePassBtn').click(function(){
		var auth = new FirebaseSimpleLogin(ref, function(error, user) {});
		var oldPassword 	= $('#oldPass').val();
		var newPassword		= $('#newPass').val();
		var email 			= currentUser.email;
		auth.changePassword(email, oldPassword, newPassword, function(error, success) {
			  if (!error) $('#popupBody').html('Password changed successfully');
			  else $('#popupBody').html('Password was not changed due to the following error:<br>'+error);
		});
	});
}

var updateUser = function(user){
	var fbu = 'https://'+fb+'.firebaseio.com/users/'+user.uid;
	var nameRef = new Firebase(fbu);
	for (var k in user){
	    if (user.hasOwnProperty(k)) nameRef.child(k).set(user[k],function(error){
	    	if(error) alert('Changes could not be saved');
	    	else closePopUp();
	    });
	}
}

/*--------------------------------------------------------------------
controllers
--------------------------------------------------------------------*/

//baseController
var baseController = function($scope, $firebase) {
	$scope.currentUserName = null;
	var getUser = function(){
		var userRef = new Firebase('https://'+fb+'.firebaseio.com/users/'+currentUser.uid);
		var data;
		userRef.once('value', function(dataSnapshot) {
		  userData 			= dataSnapshot.val();
		  currentUserName 	= userData.userName;
		  return userData.userName;
		});
	}
	/*................................................................
	messaging
	................................................................*/
	$scope.messages = $firebase(ref);
	$scope.addMessage = function(e) {
		if($('#userMsg').is(':focus')){
		  	if (e.keyCode != 13) return;
		  	$scope.when = Date.now();
		  	$scope.msg = $('#userMsg').val();
		  	var userRef = new Firebase('https://'+fb+'.firebaseio.com/users/'+currentUser.uid);
			var data;
			userRef.once('value', function(dataSnapshot) {
			  	userData 			= dataSnapshot.val();
			  	currentUserName 	= userData.userName;
			  	currentMsg 			= $scope.msg;
			  	$scope.messages.$add({
			  						when: 	$scope.when, 
			  						from: 	currentUserName, 
			  						body: 	$scope.msg,
			  						uid: 	userData.uid
			  	});
			  	$scope.msg = "";
			  	formatAllDates();
			});
	  	}
	};

	/*................................................................
	interfaces
	................................................................*/
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

	var updatePopUp = function(src){
		nrd.log('update popup to '+src)
	}

	/*................................................................
	auth
	................................................................*/
	var auth = new FirebaseSimpleLogin(ref, function(error, user) {
		$scope.popup = loadUI('popup','popup');
		if (error) {
		  	$('#authResults').removeClass('valid').addClass('invalid');
		    $scope.authorizer = error.code;
		    if($enforceLogin){
			    $('#msgModule').fadeOut();
			    loadUI('login','authResults');
			    $loginBtn = $('#loginBtn').click(function(){ doLogin(); });
			    $signupLink = $('#signupLink').click(function(){ startSignUp(); });
		    }
		}else if (user) {
			currentUser = user.email;
		  	$('#authResults').removeClass('invalid').addClass('valid');
		    $('#authResults').html( userBar(user) );
		    
		    $('#msgModule').fadeIn();
		}else {
		    //$('#msgModule').fadeOut();
			//loadUI('login','authResults');
		}
	});


	/*................................................................
	user
	................................................................*/
	var userBar = function(user){
		currentUser = user;
		var userb;
		//logout btn
		userb = generateBtn({click:'window.location.href=\'./?logout=1\'',value:'logout '+user.email});

		//update user
		userb += generateBtn({click:'openPopUp(\'Your Profile\',\'userProfile\')',value:'profile'});
		return userb;
	}

	var generateBtn = function(btn){
		var btnString = '<input type="button" onclick="'+btn.click+'" value="'+btn.value+'"/>';
		return btnString;	
	}

	/*................................................................
	login
	................................................................*/
	var doLogin = function(){
		nrd.log('doing login!')
		var emailAddress 		= $('#emailAddress').val();
		var pass 				= $('#password').val();
		auth.login('password',{email:emailAddress,password:pass});
		closePopUp();
	};

	/*................................................................
	join
	................................................................*/
	var startSignUp = function(){
		//loadUI('signup','authResults');
		openPopUp('Sign Up','signup');
		$signupBtn = $('#signupBtn').click(function(){ doSignUp(); });
	}

	var doSignUp = function(){
		nrd.log('signing up...');
		
		//grab info
		var email 		= $('#emailAddress').val();
		var password 	= Math.random(999999999);//$('#password').val();
		nrd.log(email);

		nrd.log('sending confirmation email to '+email);

		//createUser
		auth.createUser(email, password, function(error, user) {
			if (!error) {
				//send password set email
				auth.sendPasswordResetEmail(user.email, function(error, success) {
				  if (!error) {
				  	nrd.log(success);
				    $('#popupBody').html('Validation email sent successfully to '+user.email+'<br>');
				  }else{
				  	$('#popupBody').html('there was an issue sending your validation email. Please try again. '+error);
				  }
				});
			}else{
				  	nrd.log(error.code);
				  	$('#authResults').append(error.code);
			}
		});
	}

	/*................................................................
	logout
	................................................................*/
	var doLogout = function(){
		$('#msgModule').fadeOut();
		auth.logout();
	}

	/*................................................................
	init
	................................................................*/
	var getParameterByName = function(name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),results = regex.exec(location.search);
	    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	$(document).ready(function(){
		nrd.log('loaded');
		formatAllDates();
	});
	
	if(getParameterByName('logout')) { doLogout(); window.location.href="./"; }
	if(getParameterByName('update')) { openPopUp(); }
	else doLogin();
	
}

