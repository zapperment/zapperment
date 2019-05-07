import React, { useState, useEffect } from "react";
import { STATS_NEW_CLAP, STATS_RESET_CLAP } from "@zapperment/shared";
import cx from "classnames";
import icon from "./icons/clap.svg";

import styles from "./ClapButton.module.css";

export default ({ socket }) => {
  const [clapsCount, updateClapsCount] = useState(0);

  const handleClick = () => {
    socket.emit(STATS_NEW_CLAP);
    updateClapsCount(clapsCount + 1);
  };

  useEffect(() => {
    console.log(STATS_RESET_CLAP)
    const resetClaps = () => {
      updateClapsCount(0)
    };
    socket.on(STATS_RESET_CLAP, resetClaps);
    return () => socket.off(STATS_RESET_CLAP, resetClaps);
  });

  return (
    <button
      className={cx(styles.component)}
      onClick={handleClick}
    >
      <img src={icon} alt="clap" className={styles.icon} />
      <span className={styles.label}>{`${clapsCount} claps`}</span>
    </button>
  );
};
