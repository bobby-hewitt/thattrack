const request = require('request')


const calls = {
	playlists: 'https://api.spotify.com/v1/browse/featured-playlists?limit=50',
	searchPlaylists: 'https://api.spotify.com/v1/search?limit=50&type=playlist&q='
}

function playlists(search){
	return new Promise((resolve, reject) => {
		authenticate()
		.then((token) => {
			if (search){
				searchPlaylists(token, search).then((data) => {
					resolve(data.items)
				})
			} else {
				getPlaylists(token).then((data) => {
					resolve(data.items)
				})
			}
		})
		.catch((err) => {
			reject()
		})
	})
	
}


function tracks(id){
	return new Promise((resolve, reject) => {
		const url = `https://api.spotify.com/v1/playlists/${id}/tracks`
		authenticate()
		.then((token) => {
			getTracks(token, url).then((data) => {
				resolve(data)
			})
		})
		.catch((err) => {
			reject()
		})
	})
}


function authenticate(){
	var authOptions = {
	  url: 'https://accounts.spotify.com/api/token',
	  headers: {
	    'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
	  },
	  form: {
	    grant_type: 'client_credentials'
	  },
	  json: true
	};
	return new Promise((resolve, reject) => {
		request.post(authOptions, function(error, response, body) {
			if (!error && response.statusCode === 200) {	
				resolve(body.access_token)
			} else {
				reject('error authenticating')
			}		
		})
	})
}

function searchPlaylists(token, search){

	const options = {
		url: calls.searchPlaylists + search,
		headers: {
			'Authorization': 'Bearer ' + token
		},
		json: true
	};
	return new Promise((resolve, reject)=> {
		 request.get(options, function(error, response, body) {
	    	if (!error && body && body.playlists){
	    		resolve(body.playlists)
	    	} else {
	    		reject('error hetting playlists')
	    	}
	    });
	})
}


function getPlaylists(token){
	const options = {
		url: calls.playlists,
		headers: {
			'Authorization': 'Bearer ' + token
		},
		json: true
	};
	return new Promise((resolve, reject)=> {
		 request.get(options, function(error, response, body) {
	    	if (!error && body && body.playlists){
	    		resolve(body.playlists)
	    	} else {
	    		reject('error hetting playlists')
	    	}
	    });
	})
	
}

function getTracks(token, url){
	const options = {
		url: url,
		headers: {
			'Authorization': 'Bearer ' + token
		},
		json: true
	};
	return new Promise((resolve, reject)=> {
		 request.get(options, function(error, response, body) {
	    	if (!error && body ){
	    		let newTracks = filterTracks(body.items)
	    		let withResponses = addResponses(newTracks)
	    		resolve(withResponses)
	    	} else {
	    		reject('error getting tracks')
	    	}
	    });
	})
}

function getRandom(limit){
	return Math.floor(Math.random() * limit)
}

function shuffle(array) { 
	for(let i = array.length - 1; i > 0; i--){
	  const j = Math.floor(Math.random() * i)
	  const temp = array[i]
	  array[i] = array[j]
	  array[j] = temp
	}
	return array
}

function addResponses(tracks){
	for (var i = 0; i < tracks.length; i++){
		tracks[i] = createResponses(tracks[i], tracks)
	}
	let shuffled = shuffle(tracks)
	return shuffled.splice(0,10)
}

function createResponses(track, tracks){
	track.artistResponses = [track.artist]
	track.nameResponses = [track.name]
	for (var j = 0; j < 3; j++){
		track.artistResponses.push( tracks[getRandom(tracks.length)].artist)
		track.nameResponses.push( tracks[getRandom(tracks.length)].name)
	}
	track.artistResponses = shuffle(track.artistResponses)
	track.nameResponses = shuffle(track.nameResponses)
	track.artistResponsesStr = '- '
	track.nameResponsesStr = '- '
	for (var i = 0; i < track.artistResponses.length; i++){
		track.artistResponsesStr += track.artistResponses[i] + ' - '
		track.nameResponsesStr += track.nameResponses[i] + ' - '
	}
	return track
}

function pullKeyTrackData(track){
	return {
		image_url: track.track.album.images[0].url,
		preview_url: track.track.preview_url,
		artist: track.track.artists[0].name,
		name: track.track.name
	}
}

function filterTracks(items){
	let newTracks = []
	for (var i = 0; i < items.length; i++){
		if (items[i].track && items[i].track.preview_url && items[i].track.album && items[i].track.album.images && items[i].track.album.images[0]){
			newTracks.push(pullKeyTrackData(items[i]))
		}
	}
	return newTracks
}
   
module.exports = {
	playlists,
	tracks
}

