import React, { Component } from "react";
import io from "socket.io-client";
import ss from "socket.io-stream";
import Lamp from "./Lamp";
import ClapButton from "./ClapButton";
import Emoji from "./Emoji";
import { getAudioContext, withWaveHeader } from "./utils";
import styles from "./App.module.css";
import BooButton from "./BooButton";

const { protocol, hostname } = window.location;
const serverUrl = `${protocol}//${hostname}:3001`;
const socket = io(serverUrl);

/* delay to avoid timing issues */
const delay = 1;
const samplingRate = 44100;
const chunkSize = 1024;
const chunkDuration = chunkSize / samplingRate;

class App extends Component {
  state = { claps: 0, boos: 0 };

  handleClaps = claps => {
    this.setState({ claps });
  };

  handleBoos = boos => {
    this.setState({ boos });
  };

  componentDidMount() {
    ss(socket).on("audio-stream", stream => {
      const audioContext = getAudioContext().audioContext;
      let nextTime = delay;
      console.log("receiving audio stream");
      stream.on("data", async data => {
        const audioBufferChunk = await audioContext.decodeAudioData(
          withWaveHeader(data)
        );
        const source = audioContext.createBufferSource();
        source.buffer = audioBufferChunk;
        source.connect(audioContext.destination);
        source.start(nextTime);
        nextTime += chunkDuration;
      });
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
          <img src="./zapperment-logo.png" alt="" />
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
