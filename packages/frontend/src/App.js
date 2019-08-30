import React, { Component } from "react";
import io from "socket.io-client";
import ss from "socket.io-stream";
import Lamp from "./Lamp";
import ClapButton from "./ClapButton";
import Emoji from "./Emoji";

import styles from "./App.module.css";
import BooButton from "./BooButton";

const { protocol, hostname } = window.location;
const serverUrl = `${protocol}//${hostname}:3001`;
const socket = io(serverUrl);
const soundController = {
  nextTime: 0,
  speakerContext: new AudioContext(),
  playCache(cache) {
    while (cache.length) {
      const source = soundController.speakerContext.createBufferSource();
      source.buffer = cache.shift();
      source.connect(soundController.speakerContext.destination);
      if (soundController.nextTime === 0) {
        // add a delay of 0.05 seconds
        soundController.nextTime =
          soundController.speakerContext.currentTime + 0.05;
      }
      source.start(soundController.nextTime);
      // schedule buffers to be played consecutively
      soundController.nextTime += source.buffer.duration;
    }
  }
};

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
      soundController.nextTime = 0;
      let init = false;
      const audioCache = [];
      console.log("receiving audio stream");
      stream.on("data", data => {
        const array = new Float32Array(data);
        // const array = Float32Array.from(data);
        const buffer = soundController.speakerContext.createBuffer(
          1,
          2048,
          44100
        );
        buffer.copyToChannel(array, 0);
        audioCache.push(buffer);
        if (init || audioCache.length > 5) {
          init = true;
          soundController.playCache(audioCache);
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
