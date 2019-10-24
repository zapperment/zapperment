import React, { useState } from 'react';
import styles from './Emoji.module.css';

const minSize = 4;
const maxSize = 8;

export default ({ icon }) => {
  const defaultPosition = `${Math.floor(Math.random() * 100) + 1}vw`;
  const [horizontalPosition] = useState(defaultPosition);

  const defaultSize = `${Math.floor(Math.random() * maxSize) + minSize}vw`;
  const [fontSize] = useState(defaultSize);

  return (
    <span
      className={styles.component}
      role="img"
      aria-label="emoji"
      style={{ fontSize, left: horizontalPosition }}
    >
      {icon}
    </span>
  );
};
