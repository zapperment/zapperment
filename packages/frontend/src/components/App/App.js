import React, { Component } from "react";
import io from "socket.io-client";
import Boo from "../buttons/Boo";
import Clap from "../buttons/Clap";
import Emoji from "../Emoji";
import Lamp from "../Lamp";
import Welcome from "../Welcome";
import styles from "./App.module.css";
import { getServerUrl } from "../../utils";

const socket = io(getServerUrl());

class App extends Component {
  state = { claps: 0, boos: 0, showWelcome: true };

  handleClaps = claps => {
    this.setState({ claps });
  };

  handleBoos = boos => {
    this.setState({ boos });
  };

  render() {
    const { claps, boos, showWelcome } = this.state;
    return (
      <>
        {showWelcome && <Welcome socket={socket} />}
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
            <Clap socket={socket} onClaps={this.handleClaps} />
            <Boo socket={socket} onBoos={this.handleBoos} />
          </div>
        </div>
      </>
    );
  }
}

export default App;
