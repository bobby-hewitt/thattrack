const Rooms = require('./Models/Rooms')
const Spotify = require('./spotify')

exports.connected = function(socket, playerData){
	console.log('player joingfing', playerData)
	Rooms.findOne({short: playerData.room}, function(err, result){
		if (err){	
			console.log('errr joinging')
			return socket.emit('error-joining')
			console.log('error')
		} else if (result) {			
			socket.join(result.long)
			playerData.id = socket.id
			socket.to(result.long).emit('player-joined', playerData);

			// let toSend = {
				
			// 	player: playerData
			// }

			let toSend = {
				hostID: result,
				player: playerData
			}
			// result.player = playerData
			// result.player.id = socket.id
			
			socket.emit('success-joining', toSend)
		} else {
			console.log('failed to find room')
			return socket.emit('error-joining')
		}
	})
}


exports.startGame = (socket, data) => {
	console.log('starting game', data)
	socket.broadcast.to(data.room.long).emit('start-game')
}

exports.getPlaylists = (socket, data) => {
	Spotify.playlists(data).then((playlists) => {
		console.log('sending to', socket.id, data)
		socket.emit('playlist-options', playlists)
	})
}

exports.sendTracks = (io, socket, data) => {
	Spotify.tracks(data.playlistID).then((tracks) => {
		console.log('got tracks', data.room)
		io.in(data.room.long).emit('send-tracks', tracks)
	})
}

exports.trackResponse = (socket, data) => {
	console.log('sending track response', data.room)
	socket.to(data.room.long).emit('player-track-response', data)
}