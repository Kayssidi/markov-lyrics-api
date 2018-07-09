const Lyricist = require('lyricist/node6');

module.exports = async () => {

  const lyricist = new Lyricist("KEY");
  
  const albumid = 11996;
	const album = await lyricist.album(albumid, { fetchTracklist: true } );
	const trackListID = album.tracklist.map( song => song.id );
	
	return trackListID;
}