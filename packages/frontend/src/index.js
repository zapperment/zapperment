import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import Amplitude from "amplitudejs";
import { getIcecastUrl, isIcecastActive } from "./utils";

const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

ReactDOM.render(<App />, document.getElementById("root"));

if (isIcecastActive()) {
  Amplitude.init({
    songs: [
      {
        url: `${getIcecastUrl()}/stream.ogg`,
        live: true
      }
    ],
    preload: "none"
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
