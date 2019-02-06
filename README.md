# ThemeMiner ⛏

ThemeMiner is the missing piece for styled-components.

It makes to create complex design systems with `styled-components` very easy and readable.

ThemeMiner will consume the `theme` provided with `<ThemeProvider />`.

## Install

`yarn add theme-miner` or `npm install theme-miner --save`

## Setup

theme.js

```js
import { ThemeMiner } from "theme-miner";

import { depth, colors, box } from "./constants";

export const theme = {
  button: {
    depth: depth, // we could still overwrite default options for this scope only.
    variant: colors, // we could still overwrite default options for this scope only.
    size: {
      small: {
        ...box.size.small,
        fontSize: 8
      },
      normal: {
        ...box.size.normal,
        fontSize: 14
      },
      large: {
        ...box.size.medium
        fontSize: 20
      }
    }
  }
};

// these are interactives, we will use it as variables
const interactives = {
  depth: {
    options: ["base", "flat", "raised", "overlay", "superior", "declaration"],
    default: "flat"
  },
  size: {
    options: ["small", "normal", "large"],
    default: "normal"
  },
  variant: {
    options: ["black", "white", "primary", "destructive", "positive"],
    default: "primary",
    variants: {
      key: "tone",
      options: ["lighter", "light", "main", "dark", "darker"],
      default: "main"
    }
  }
};

const options = {
  useTransient: true, // adds $ to interactives like variant becames $variant
  useOptions: true, // allow us to use $black addition to $variant="black"
  useVariants: true, // allow us to use $light addition to $tone="light"
  // PS: don't use same identifiers both inside options and variants
  properties: [
    // always will be included in uiProps
    "$color",
    "$passive",
    "$gutter",
    "$padding",
    "$radius",
    "$v",
    "$h"
  ]
};

const UI = new ThemeMiner({
  theme,
  interactives,
  options,
  mixins: {
    multiply: ui => {
      return (value, count) => {
        return `${value * count}`;
      };
    }
  }
});

export default UI;
```

App.js

```js
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MyApp {...this.props} />
    </ThemeProvider>
  );
};

export default App;
```

BaseComponent.js (recommended)

```js
import UI from "../theme";

const { properties, active, closest } = UI;

class BaseComponent extends React.Component {
  // clean props for to use in a styled component
  get ui() {
    const uiProps = properties(this.props, this.uiProps || []);
    return { ...uiProps, __active: this.active };
  }

  // helps find lower or higher option in a specific interactive
  closest(key, value, checkVariant) {
    return closest(
      key,
      checkVariant ? this.active[key].variant : this.active[key].key,
      value,
      checkVariant
    );
  }

  // active interactives for this instance
  get active() {
    return active(this.props);
  }
}

export default BaseComponent;
```

StyledButton.js

```js
import styled from "styled-components";

import UI from "../theme";
const { cond, is, scoped } = UI;
const { _, mixin } = scoped("button"); // _, mixin, calc could be scoped

export const StyledButton = styled.div`
  font-size: ${_`size.fontSize``px`};
  border-radius: ${_("size.radius")("px") /* we can use without template literals */};
  height: ${_`size.box.height`(height=> `${100/height}px`) /* or customize the output */};
  width: ${_`size.box.width``%`};
  background ${_`variant.active`};
  color ${_`variant.contrast`};
  padding: ${mixin("multiply", 2)`size.padding``px`}
  text-decoration: ${cond({
    if: is("props.active",true) // or "props.active" as a string,
    // we could do this too; if: or(is("props.$variant","positive"),"props.active")
    then: "underline",
    else: null // optional
  })};
`;

// PS: we can also consume theme without scoped like UI._`button.size.fontSize``px`

```

Button.js

```js
import BaseComponent from "../BaseComponent";
import StyledButton from "./StyledButton";
class Button extends BaseComponent {
  constructor(props) {
    super(props);
    this.uiProps = ["active"];
  }

  render() {
    // this.ui allow us to pass only props necessary for styled component
    return <StyledButton {...this.ui}>{this.props.title}</StyledButton>;
  }
}
```

Home.js

```js
import Button from "./Button";
export const Home = () => {
  return (
    <div>
      <Button $positive $large $light>
        Hello World
      </Button>
      or
      <Button $variant="positive" $size="large" $tone="light">
        Hello World
      </Button>
    </div>
  );
};
```

## Helpers

---

## Contribute

Pull requests are welcome and please submit bugs 🐛.

## Contact

- Follow [@doubco](https://twitter.com/doubco) on Twitter
- Follow [@doubco](http://facebook.com/doubco) on Facebook
- Follow [@doubco](http://instagram.com/doubco) on Instagram
- Email <mailto:hi@doub.co>
