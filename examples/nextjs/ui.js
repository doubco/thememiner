import { ThemeMiner } from "theme-miner";

const family = {
  default: `"Inter", sans-serif`,
  display: `"Doub.t Normal", sans-serif`,
  mono: `"JetBrains Mono", monospace`,
};

// palette
const black = {
  "sh-2": "#444",
  "sh-1": "#333",
  "sh+0": "#222",
  "sh+1": "#111",
  "sh+2": "#000",
};

const white = {
  "sh-2": "#efefef",
  "sh-1": "#eaeaea",
  "sh+0": "#e4e4e4",
  "sh+1": "#dedede",
  "sh+2": "#d9d9d9",
};

const primary = {
  "sh-2": "#3b70d9",
  "sh-1": "#2963d7",
  "sh+0": "#255BC7",
  "sh+1": "#2253b6",
  "sh+2": "#1f4ba4",
};

// tokens
const tokens = {
  palette: {
    black: { ...black, contrast: { ...white } },
    white: { ...white, contrast: { ...black } },
    primary: { ...primary, contrast: { ...white } },
  },
  opacity: {
    "op+0": 1,
    "op-1": 0.8,
    "op-2": 0.6,
    "op-3": 0.4,
    "op-4": 0.2,
  },
  depth: {
    "de+0": [
      {
        color: "#000",
        offset: {
          width: 0,
          height: 0,
        },
        opacity: 0,
        radius: 0,
        elevation: 0,
      },
    ],
    "de+1": [
      {
        color: "#000",
        offset: {
          width: 0,
          height: 4,
        },
        opacity: 0.125,
        radius: 4,
        elevation: 8,
      },
    ],
    "de+2": [
      {
        color: "#000",
        offset: {
          width: 0,
          height: 8,
        },
        opacity: 0.25,
        radius: 8,
        elevation: 16,
      },
    ],
    "de+3": [
      {
        color: "#000",
        offset: {
          width: 0,
          height: 16,
        },
        opacity: 0.5,
        radius: 16,
        elevation: 32,
      },
    ],
  },
  weight: {
    "we-2": 200,
    "we-1": 300,
    "we+0": 400,
    "we+1": 500,
    "we+2": 600,
  },
  typography: {
    default: {
      "ty-2": { family: family.default, size: 12, height: 16 },
      "ty-1": { family: family.default, size: 16, height: 24 },
      "ty+0": { family: family.default, size: 24, height: 32 },
      "ty+1": { family: family.default, size: 32, height: 48 },
      "ty+2": { family: family.default, size: 48, height: 64 },
    },
    display: {
      "ty-2": { family: family.display, size: 12, height: 16 },
      "ty-1": { family: family.display, size: 16, height: 24 },
      "ty+0": { family: family.display, size: 24, height: 32 },
      "ty+1": { family: family.display, size: 32, height: 48 },
      "ty+2": { family: family.display, size: 48, height: 64 },
    },
    mono: {
      "ty-2": { family: family.mono, size: 12, height: 16 },
      "ty-1": { family: family.mono, size: 16, height: 24 },
      "ty+0": { family: family.mono, size: 24, height: 32 },
      "ty+1": { family: family.mono, size: 32, height: 48 },
      "ty+2": { family: family.mono, size: 48, height: 64 },
    },
  },
  radius: {
    "ra+0": 0,
    "ra+1": 4,
    "ra+2": 8,
  },
  padding: {
    "sp+0": 0,
    "sp+1": 8,
    "sp+2": 12,
  },
  margin: {
    "sp+0": 0,
    "sp+1": 8,
    "sp+2": 16,
  },
};

// component variables
const button = {
  scale: {
    "sc-2": { height: 16 },
    "sc-1": { height: 24 },
    "sc+0": { height: 32 },
    "sc+1": { height: 48 },
    "sc+2": { height: 64 },
  },
};

const interactives = {
  typography: {
    options: ["default", "display", "mono"],
    default: "default",
    variants: {
      key: "size", // could be anything but be careful to don't overlap with other variants' or interactives' key
      options: ["ty-2", "ty-1", "ty+0", "ty+1", "ty+2"],
      default: "ty+0",
    },
  },
  opacity: {
    options: ["op+0", "op-1", "op-2", "op-3", "op-4"],
    default: "op+0",
  },
  radius: {
    options: ["ra+0", "ra+1", "ra+2"],
    default: "ra+0",
  },
  depth: {
    options: ["de+0", "de+1", "de+2", "de+3"],
    default: "de+0",
  },
  scale: {
    options: ["sc-2", "sc-1", "sc+0", "sc+1", "sc+2"],
    // options could be anything logically ordered.
    // options: ["xsmall", "small", "medium", "large", "xlarge"],
    default: "sc+0",
  },
  palette: {
    options: ["black", "white", "primary"],
    default: "primary",
    variants: {
      key: "shade",
      // variant options also could be anything logically ordered.
      options: ["sh-2", "sh-1", "sh+0", "sh+1", "sh+2"],
      default: "sh+0",
    },
  },
  margin: {
    options: ["sp+0", "sp+1", "sp+2"],
    default: "sp+0",
  },
  padding: {
    options: ["sp+0", "sp+1", "sp+2"],
    default: "sp+0",
  },
};

const options = {
  useOptions: false,
  useVariants: false,
  paletteKey: "palette",
  properties: ["$debug"],
  defaultTheme: "white",
};

const ui = new ThemeMiner({
  theme: {
    ...tokens,
    tokens,
    button,
  },
  interactives,
  options,
  processTheme: (instance, nextTheme) => {
    const newTheme = { ...instance.props.theme };

    // alter theme properties if there is some theme/mode specific changes on tokens or any other variables
    // if (nextTheme === "white") {
    //   // update interactives' scopes
    //   ["button", "title"].forEach((k) => {
    //     newTheme[k] = { ...newTheme[k], foo: "bar" };
    //   });
    // }

    return newTheme;
  },
});

export const UI = ui;
