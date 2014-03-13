amradio
========
jQuery plugin for streaming audio.

Usage:
	```
    $('#AMradio').amRadio({
					station: 	'Some Radio Station',
					audioSrc: 	'http://some_stream_host.com:some_port/listen',
					playBtn: 	'img/powerOff.png',
            		stopBtn: 	'img/powerOn.png'
    });
    ```

Settings
========

station: String to be displayed if showDetails is true.

slogan: String to be displayed if showDetails is true *

trackName: String to be displayed if showDetails is true *

artistName: String to be displayed if showDetails is true *

artwork: Image url for Station 

playBtn: Image url for the play button

stopBtn: Image url for the stop button

color: Sets font color for wrapper DOM

fontFamily: Sets font family for wrapper DOM

autoPlay: Sets whether to play stream on page load

showDetails: Sets whether to show stream details

complete: Called once load is complete

audioSrc: Stream url including port etc

controls: optional control ui

* = not currently being used.