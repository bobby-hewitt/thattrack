import React, { useContext, useState, useEffect } from 'react'
import Context from 'context'
import './style.scss'
import { navigate } from 'hookrouter';
import { PlayerCloud } from 'Components'

const Instructions = (props) => {
	const state = useContext(Context)
	useEffect(() => {

		if ( state.players.length > 0){
			state.socketInstructionsComplete()
		} else {
			navigate('/')
			
		}
	},[])
	return (
		<div className="instructionsContainer">
			<img className="crowdImg" src={require('assets/crowd.svg')}/>
		</div>
	)
    
}

export default Instructions