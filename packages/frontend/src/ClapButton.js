import React, { useState, useEffect, useMemo } from 'react';
import {
  STATS_NEW_CLAP,
  STATS_RESET_CLAP,
  STATS_NEW_SHARED_CLAPS,
} from '@zapperment/shared';
import cx from 'classnames';
import icon from './icons/clap.svg';

import styles from './ClapButton.module.css';
import Applaus from './Applaus';

export default ({ socket }) => {
  const [clapsCount, updateClapsCount] = useState(0);

  const handleClick = () => {
    socket.emit(STATS_NEW_CLAP);
    updateClapsCount(clapsCount + 1);
  };

  useEffect(() => {
    const resetClaps = () => {
      updateClapsCount(0);
    };
    const updateClaps = number => {
      updateClapsCount(number);
    };
    socket.on(STATS_RESET_CLAP, resetClaps);
    socket.on(STATS_NEW_SHARED_CLAPS, updateClaps);
    return () => {
      socket.off(STATS_RESET_CLAP, resetClaps);
      socket.off(STATS_NEW_SHARED_CLAPS, updateClaps);
    };
  });
  const memo =  useMemo(() => memo + clapsCount, []);
  console.log()
  return (
    <>
      
      <button className={cx(styles.component)} onClick={handleClick}>
        <img src={icon} alt="clap" className={styles.icon} />
        <span className={styles.label}>{`${clapsCount} claps`}</span>
      </button>
    </>
  );
};
