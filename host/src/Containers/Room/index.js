import React, { useContext, useState, useEffect } from 'react'
import Context from 'context'
import './style.scss'
import { PlayerCloud } from 'Components'

const Home = (props) => {
	const state = useContext(Context)
	console.log(state.players)
	return (
		<div className="roomContainer">
			<img className="crowdImg" src={require('assets/crowd.svg')}/>
			{state.room && 
				<React.Fragment>
				<div className="roomNameContainer title">
					<p className="that title">That</p>
					<p className="song title">Song</p>
					<p className="dot title">.</p>
					<p className="rocks title">Rocks</p>
				</div>
				{state.players.length > 0 && 
					<PlayerCloud players={state.players}/>
				}
				<p className="pageTitle">Room Code</p>
				<p className="roomCode">{state.room.short}</p>
				</React.Fragment>
			}
			
		</div>
	)
    
}

export default Home