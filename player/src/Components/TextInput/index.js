import React, { useContext, useState } from 'react'
import Context from 'context'
import {navigate} from 'hookrouter';
import './style.scss'
import $ from 'jquery'

const TextInput = (props) => {
	return (
		<input className="textInput" type="text" onChange={props.onChange} placeholder={props.placeholder || ''} />
	)
    
}

export default TextInput