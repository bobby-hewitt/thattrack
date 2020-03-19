import React, { useContext, useState, useEffect } from 'react'
import Context from 'context'
import './style.scss'
import { Image } from 'Components'
const Home = (props) => {
	const state = useContext(Context)
	const [isClicked, setClicked] = useState(false)
	useEffect(() => {
		window.addEventListener('mousedown', setClickedTrue)
		window.addEventListener('mouseup', setClickedFalse)
		return ()=> {
			window.removeEventListener('mousedown', setClickedTrue)
		window.removeEventListener('mouseup', setClickedFalse)
		}

	})

	function setClickedTrue(){
		console.log('true')
		setClicked(true)
	}
	function setClickedFalse(){
		console.log('false')
		setClicked(false)
	}
	return (
		<div 
			className={`
				cursorContainer
				${isClicked && 'isClicked'}
				`}
			style={{
				position: 'fixed', 
				top: state.mousePos.y + 'px', 
				left: state.mousePos.x + 'px'
			}}
		>

		

			
			
			
		</div>
	)
    
}

export default Home