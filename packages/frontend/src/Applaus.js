import React from 'react';
import './Applaus.css';

export default () => {
  const horizontalPosition = `${Math.floor(Math.random() * 100)  + 1}vw`;
  return (
    <div className="emoji" style={{ left: horizontalPosition }}>
      👏🏼
    </div>
  );
};
