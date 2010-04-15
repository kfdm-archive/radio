import AnimeNFO
song = AnimeNFO.now_playing()

seconds = song.duration[0].split(':')
seconds = (int(seconds[0])*60) + int(seconds[1])

if not song.image:
    song.image = ''

print '{"image":"%s","artist":"%s","title":"%s","album":"%s","length":"%s","duration":"%s","rating":"%s","timer":%d}'%(song.image,song.artist,song.title,song.album,song.duration[1],song.duration[0],song.rating,seconds)
