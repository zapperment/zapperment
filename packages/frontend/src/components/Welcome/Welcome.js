import React, { useState } from "react";
import styles from "./Welcome.module.css";
import { Play } from "../buttons";
import cx from "classnames";

export default ({ socket }) => {
  const [isDismissed, dismiss] = useState(false);
  return (
    <div className={cx(styles.component, { [styles.dismissed]: isDismissed })}>
      <div>
        <div>
          <div className={styles.introText}>
            <h1>Hi, I'm Zapperment!</h1>
            <p>
              I'll play smooth background music for you to use for focusing and
              concentrating at work. If you like what you hear, give me some
              applause with the clap button – if you don't, give me a thumbs
              down. I'm remixing the music based on your feedback!
            </p>
            <h2>Ready to get zapped?</h2>
            <Play socket={socket} onPlay={() => dismiss(true)}/>
          </div>
        </div>
      </div>
    </div>
  );
};
