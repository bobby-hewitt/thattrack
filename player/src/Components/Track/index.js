import React, { useContext, useState, useEffect, useRef} from 'react'
import Context from 'context'
import { Response } from 'Components'
import './style.scss'

const Track = (props) => {
	const audio = React.useRef(null);
	const [ isRevealed, setIsRevealed] = useState(false)
	

	// useEffect(() => {
	// 	const revealTimeout = setTimeout(() => {
			
	// 		setIsRevealed(true)
	// 	},5000)
	// 	return () => {
	// 		clearTimeout(revealTimeout)
	// 	}
	// },[])

	 function audioVolumeIn(){
       if(audio.current.volume){
          var InT = 0;
          var setVolume = 0.5; // Target volume level for new song
          var speed = 0.005; // Rate of increase
          audio.current.volume = InT;
          var eAudio = setInterval(function(){
              InT += speed;
              let newVolume = InT.toFixed(1);
              audio.current.volume = newVolume
              if(InT.toFixed(1) >= setVolume){
                 clearInterval(eAudio);
              };
          },50);
       };
   };
	return (
		<div className={`TrackContainer ${isRevealed && 'isRevealed'}`}>
			<audio ref={audio} autoPlay  onPlay={ () => audioVolumeIn()} loop>
			 	<source src={props.preview_url} type="audio/mpeg" />
				Your browser does not support the audio element.
			</audio>
			<div className="trackImage" style={{backgroundImage: `url(${props.image_url})`}} >
				<div className="grad"/>
			</div>
			<div className="trackMeta">
				<p className="title">{props.name}</p>
				<p className="artist">{props.artist}</p>
			</div>
			<div className={`possibleResponses artistResponses ${isRevealed && 'isHidden'}`}>
				<Response text={props.artistResponsesStr} />
			</div>
			<div className={`possibleResponses nameResponses ${isRevealed && 'isHidden'}`}>
				<Response text={props.nameResponsesStr} />
			</div>
		</div>
	)
    
}

export default Track