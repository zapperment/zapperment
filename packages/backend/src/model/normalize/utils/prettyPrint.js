const fmt = v => String(v).padStart(3);

module.exports = data =>
  data.reduce(
    (acc, { scene: { channels }, stats: { claps, boos } }, i, arr) =>
      `${acc}${"=".repeat(80)}
Item #${i}

| CHANNEL    | VOL | PITCH     | PAN       | BRG | DEC | EFFECTS               |
|            |     | MIN | MAX | LFT | RGT |     |     | DST | REV | ECO | SLP |
${channels.reduce(
  (
    acc2,
    {
      meta: { name },
      elements: {
        pitch,
        volume,
        pan,
        brightness,
        decay,
        effects: { distortion, reverb, echo, slap }
      }
    }
  ) =>
    `${acc2}| ${name.substring(0, 10).padEnd(10, " ")} | ${fmt(volume)} | ${
      pitch === null ? "N/A" : fmt(pitch.min)
    } | ${pitch === null ? "N/A" : fmt(pitch.max)} | ${fmt(pan.left)} | ${fmt(
      pan.right
    )} | ${fmt(brightness)} | ${fmt(decay)} | ${fmt(distortion)} | ${fmt(
      reverb
    )} | ${fmt(echo)} | ${fmt(slap)} |
`,
  ""
)}
${String(claps).padStart(3)} CLAPS ${"👏🏻".repeat(claps)}
${String(boos).padStart(3)} BOOS  ${"💩".repeat(boos)}${
        i === arr.length - 1 ? `\n${"=".repeat(80)}` : ""
      }
`,
    ""
  );
