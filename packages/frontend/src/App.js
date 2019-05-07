import React, { Component } from 'react';
import io from 'socket.io-client';
import Lamp from './Lamp';
import ClapButton from "./ClapButton";

import styles from './App.module.css';

const { protocol, hostname} = window.location;
const serverUrl = `${protocol}//${hostname}:3001`;
const socket = io(serverUrl);

class App extends Component {
  render() {
    return (
      <div className={styles.component}>
        <audio src={`${serverUrl}/stream.wav`} />
        <Lamp socket={socket} />

        <div className={styles.actions}>
          <ClapButton socket={socket} />
        </div>

      </div>
    );
  }
}

export default App;
