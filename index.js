const Lyricist = require('lyricist/node6');

module.exports = async () => {

  const lyricist = new Lyricist("KEY");
  
  const albumid = 11996;
	const album = await lyricist.album(albumid, { fetchTracklist: true } );
	const trackListID = album.tracklist.map( song => song.id );
	
	// for each songs of the album tracklist, map song info and lyrics
	const songs = await Promise.all(
		trackListID.map(songID => {
				return lyricist.song(songID, { fetchLyrics: true }).catch( () => { return false; } )
		})
	);
	
	// for each song, only retieve the lyrics, then concatenate lyrics together.
	const lyrics = songs.map(songJSON => { return songJSON.lyrics; });
  let lyric = lyrics.reduce( (acc,val) => acc.concat(val) );
  
	return lyric;
}