function convertBytesArray(data) {
  let prev = null;
  const result = new Float32Array(data.length / 2);
  let index = 0;
  for (const curr of data) {
    if (prev === null) {
      prev = curr;
    } else {
      result[index++] = convertBytes(prev, curr);
      prev = null;
    }
  }
  return result;
}

function convertBytes(a, b) {
  // converts a and b to int, range -32.768 to 32.767
  const signed16bitLittleEndian = a * 256 + b - 32768;
  // converts to float, range -1 to 1
  const float = signed16bitLittleEndian / 32768;
  return float
}

function deinterleave(data) {
  let left = new Float32Array(data.length / 2);
  let right = new Float32Array(data.length / 2);
  let counter = 0;
  let index = 0;
  for (const curr of data) {
    if (counter++ % 2 === 0) {
      left[index] = curr;
    } else {
      right[index] = curr;
      index++;
    }
  }
  return { left, right };
}

export default class {
  constructor() {
    this.nextTime = 0;
    this.audioContext = new AudioContext();
  }

  playCache(cache) {
    while (cache.length) {
      const source = this.audioContext.createBufferSource();
      source.buffer = cache.shift();
      source.connect(this.audioContext.destination);
      if (this.nextTime === 0) {
        // add a delay of 0.05 seconds
        this.nextTime = this.audioContext.currentTime + 0.05;
      }
      source.start(this.nextTime);
      // schedule buffers to be played consecutively
      this.nextTime += source.buffer.duration;
    }
  }

  createBufferFromChunk(chunk) {
    const convertedChunk = convertBytesArray(chunk);
    let { left, right } = deinterleave(convertedChunk);

    const buffer = this.audioContext.createBuffer(
      /* two channels (stereo) */
      2,
      /* length:
       * An integer representing the size of the buffer in sample-frames
       * (where each sample-frame is the size of a sample in bytes multiplied
       * by numOfChannels). To determine the length to use for a specific
       * number of seconds of audio, use numSeconds * (sampleRate *
       * numberOfChannels).
       */
      2048,
      44100
    );
    buffer.copyToChannel(left, 0);
    buffer.copyToChannel(right, 1);
    return buffer;
  }
}
