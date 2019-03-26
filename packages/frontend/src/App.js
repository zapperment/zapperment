import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import { BEAT } from '@zapperment/shared';
import Lamp from './Lamp';

const socket = io('http://localhost:3001');

class App extends Component {
  render() {
    return (
      <div className="App">
        <Lamp socket={socket} />
      </div>
    );
  }
}

export default App;
