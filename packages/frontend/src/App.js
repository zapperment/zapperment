import React, { Component } from 'react';
import io from 'socket.io-client';
import Lamp from './Lamp';
import ClapButton from './ClapButton';
import Applaus from './Applaus';

import styles from './App.module.css';

const socket = io(':3001');

class App extends Component {
  state = { claps: 0 };

  handleClaps = claps => {
    this.setState({ claps });
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
          <ClapButton
            socket={socket}
            onClaps={this.handleClaps}
          />
        </div>
      </div>
    );
  }
}

export default App;
