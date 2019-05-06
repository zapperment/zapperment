import React, { useState } from "react";
import { STATS_CLAP } from "@zapperment/shared";
import cx from "classnames";
import icon from "./icons/clap.svg";

import styles from "./ClapButton.module.css";

export default ({ socket }) => {
  const [clapsCount, updateClapsCount] = useState(0);

  const handleClick = () => {
    socket.emit(STATS_CLAP);
    updateClapsCount(clapsCount + 1);
  };

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
