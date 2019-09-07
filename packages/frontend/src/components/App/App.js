import { STATS_NEW_CLAP, STATS_NEW_BOO } from "@zapperment/shared";
import React, { Component } from "react";
import io from "socket.io-client";
import { getServerUrl } from "../../utils";
import Boo from "../buttons/Boo";
import Clap from "../buttons/Clap";
import Emoji from "../Emoji";
import Lamp from "../Lamp";
import Welcome from "../Welcome";
import styles from "./App.module.css";
import { getEmoji } from "./utils";

const socket = io(getServerUrl());

class App extends Component {
  state = {
    claps: 0,
    boos: 0,
    clapEmojis: [],
    booEmojis: [],
    showWelcome: true
  };

  createFeedbackHandler = type => count => {
    const countKey = type === STATS_NEW_BOO ? "boos" : "claps";
    const emojiKey = type === STATS_NEW_BOO ? "booEmojis" : "clapEmojis";
    const { [countKey]: prevCount, [emojiKey]: prevEmojis } = this.state;
    let emojis;
    const diff = count - prevCount;
    if (diff <= 0) {
      emojis = [];
    } else {
      emojis = [...prevEmojis];
      for (let i = 0; i < diff; i++) {
        emojis.push(
          <Emoji
            key={`${countKey}${Date.now() + Math.random()}`}
            icon={getEmoji(type)}
          />
        );
      }
    }
    this.setState({ [countKey]: count, [emojiKey]: emojis });
  };

  handleClaps = this.createFeedbackHandler(STATS_NEW_CLAP);

  handleBoos = this.createFeedbackHandler(STATS_NEW_BOO);

  render() {
    const { clapEmojis, booEmojis, showWelcome } = this.state;
    return (
      <>
        {showWelcome && <Welcome socket={socket} />}
        <div className={styles.component}>
          <div className="claps">{clapEmojis}</div>
          <div className="boos">{booEmojis}</div>
          <div className={styles.logo}>
            <img src="./zapperment-logo.png" alt="" />
          </div>
          <Lamp socket={socket} />
          <div className={styles.actions}>
            <Clap socket={socket} onClaps={this.handleClaps} />
            <Boo socket={socket} onBoos={this.handleBoos} />
          </div>
        </div>
      </>
    );
  }
}

export default App;
