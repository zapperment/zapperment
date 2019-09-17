import React from "react";
import cx from "classnames";
import icon from "./play.svg";
import styles from "./Play.module.css";

export default ({ onPlay }) => {
  const handleClick = () => {
    console.log("play!");
    onPlay();
  };
  return (
    <button className={cx(styles.component, "amplitude-play-pause")} onClick={handleClick}>
      <img src={icon} alt="play" className={styles.icon} />
      <span className={styles.label}>Play!</span>
    </button>
  );
};
