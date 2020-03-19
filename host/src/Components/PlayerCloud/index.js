import React, { useContext, useState } from 'react'
import Context from 'context'
import {navigate} from 'hookrouter';
import { Player } from 'Components'
import './style.scss'
import $ from 'jquery'

const PlayerCloud = (props) => {
	
	console.log(props.players)
	return (

		<div className="playerCloudContainer">
			{props.players && props.players.map((item, i) => {
				return(
					<Player {...item} key={i} />
				)
			})}
		</div>

	)
    
}

export default PlayerCloud