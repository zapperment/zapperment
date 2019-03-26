import React, { useState, useEffect } from "react";
import { BEAT } from "@zapperment/shared";
import cx from 'classnames';
import './Lamp.css';

const blinkTime = 100;

export default ({ socket }) => {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const blink = () => {
      setOn(true);
      setTimeout(() => setOn(false), blinkTime);
    };
    socket.on(BEAT, blink);
    return () => socket.off(BEAT, blink);
  });
  return <div className={cx('Lamp', { 'on': on })} />
};
