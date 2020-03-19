import React, { useContext, useState, useEffect } from 'react'
import Context from 'context'
import './style.scss'
import $ from 'jquery'
import { Playlist, TextInput } from 'Components'

const Home = (props) => {
	const state = useContext(Context)





	function getPlaylists(e){
		if (e) e.persist()
		// state.setLoading(true)
		clearTimeout(window.loadTimeout)
		window.loadTimeout= setTimeout(() => {
			state.setPlaylists([])
			state.getPlaylists(e.target.value)
		},500)
		
	}

	
	return (
		<div className="playlistsContainer">
		<div className="playlistSearchContainer">
				<TextInput onChange={getPlaylists}/>
			</div>
			<div className="playlistsInnerContainer">
			{state.playlists && state.playlists.length > 0 && state.playlists.map((item, i) => {
				return(
					<Playlist {...item} key={i}/>
				)
			})}
			</div>
			
			
			
		</div>
	)
    
}

export default Home