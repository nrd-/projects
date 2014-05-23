twitScratch
========
jQuery plugin for customizing twitter feeds.

Usage:
```
    $('document').ready(function(){
	    var tweets = new $.twitScratch(
			$('#tweets'),{
				'account':'yourTwitterHandle',
				'widget_id':'yourWidgetId',
				'refreshRate':2500
			}
		);
	});
```
