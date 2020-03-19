import React, { useContext, useState, useEffect, useRef} from 'react'
import Context from 'context'
import { Response } from 'Components'
import './style.scss'

const Track = (props) => {
	const audio = React.useRef(null);
	const state = useContext(Context)
	

	useEffect(() => {
		if (state.revealAnswer){
			audioVolumeOut()
		}
	},[state.revealAnswer])

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

   function audioVolumeOut(){
   		console.log('audio out')
       if(audio.current.volume){
          var InT = 0.4;
          var setVolume = 0;  // Target volume level for old song 
          var speed = 0.005;  // Rate of volume decrease
         audio.current.volume = InT;
          var fAudio = setInterval(function(){
              InT -= speed;
             audio.current.volume = InT.toFixed(1);
              if(InT.toFixed(1) <= setVolume){
                 clearInterval(fAudio);
                 //alert('clearInterval fAudio'+ InT.toFixed(1));
              };
          },50);
       };
   };
	return (
		<div className={`TrackContainer ${state.revealAnswer && 'isRevealed'}`}>
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
			<div className={`possibleResponses artistResponses ${state.revealAnswer && 'isHidden'}`}>
				<Response text={props.artistResponsesStr} />
			</div>
			<div className={`possibleResponses nameResponses ${state.revealAnswer && 'isHidden'}`}>
				<Response text={props.nameResponsesStr} />
			</div>
		</div>
	)
    
}

export default Track