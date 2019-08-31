import React, { Component } from "react";
import io from "socket.io-client";
import ss from "socket.io-stream";
import Lamp from "./Lamp";
import ClapButton from "./ClapButton";
import Emoji from "./Emoji";
import SoundController from './SoundController';

import styles from "./App.module.css";
import BooButton from "./BooButton";

const { protocol, hostname } = window.location;
const serverUrl = `${protocol}//${hostname}:3001`;
const socket = io(serverUrl);

class App extends Component {
  state = { claps: 0, boos: 0 };

  soundController = new SoundController();

  handleClaps = claps => {
    this.setState({ claps });
  };

  handleBoos = boos => {
    this.setState({ boos });
  };

  componentDidMount() {
    ss(socket).on("audio-stream", stream => {
      this.soundController.nextTime = 0;
      let init = false;
      const audioCache = [];
      console.log("receiving audio stream");
      stream.on("data", data => {
        const buffer = this.soundController.createBufferFromChunk(data);
        audioCache.push(buffer);
        if (init || audioCache.length > 5) {
          init = true;
          this.soundController.playCache(audioCache);
        }
      });
      stream.on("end", () => console.log("end of audio stream"));
    });
  }

  render() {
    const { claps, boos } = this.state;
    return (
      <div className={styles.component}>
        <div className="claps">
          {[...new Array(claps)].map((e, i) => (
            <Emoji key={i} icon={"👏"} />
          ))}
        </div>

        <div className="boos">
          {[...new Array(boos)].map((e, i) => (
            <Emoji key={i} icon={"💩"} />
          ))}
        </div>

        <div className={styles.logo}>
          <img src="./zapperment-logo.png" />
        </div>
        <Lamp socket={socket} />
        <div className={styles.actions}>
          <ClapButton socket={socket} onClaps={this.handleClaps} />
          <BooButton socket={socket} onBoos={this.handleBoos} />
        </div>
      </div>
    );
  }
}

export default App;
