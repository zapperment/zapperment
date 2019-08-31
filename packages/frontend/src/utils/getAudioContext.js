export default () => {
  const MyAudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new MyAudioContext();
  const analyser = audioContext.createAnalyser();
  return { audioContext, analyser };
};
