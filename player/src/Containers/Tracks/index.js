import React, { useContext, useState, useEffect } from 'react'
import Context from 'context'
import './style.scss'
import $ from 'jquery'
import { Image, Track } from 'Components'
const Tracks = (props) => {
	const state = useContext(Context)
	const [ index, setIndex] = useState(0)

	// useEffect(() => {
	// 	const nextInterval = setInterval(() => {
	// 		setIndex(index + 1)
	// 	},10000)
	// 	return () => {
	// 		clearInterval(nextInterval)
	// 	}
	// })
	return (
		<div className="TracksContainer">
			{state.tracks && state.tracks.length > 0 && state.tracks.map((item, i) => {
				if (index === i){
				return(
					<Track {...item} key={i}/>
				)}
				else return <div key={i}/>
			})}	
		</div>
	)
    
}

export default Tracks