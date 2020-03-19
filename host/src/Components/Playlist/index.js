import React, { useContext, useState } from 'react'
import Context from 'context'
import {navigate} from 'hookrouter';
import './style.scss'
import $ from 'jquery'

const Playlist = (props) => {
	const state = useContext(Context)

	function onClick(){
		console.log(props)
		$.get(`${state.host}/tracks?id=${props.id}`, (data) => {
			console.log(data)
			state.setTracks(data)
			navigate('/tracks')
		})
	}

	return (

		<div onClick={onClick}className={`PlaylistContainer`} style={{backgroundImage: `url(${props.images[0].url})`}}>
			
		</div>

	)
    
}

export default Playlist