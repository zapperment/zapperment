import React, { useState } from 'react';
import './Emoji.css';

export default ({ icon }) => {
  const defaultPosition = `${Math.floor(Math.random() * 100) + 1}vw`;
  const [horizontalPosition] = useState(defaultPosition);
  return (
    <span
      className="emoji"
      role="img"
      aria-label="emoji"
      style={{ left: horizontalPosition }}
    >
      {icon}
    </span>
  );
};
