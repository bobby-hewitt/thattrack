import React, { useContext, useState } from 'react'
import Context from 'context'
import './style.scss'

const Loader = (props) => {
	
	return (
		<div class={`vinyl-wrapper ${props.loading && 'loading'}`}>
		   <div class="vinyl"></div>
		   
		</div>
		
	)
    
}

export default Loader