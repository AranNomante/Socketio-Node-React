import React, { useEffect, useState } from 'react';
import io from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [dt, setDt] = useState('');

  // establish socket connection
  useEffect(() => {
    setSocket(io('http://10.100.7.245:4000'));
  }, []);

  // subscribe to the socket event
  useEffect(() => {
    if (!socket) return;
    socket.on('connect', () => {
      setSocketConnected(socket.connected);
      subscribeToDateEvent();
    });
    socket.on('disconnect', () => {
      setSocketConnected(socket.connected);
    });

    socket.on("getDate", data => {
      setDt(data);
    });
	socket.on('intervalError', data => { alert(data);});
  }, [socket]);

  // manage socket connection
  const handleSocketConnection = () => {
    if (socketConnected)
      socket.disconnect();
    else {
      socket.connect();
    }
  }

  // subscribe to socket date event
  const subscribeToDateEvent = (interval = 1000) => {
    socket.emit('subscribeToDateEvent', interval);
  }

  return (
    <div>
      <h2>Welcome to Socket.IO App! - <a href="https://www.cluemediator.com/" target="_blank">Clue Mediator</a></h2>

      <div><b>Connection status:</b> {socketConnected ? 'Connected' : 'Disconnected'}</div>
      <input
        type="button"
        style={{ marginTop: 10 }}
        value={socketConnected ? 'Disconnect' : 'Connect'}
        onClick={handleSocketConnection} />

      <div style={{ marginTop: 20 }}><b>Date: </b> {dt}</div>
    </div>
  );
}

export default App;