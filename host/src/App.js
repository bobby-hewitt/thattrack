import React, { useState, useEffect } from "react";
import { Provider } from "./context";
import { navigate } from 'hookrouter'
import initialState from './initialState'
import Routes from './routes'
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:9000');

const ProviderComponent = props => {  
 
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [host, setHost] = useState('http://192.168.1.131:9000');
  const [loading, setLoading] = useState(true);

  //s
  const [players, setPlayers] = useState([])
  const [update, setUpdate] = useState(0)
  const [room, setRoom] = useState(false);
  //gameplay
  const [round, setRound] = useState(0);
  const [subRound, setSubRound] = useState(0);
  const [responses, setResponses] = useState([])
  const [revealAnswer, setRevealAnswer] = useState(false)

  useEffect(() => { 
    socket.on('player-joined', playerJoined)
    socket.on('host-room-generated', roomCodeGenerated)
    socket.on('start-game', startGame)
    socket.on('send-tracks', receiveingTracks)
    socket.on('player-track-response', playerTrackResponse)
    return () => { 
      socket.removeListener('send-tracks', receiveingTracks)
      socket.removeListener('start-game', startGame)
      socket.removeListener('player-joined', playerJoined)
      socket.removeListener('host-room-generated', roomCodeGenerated)
      };
  },[players])
  
  function roomCodeGenerated(data, socket){
    setRoom(data)
    setLoading(false)
  }
  function playerJoined(data){
    players.push(data)
    setPlayers(players)
    setUpdate(update +1)
  } 
  function startGame(data){
    navigate('/instructions')
  }

  //
  function socketInstructionsComplete(){
    setLoading(true)
    socket.emit('send-selection', {
      player: players[round].id,
    })
  }
  function receiveingTracks(data){
    console.log('getting tracks', data)
    setTracks(data)
    setLoading(false)
    navigate('/tracks')
  }

  function playerTrackResponse(data){
    console.log('player response ', data)
    responses.push({
      player: data.player,
      track: data.track
    })

    setResponses(responses)
    if (responses.length >= players.length){
      setRevealAnswer(true)
      setUpdate(update+1)
    }
  }

  useEffect(() => {
    socket.emit('host-connected'); 
  }, [])

  useEffect(() => {
    if(room && window.location.pathname !== '/'){

    } else {
      navigate('/')
    }
  },[])

  return (
     <Provider
        value={{
          players,
          setPlayers,
          revealAnswer,
          loading,
          setLoading,
          room,
          setRoom,
          playlists,
          tracks,
          setTracks,
          setPlaylists,
          socketInstructionsComplete,
          host,

        }}
      >
       <Routes />
    </Provider>
  );
};

export default ProviderComponent;