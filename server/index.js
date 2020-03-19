const express = require('express')
const app = express()
const cors = require('cors')
const request = require('request')
const path = require('path')
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 9000
//set up environment variables
require('dotenv').config({path: '.env'})
app.use(cors())
// app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({     
  extended: true
}))

// set up database connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);
mongoose.connection.on('error', function() {
    console.info('Error: Could not connect to MongoDB.?')
});
mongoose.connection.on('connected', function() {
    console.info('Successfully connected to the database')
});

const Rooms = require('./Models/Rooms')
const Host = require('./host')
const Player = require('./player')
const Spotify = require('./spotify')

//routes
app.get('/playlists', (req,res,next) => {
	Spotify.playlists(res, req.query.search)
})
app.get('/tracks', (req,res,next) => {
	Spotify.tracks(res, req.query.id)
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// socket
io.on('connection', function(socket){
	console.log('socket connected')
	socket.on('host-connected', Host.connected.bind(this, socket))
	socket.on('send-selection', Host.sendSelection.bind(this, socket))

	// socket.on('host-send-game-state', Host.sendGameState.bind(this, socket, io))
	// socket.on('host-send-answer-input', Host.sendAnswerInput.bind(this, socket, io))
	socket.on('player-connected', Player.connected.bind(this, socket))
	socket.on('start-game', Player.startGame.bind(this, socket))
	socket.on('get-playlists', Player.getPlaylists.bind(this, socket))
	socket.on('player-selected-playlist', Player.sendTracks.bind(this, io, socket))
	socket.on('player-track-response', Player.trackResponse.bind(this, socket))
  	
});





function disconnect(socket){
	// Rooms.remove({})
	Rooms.findOne({long: socket.id}, (err, room) => {
		
		if (room){
			// otherwise handle player leaving logic
			socket.broadcast.to(room.long).emit('host-disconnected')
			return room.remove()
		} 
		else {
			// otherwise handle player leaving logic
			const rooms = Object.keys(socket.adapter.rooms)
			for (var i = 0; i < rooms.length; i++){
				if (rooms[i] !== socket.id){
					socket.broadcast.to(rooms[i]).emit('player-left', {id: socket.id});
				}
			}
		}
	})
}

http.listen(PORT, function(err){
	if (err){
		console.log(err)
		return
	} else {
		console.log('listening one', PORT);
	}
});
