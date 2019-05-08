import React, { Component } from "react";
import io from "socket.io-client";
import Lamp from "./Lamp";
import ClapButton from "./ClapButton";

import styles from "./App.module.css";

const { protocol, hostname } = window.location;
const serverUrl = `${protocol}//${hostname}:3001`;
const socket = io(serverUrl);

class App extends Component {
  render() {
    return (
      <div className={styles.component}>
        <Lamp socket={socket} />

        <div className={styles.actions}>
          <ClapButton socket={socket} />
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
