import React, { useState } from "react";
import styles from "./Emoji.module.css";
import { getEmoji, getColor } from "./utils";

const minSize = 4;
const maxSize = 8;

export default ({ type }) => {
  const defaultPosition = `${Math.floor(Math.random() * 90) + 1}vw`;
  const [horizontalPosition] = useState(defaultPosition);

  const defaultSize = `${Math.floor(Math.random() * maxSize) + minSize}vw`;
  const [fontSize] = useState(defaultSize);

  const emoji = getEmoji(type);
  const color = getColor(type);

  return (
    <span
      className={styles.component}
      role="img"
      aria-label="emoji"
      style={{ fontSize, left: horizontalPosition, ...color }}
    >
      {emoji}
    </span>
  );
};
