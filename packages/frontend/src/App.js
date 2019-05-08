import React, { Component } from 'react';
import io from 'socket.io-client';
import Lamp from './Lamp';
import ClapButton from './ClapButton';
import Applaus from './Applaus';

import styles from './App.module.css';
import BooButton from './BooButton';

const { protocol, hostname } = window.location;
const serverUrl = `${protocol}//${hostname}:3001`;
const socket = io(serverUrl);

class App extends Component {
  state = { claps: 0, boos: 0 };

  handleClaps = claps => {
    this.setState({ claps });
  };

  handleBoos = boos => {
    this.setState({ boos });
  };

  render() {
    const { claps } = this.state;
    return (
      <div className={styles.component}>
        <div>
          {[...new Array(claps)].map((e, i) => (
            <Applaus key={i} />
          ))}
        </div>
        <Lamp socket={socket} />
        <div className={styles.actions}>
          <ClapButton socket={socket} onClaps={this.handleClaps} />
          <BooButton socket={socket} onBoos={this.handleBoos} />
        </div>
        <div className={styles.controls}>
          <audio controls autoPlay preload="none">
            <source src={`${serverUrl}/stream.mp3`} type="audio/mpeg" />
            <p>Oops – your browser doesn't support HTML5 audio!</p>
          </audio>
        </div>
      </div>
    );
  }
}

export default App;
