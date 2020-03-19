import React, { useContext, useState, useEffect } from 'react'
import Context from 'context'
import './style.scss'
import $ from 'jquery'
import { Playlist, TextInput } from 'Components'

const Home = (props) => {
	const state = useContext(Context)

	useEffect(() => {
		getPlaylists()
	},[])



	function getPlaylists(e){
		if (e) e.persist()
		state.setLoading(true)
		clearTimeout(window.loadTimeout)
		window.loadTimeout= setTimeout(() => {
			let url = e && e.target && e.target.value ? 
				`${state.host}/playlists?search=${e.target.value}`:
				`${state.host}/playlists`
			$.get(url, (data) => {
				state.setLoading(false)
				state.setPlaylists(data.items)
			})

		}, 500)
		
		
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