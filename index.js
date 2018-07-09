const Lyricist = require('lyricist/node6');
const MarkovChain = require('markovchain');

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
  
  lyric = lyric.replace(/\[.*\]/gm, "");
	lyric = lyric.replace(/\n/gm, " ");
	
	// apply markov chain on lyric-string
	const markov = new MarkovChain(lyric);
	let newLyric = markov.end(30).process();
	
	// apply upper case to first letter and append the remaining lyric
	newLyric = newLyric.charAt(0).toUpperCase() + newLyric.slice(1);
	
	return newLyric;
}