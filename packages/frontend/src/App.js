import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import { BEAT } from '@zapperment/shared';

const socket = io('http://localhost:3001');
socket.on(BEAT, () => console.log('beat'));

class App extends Component {
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
