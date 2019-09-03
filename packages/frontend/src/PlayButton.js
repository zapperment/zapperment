import React from "react";
import cx from "classnames";
import { AudioContext } from "standardized-audio-context";
import icon from "./icons/play.svg";
import styles from "./PlayButton.module.css";
import { withWaveHeader } from "./utils";
import ss from "socket.io-stream";
import { PLAY } from "@zapperment/shared";

/* delay to avoid timing issues */
const delay = 1;
const samplingRate = 44100;
const chunkSize = 1024;
const chunkDuration = chunkSize / samplingRate;

export default ({ socket }) => {
  const handleClick = () => {
    const audioContext = new AudioContext();
    console.log('play!');
    socket.emit(PLAY);
    ss(socket).on("audio-stream", stream => {
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
  };
  return (
    <button className={cx(styles.component)} onClick={handleClick}>
      <img src={icon} alt="play" className={styles.icon}/>
      <span className={styles.label}>Play!</span>
    </button>
  );
};
