import React, { useState, useEffect } from 'react';
import {
  STATS_NEW_BOO,
  STATS_RESET_BOO,
  STATS_NEW_SHARED_BOOS,
} from '@zapperment/shared';
import cx from 'classnames';
import icon from './boo.svg';
import styles from './Boo.module.css';

export default ({ socket, onBoos }) => {
  const [boosCount, updateBoosCount] = useState(0);

  const handleClick = () => {
    socket.emit(STATS_NEW_BOO);
    updateBoosCount(boosCount + 1);
  };

  useEffect(() => {
    const resetBoos = () => {
      updateBoosCount(0);
      onBoos(0);
    };
    const updateBoos = number => {
      updateBoosCount(number);
      onBoos(number);
    };
    socket.on(STATS_RESET_BOO, resetBoos);
    socket.on(STATS_NEW_SHARED_BOOS, updateBoos);

    return () => {
      socket.off(STATS_RESET_BOO, resetBoos);
      socket.off(STATS_NEW_SHARED_BOOS, updateBoos);
    };
  });

  return (
    <button className={cx(styles.component)} onClick={handleClick}>
      <img src={icon} alt="boo" className={styles.icon} />
      <span className={styles.label}>{`${boosCount} boos`}</span>
    </button>
  );
};
