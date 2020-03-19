import React, { useContext, useState } from 'react'
import Context from 'context'
import {navigate} from 'hookrouter';
import './style.scss'


const Player = (props) => {
	

	return (

		<div className="playerContainer">
			<p>{props.name}</p>
		</div>

	)
    
}

export default Player