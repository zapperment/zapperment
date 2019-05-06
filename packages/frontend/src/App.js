import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import Lamp from './Lamp';
import ClapButton from "./ClapButton";

const socket = io('http://localhost:3001');

class App extends Component {
  render() {
    return (
      <div className="App">
        <Lamp socket={socket} />

        <ClapButton socket={socket} />
      </div>
    );
  }
}

export default App;
