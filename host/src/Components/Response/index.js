import React from 'react'
import { Textfit } from 'react-textfit';
import './style.scss'


const Response = (props) => {

	return (

		<div className={`responseContainer`}>
			
			<Textfit mode="single">
				<p>{props.text}</p>
			</Textfit>
			
			
		</div>
		

	)
    
}

export default Response