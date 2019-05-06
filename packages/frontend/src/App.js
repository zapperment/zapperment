import React, { Component } from 'react';
import io from 'socket.io-client';
import Lamp from './Lamp';
import ClapButton from "./ClapButton";

import styles from './App.module.css';

const socket = io('http://localhost:3001');

class App extends Component {
  render() {
    return (
      <div className={styles.component}>
        <Lamp socket={socket} />

        <div className={styles.actions}>
          <ClapButton socket={socket} />
        </div>

      </div>
    );
  }
}

export default App;
