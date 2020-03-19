const Rooms = require('./Models/Rooms')
const Spotify = require('./spotify')
exports.connected = function(socket){

	// unique room codes 
	function createCode(){
		var possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
		var text = '';
		for (var i = 0; i < 4; i++){
    		text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}
	function createUniqueRoomId(){
		let room = createCode()
		Rooms.findOne({short: room}, function(err, result){
			if (result) return createUniqueRoomId()
			storeRoom(room)
		})
	}
	function storeRoom(room){
		Rooms.create({short: room, long: socket.id}, (err, roomToSend)=> {
			console.log('generated, ', room)
			socket.emit('host-room-generated', roomToSend)
		})
	}
	

	//generic room code
	const code = 'ABCD'
	function createDevRoom(){
		Rooms.findOne({short: code}, function(err, result){
			if (result) return deleteRooms()
			createRoom()
		})
	}

	function deleteRooms(){
		Rooms.deleteMany({}, () => {
			createRoom()
		})
	}

	function createRoom(){
		Rooms.create({short: code, long: socket.id}, (err, room)=> {
			console.log('generated, ', room)
			socket.emit('host-room-generated', room)
		})
	}


	// createUniqueRoomId()
	createDevRoom()
	// Rooms.find({}, (err, rooms) => {
	// 	console.log('All rooms', rooms)
	// 	checkRoom()
	// })
	
}


exports.sendSelection = function(socket, data){
	
	socket.broadcast.to(socket.id).emit('waiting')
	Spotify.playlists(false).then((playlists) => {
		console.log('sending', data.player)
		socket.to(data.player).emit('playlist-options', playlists)
	})	
}