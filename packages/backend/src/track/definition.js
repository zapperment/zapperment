const {
  required,
  optional,
  string,
  float,
  integer,
  oneOf
} = require("./utils");

module.exports = {
  meta: required({
    title: required(string),
    description: optional(string),
    artists: optional([
      {
        name: required(string),
        role: optional(string, "Producer"),
        url: optional(string)
      }
    ]),
    link: optional({
      url: required(string),
      text: required(string)
    }),
    copyright: optional(string),
    license: optional(string, "Creative Commons Attribution 4.0 International")
  }),
  tempo: required(float(1, 999)),
  barsPerLoop: optional(integer(1, 999), 4),
  beatsPerBar: optional(integer(1, 16), 4),
  channels: required([
    {
      meta: required({
        name: required(string),
        description: optional(string),
        color: optional(
          oneOf(
            "burgundy",
            "red",
            "orange",
            "brown",
            "ochre",
            "peach",
            "wheat",
            "tangerine",
            "pineapple",
            "lemon",
            "brightLime",
            "lightOlive",
            "mossGreen",
            "kellyGreen",
            "asparagus",
            "darkGreen",
            "camouflageGreen",
            "turquoise",
            "blueInGreen",
            "powderBlue",
            "lightBlue",
            "skyBlue",
            "steelBlue",
            "slateBlue",
            "darkBlue",
            "pink",
            "lilac",
            "plum",
            "neonViolet",
            "deepPurple",
            "graphite",
            "brightGrey"
          )
        )
      }),
      midi: required({
        channel: required(integer(1, 16)),
        bus: optional(oneOf("A", "B", "C", "D"), "A")
      })
      // playing: controllable(optional(boolean, true))
    }
  ])
};
