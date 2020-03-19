import React, { useState, useEffect } from "react";
import { Provider } from "./context";
import {navigate} from 'hookrouter';
import initialState from './initialState'
import Routes from './routes'
import 'App.css'
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:9000');

const ProviderComponent = props => {  
  const [mousePos, setMousePos] = useState({x:0, y:0});
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState(false);
  const [host, setHost] = useState('http://192.168.1.131:9000');
  const [loading, setLoading] = useState(false);
  const [hostID, setHostID] = useState(false)
  const [ round, setRound ] = useState(0)
  const [update, setUpdate] = useState(0)
  const [me, setMe] = useState(false)

  useEffect(() => { 
    socket.on('success-joining', successJoining)
    socket.on('error-joining', errorJoining)
    socket.on('playlist-options', playlistOptions)
    socket.on('waiting', setWaiting)
    socket.on('send-tracks', receiveingTracks)
    return () => { 
      socket.removeListener('send-tracks', receiveingTracks)
      socket.removeListener('playlist-options', playlistOptions)
      socket.removeListener('waiting', setWaiting)
      socket.removeListener('player-joined', successJoining)
      socket.removeListener('host-room-generated', errorJoining)
      };
  },[])

  useEffect(() => {
    if (!hostID && !me){
      navigate('/')
    }
  },[])

  function successJoining(data){
    setHostID(data.hostID)
    console.log('dataplayer',data.player)
    setMe(data.player)
    navigate('/waiting-start')
    setLoading(false)
  }

  function errorJoining(){
    setLoading(false)
  }
  function receiveingTracks(data){
    setLoading(false)
    
    console.log('getting tracks')
    setTracks(data)
    setUpdate(update+1)
    navigate('/input')
  }

  function socketJoinRoom(data){
    socket.emit('player-connected', data)
  }

  function socketStartGame(){
    socket.emit('start-game',{room: hostID })
    navigate('/')
    setLoading(true)
  }
  function setWaiting(){
    console.log('setting waiting')
    setLoading(true)
  }
  function playlistOptions(data){
    console.log('getting playlist options', data)

    setPlaylists(data)
    navigate('/playlist')
    setLoading(false)
  }

  function getPlaylists(data){
    socket.emit('get-playlists', data)
  }
  function selectPlaylist(data){
    setLoading(true)
    let toSend = {
      room: hostID,
      playlistID: data
    }
    socket.emit('player-selected-playlist', toSend) 
  }

  function sendTrackResponse(data){
    setLoading(true)
    let toSend = {
      track: data,
      player: me,
      room: hostID,

    }
    socket.emit('player-track-response', toSend) 
  }


  return (
     <Provider
        value={{
          loading,
          setLoading,
          mousePos,
          setMousePos,
          playlists,
          tracks,
          update,
          setTracks,
          setPlaylists,
          host,
          socketJoinRoom,
          socketStartGame,
          getPlaylists,
          selectPlaylist,
          sendTrackResponse,
          round,
          setRound,
        }}
      >
       <Routes />
    </Provider>
  );
};

export default ProviderComponent;