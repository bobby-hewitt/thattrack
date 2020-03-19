import React, { useContext, useState, useEffect } from 'react'
import Context from 'context'
import './style.scss'

import { TextInput, CTA } from 'Components'

const WaitingStart = (props) => {
	const state = useContext(Context)
	return (
		<div className="WaitingStartContainer">
			<CTA label="Start now" onClick={state.socketStartGame} />
		</div>
	)
    
}

export default WaitingStart