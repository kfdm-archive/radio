/* 
 This file was generated by Dashcode.  
 You may edit this file to customize your widget or web page 
 according to the license.txt file included in the project.
 */

//
// Function: load()
// Called by HTML body element's onload event when the widget is ready to start
//
function load() {
	/*
	dashcode.setupParts();
	*/
}

//
// Function: remove()
// Called when the widget has been removed from the Dashboard
//
function remove() {
	// Stop any timers to prevent CPU usage
	// Remove any preferences as needed
	// widget.setPreferenceForKey(null, dashcode.createInstancePreferenceKey("your-key"));
}

//
// Function: hide()
// Called when the widget has been hidden
//
function hide() {
	// Stop any timers to prevent CPU usage
}

//
// Function: show()
// Called when the widget has been shown
//
function show() {
	// Restart any timers that were stopped on hide
	nowPlaying();
	upcomming();
}

var currentSong = {};
var upcommingSongs = [];

function redraw() {
	$('#album-art').attr('src',currentSong['image']);
	$('#artist').text(currentSong['artist']);
	$('#title').text(currentSong['title']);
	$('#album').text(currentSong['album']);
	$('#duration').text(currentSong['duration']);
	$('#rating').text(currentSong['rating']);
	alert(upcommingSongs);
}

function nowPlaying() {
	$('#loader').show();
	$.post('http://www.animenfo.com/radio/nowplaying.php', {'ajax':'true','mod':'playing'}, function(data) {
		var tmp = $(data);
		var img = tmp.find('td:first img').attr('src');
		var info = tmp.find('td:last').text().split('\n');
		
		currentSong['image'] = 'http://www.animenfo.com/radio/'+img;
		jQuery.each(info,function() {
			try {
				var item = jQuery.trim(this);
				if(item=='') return true; //continue;
				item = item.replace(':','\n');
				item = item.split('\n');
				key = item[0].toLowerCase();
				value = jQuery.trim(item[1]);
				if(value=='') return true; //continue;
				currentSong[key] = value;
			} catch(err) {
				return true; //continue;
			}
		});
		$('#loader').hide();
		redraw();
	});
}

function upcomming() {
	$.post('http://www.animenfo.com/radio/nowplaying.php', {'ajax':'true','mod':'queue'}, function(data) {
		upcommingSongs = [];
		$(data).find('tr td').each(function() {
			var song = jQuery.trim($(this).text());
			upcommingSongs.push(song);
		});
		redraw();
	});
}

if (window.widget) {
	widget.onremove = remove;
	widget.onhide = hide;
	widget.onshow = show;
}