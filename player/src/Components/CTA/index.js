import React, { useContext, useState } from 'react'
import Context from 'context'
import {navigate} from 'hookrouter';
import './style.scss'
import $ from 'jquery'

const CTA = (props) => {
	return (
		<div className="CTA" onClick={props.onClick}>
			<p>{props.label}</p>
		</div>
	)
    
}

export default CTA