import React, { useContext, useState } from 'react'
import Context from 'context'
import './style.scss'

const Image = (props) => {
	return (
		<div className={`ImageContainer ${props.isNext && 'isNext'}`} style={{backgroundImage: `url(${props.url})`}}>
			
		</div>
	)
    
}

export default Image