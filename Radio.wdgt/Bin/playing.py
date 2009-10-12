import AnimeNFO
song = AnimeNFO.now_playing()

seconds = song.duration[0].split(':')
seconds = (int(seconds[0])*60) + int(seconds[1])

if song.image:
	print '<img width="200" height="200" src="'+song.image+'" /><br />'
else:
	print '<img width="200" height="200" alt="Missing Album Artwork" /><br />'
print "Artist:",song.artist,"<br />"
print "Title:",song.title,"<br />"
print "Album:",song.album,"<br />"
print "Length:",song.duration[1],"<br />"
print "Duration:<span id='duration'>",song.duration[0],"</span><br />"
print "Rating:",song.rating,"<br />"
print "<span id='timer' style='display:none'>"+str(seconds)+"</span>"
