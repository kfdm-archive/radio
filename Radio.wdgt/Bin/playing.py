import AnimeNFO
song = AnimeNFO.now_playing()

if song.image:
	print '<img width="200" height="200" src="'+song.image+'" /><br />'
print "Artist:",song.artist,"<br />"
print "Title:",song.title,"<br />"
print "Album:",song.album,"<br />"
print "Duration:",song.duration,"<br />"
print "Rating:",song.rating,"<br />"
