import React, { useContext, useState, useEffect } from 'react'
import Context from 'context'
import './style.scss'

import { TextInput, CTA } from 'Components'

const Join = (props) => {
	const state = useContext(Context)
	const [ name, setName ] = useState('Test')
	const [ room, setRoom ] = useState('ABCD')
	
	function onNameChange(e){
		setName(e.target.value)
	}
	function onRoomChange(e){
		setRoom(e.target.value)
	}
	function joinRoom(){
		state.setLoading(true)
		state.socketJoinRoom({
			name, room
		})
	}


	
	return (
		<div className="joinContainer">
			<TextInput onChange={onNameChange} placeholder="Name"/>
			<TextInput onChange={onRoomChange} placeholder="Room code"/>
			<CTA label="Join now" onClick={joinRoom} />
		</div>
	)
    
}

export default Join