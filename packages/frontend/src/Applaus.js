import React, { useState } from 'react';
import './Applaus.css';

export default () => {
  const defaultPosition = `${Math.floor(Math.random() * 100) + 1}vw`;
  const [horizontalPosition] = useState(defaultPosition);
  return (
    <span
      className="emoji"
      role="img"
      aria-label="applaus"
      style={{ left: horizontalPosition }}
    >
      👏🏼
    </span>
  );
};
