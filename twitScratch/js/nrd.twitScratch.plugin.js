/* 
 __                    __    ____                           __            __ 
/\ \__              __/\ \__/\  _`\                        /\ \__        /\ \
\ \ ,_\  __  __  __/\_\ \ ,_\ \,\L\_\    ___   _ __    __  \ \ ,_\   ___ \ \ \___
 \ \ \/ /\ \/\ \/\ \/\ \ \ \/\/_\__ \   /'___\/\`'__\/'__`\ \ \ \/  /'___\\ \  _ `\
  \ \ \_\ \ \_/ \_/ \ \ \ \ \_ /\ \L\ \/\ \__/\ \ \//\ \L\.\_\ \ \_/\ \__/ \ \ \ \ \
   \ \__\\ \___x___/'\ \_\ \__\\ `\____\ \____\\ \_\\ \__/.\_\\ \__\ \____\ \ \_\ \_\
    \/__/ \/__//__/   \/_/\/__/ \/_____/\/____/ \/_/ \/__/\/_/ \/__/\/____/  \/_/\/_/
	twitScratch by nrd [cc] 2014

	change and use it for whatever and all that as long as 
	everyone else can as well without paying anything or being 
	limited in anyway & these notes remain intact.

	usage:
	1. Sign into twitter and create a widget ( or grab widget from some site )
	2. copy the widget id and paste into 'widget_id' below
	3. change 'account' to twitter handle
	4. save

	$('document').ready(function(){
	    var tweets = new $.twitScratch(
			$('#tweets'),{
				'account':'yourTwitterHandle',
				'widget_id':'yourWidgetId',
				'refreshRate':2500
			}
		);
	});
*/
(function($) {

    $.twitScratch = function(el, options) {

        var defaults = {}

        var plugin = this;

        plugin.settings = {}

        var init = function() {
            plugin.settings = $.extend({}, defaults, options);
            plugin.el = el;
            var twitterContent	= [];
			var current_tweet 	= null;
			var twit;
			el.html('<div class="heading"></div><div id="twitterTicker"></div><div id="twitterData"></div>');
			$('.heading').html('<img src="assets/twitter_up.png" align="left"/><h2>@'+options.account+' <a class="follow" href="https://twitter.com/'+options.account+'" target="_blank">follow</a></h2>');
			$('#twitterData').html('<a class="twitter-timeline"  href="https://twitter.com/'+options.account+'"  data-widget-id="'+options.widget_id+'">Tweets by @'+defaults.account+'</a>');
			
			var scrapeTwitter = function(type){
					var twitter_feed = $("#twitter-widget-0").contents().find(".e-entry-content");
					$.each(twitter_feed,function(a,b){ twitterContent[a] = b });
					if(twitter_feed!='') clearInterval(twit);
					(type=='latest')?showLatestTweet():nextTweet();
			}

			var showLatestTweet = function(){ $('#twitterTicker').html(twitterContent[0]) }

			var nextTweet = function(){
				$('#twitterTicker').animate({'opacity':0.0},500,function(){
					if(current_tweet==null) current_tweet = 0;
					else current_tweet += 1;
					if(current_tweet>twitterContent.length-1) current_tweet = 0;
					$('#twitterTicker').html(twitterContent[current_tweet]);
					$('#twitterTicker').animate({'opacity':1.0},500,function(){
						twit = clearInterval(twit);
						twit = setInterval(nextTweet,options.refreshRate);
					});
				});
			}
			twit = setInterval(scrapeTwitter,1000);
        }
        init();

    }

})(jQuery);

!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");