const debug = require("debug")("zapperment:x-toucher:mark-current-scene");

function markCurrentScene() {
  debug(`Going to mark current scene ${this.currentSceneNumber}`)
}

module.exports = markCurrentScene;
