// import { ThemeMiner } from "theme-miner";
import ThemeMiner from "./theme-miner/ThemeMiner";

import { css } from "styled-components";
import tinycolor from "tinycolor2";

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

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

const spacing = {
  "sp+0": 0,
  "sp+1": 8,
  "sp+2": 16,
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
  spacing,
  padding: spacing,
  margin: spacing,
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
  spacing: {
    options: ["sp+0", "sp+1", "sp+2"],
    default: "sp+0",
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
  // globally auto passed properties
  properties: ["$debug"],
  theming: {
    default: "white",
    paletteKey: "palette",
    themes: {
      white: {
        default: true,
        mode: "light",
      },
      black: {
        mode: "dark",
      },
    },
  },
};

const ui = new ThemeMiner({
  theme: {
    ...tokens,
    tokens,
    button,
  },
  interactives,
  options,
  onGenerateTheme: (instance, nextTheme) => {
    let newTheme = { ...instance.props.theme };

    // alter theme properties if there is some theme/mode specific changes on tokens or any other variables
    // if (nextTheme === "white") {
    //   // update interactives' scopes
    //   ["button", "title"].forEach((k) => {
    //     newTheme[k] = { ...newTheme[k], foo: "bar" };
    //   });
    // }

    return newTheme;
  },
  mixins: {
    debug: (
      instance,
      props,
      { useProps, disco = false, style, width, color } = {},
    ) => {
      const styles = ["dashed", "dotted", "solid"];
      // When disco mode on you will get 'Warning: Prop `className` did not match. Server' error on client side
      const borderWidth = width || 2;
      const borderStyle = disco ? styles[random(0, 2)] : style || "solid";
      const borderColor = disco
        ? `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
        : color
        ? color
        : `red`;

      let nextValue = css`
        border: ${borderWidth}px ${borderStyle} ${borderColor};
      `;

      if (useProps && !p.$debug) {
        nextValue = "";
      }

      return nextValue;
    },
    asActive: (instance, props, value, diff = 1) => {
      const { theme, $negative, $color } = props;
      const palettes = theme.palette;

      // this is the default color
      let nextValue = value;

      if ($color) {
        if ($negative) {
          // reverse color if there is $negative in props
          // IMPROVE: we can calculate and select a different readable color when hover, will leave it like this for this example
          return tinycolor($color).getLuminance() > 0.5 ? "#000" : "#fff";
        } else {
          return tinycolor($color).darken(10 * Math.abs(diff));
        }
      } else {
        const { palette } = instance.active(props);
        const { key, variant } = palette;

        const nextVariant = instance.closest("palette", variant, diff, true);

        if ($negative) {
          nextValue = palettes[key].contrast[nextVariant];
        } else {
          nextValue = palettes[key][nextVariant];
        }
      }

      return nextValue;
    },
    // first 3 paramaters are coming from theme-miner, others are coming from your mixins paramaters e.g. mixin("asHover", -2)`palette.active`
    asHover: (instance, props, value, diff = -1) => {
      const { theme, $negative, $color } = props;
      const palettes = theme.palette;

      // this is the default color
      let nextValue = value;

      if ($color) {
        if ($negative) {
          // reverse color if there is $negative in props
          // IMPROVE: we can calculate and select a different readable color when hover, will leave it like this for this example
          return tinycolor($color).getLuminance() > 0.5 ? "#000" : "#fff";
        } else {
          return tinycolor($color).lighten(10 * Math.abs(diff));
        }
      } else {
        const { palette } = instance.active(props);
        const { key, variant } = palette;

        const nextVariant = instance.closest("palette", variant, diff, true);

        if ($negative) {
          nextValue = palettes[key].contrast[nextVariant];
        } else {
          nextValue = palettes[key][nextVariant];
        }
      }

      return nextValue;
    },
    paint: (instance, props, value, ...args) => {
      const { theme, $negative, $color } = props;
      const palettes = theme.palette;

      // this is the default color
      let nextValue = value;

      // support direct $color if there is $color in props
      if ($color) {
        if ($negative) {
          // reverse color if there is $negative in props
          return tinycolor($color).getLuminance() > 0.5 ? "#000" : "#fff";
        } else {
          return $color;
        }
      } else {
        const { palette } = instance.active(props);

        if ($negative) {
          // reverse color if there is $negative in props
          const { key, variant } = palette;
          nextValue = palettes[key].contrast[variant];
        }
      }

      return nextValue;
    },
    paintFG: (instance, props, value, ...args) => {
      const { theme, $color } = props;
      const palettes = theme.palette;

      const $negative = !props.$negative;

      // this is the default color
      let nextValue = value;

      // support direct $color if there is $color in props
      if ($color) {
        if ($negative) {
          // reverse color if there is $negative in props
          return tinycolor($color).getLuminance() > 0.5 ? "#000" : "#fff";
        } else {
          return $color;
        }
      } else {
        const { palette } = instance.active(props);

        if ($negative) {
          // reverse color if there is $negative in props
          const { key, variant } = palette;
          nextValue = palettes[key].contrast[variant];
        }
      }

      return nextValue;
    },
  },
});

export const UI = ui;
