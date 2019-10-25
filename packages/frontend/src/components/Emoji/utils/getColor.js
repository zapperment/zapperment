import { STATS_NEW_CLAP, STATS_NEW_BOO } from "@zapperment/shared";

const colors = {
  [STATS_NEW_BOO]: {
    filter: "saturate(0) brightness(0.8)"
  },
  [STATS_NEW_CLAP]: {}
};

export default type => colors[type];
