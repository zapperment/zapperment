import React, { useState } from "react";
import { STATS_CLAP } from "@zapperment/shared";
import cx from "classnames";
import "./ClapButton.css";

export default ({ socket }) => {
  const [clapsCount, updateClapsCount] = useState(0);

  const handleClick = () => {
    socket.emit(STATS_CLAP);
    updateClapsCount(clapsCount + 1);
  };

  return (
    <button
      className={cx("ClapButton")}
      onClick={handleClick}
    >{`Clap [${clapsCount}]`}</button>
  );
};
