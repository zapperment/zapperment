import { STATS_NEW_CLAP, STATS_NEW_BOO } from "@zapperment/shared";

const emojis = {
  [STATS_NEW_CLAP]: [
    "🥳",
    "👍",
    "😎",
    "🥰",
    "🤩",
    "🙌",
    "👏",
    "🤠",
    "😻",
    "❤️"
  ],
  [STATS_NEW_BOO]: ["💩", "🤮", "🤫", "☠️", "🙀", "🤢", "😵", "🥵", "🤬", "💔"]
};

export default type =>
  emojis[type][Math.floor(Math.random() * emojis[type].length)];
