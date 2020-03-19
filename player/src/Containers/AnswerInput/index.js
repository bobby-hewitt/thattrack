import React, { useContext, useState, useEffect } from 'react'
import Context from 'context'
import './style.scss'
import { Response } from 'Components'

const CTA = (props) => {
	const state = useContext(Context)
	const [ artistResponse, setArtistResponse] = useState(false)
	
	function onNameResponse(text){
		const response = {
			artist: artistResponse,
			name: text
		}
		state.sendTrackResponse(response)
	}

	function onArtistResponse(text){
		setArtistResponse(text)
		console.log('artist response', text)
	}

	return (
		<div className="answerInputContainer">
			{!artistResponse && state.tracks && state.tracks[state.round].artistResponses.map((item, i) => {
				return(
					<Response text={item} key={i} onClick={onArtistResponse}/>
				)
			})}
			{artistResponse && state.tracks && state.tracks[state.round].nameResponses.map((item, i) => {
				return(
					<Response text={item} key={i} onClick={onNameResponse}/>
				)
			})}		
		</div>
	)
    
}

export default CTA