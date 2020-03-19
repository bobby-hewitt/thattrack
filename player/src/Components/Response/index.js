import React from 'react'
import { Textfit } from 'react-textfit';
import './style.scss'


const Response = (props) => {

	return (
		<div className={`responseContainer`} onClick={ () => props.onClick(props.text)}>
			<div className="responseInnerContainer">
				<p>{props.text}</p>
			</div>
		</div>
	)
    
}

export default Response