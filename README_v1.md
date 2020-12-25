# ThemeMiner ⛏

> ⚠️ THIS IS FOR V1 ONLY ⚠️

ThemeMiner is the missing piece for styled-components.

It makes it very easy and readable, to create complex design systems in `React` with `styled-components`.

ThemeMiner will consume the `theme` provided with `<ThemeProvider />`.

## Install

`yarn add theme-miner` or `npm install theme-miner --save`

## Setup

To manage your design system and all the other variables first we create a theme file.

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
  depth: { // or "myDepths"
    options: ["base", "flat", "raised", "overlay", "superior", "declaration"],
    default: "flat"
  },
  size: { // or "s"
    options: ["small", "normal", "large"],
    default: "normal"
  },
  variant: { // or "color"
    options: ["black", "white", "primary", "destructive", "positive"],
    default: "primary",
    variants: {
      key: "tone", // or "shade"
      options: ["lighter", "light", "main", "dark", "darker"],
      default: "main"
    }
  }
};

const options = {
  useTransient: true, // adds $ to interactives e.g. variant becames $variant
  useOptions: true, // allow us to use $black addition to $variant="black"
  useVariants: true, // allow us to use $light addition to $tone="light"
  // PS: don't use same identifiers both inside options and variants
  properties: [
    // always will be included in uiProps and passed to styled components
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

Now we can pass our theme file to the provider.

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

This step is very recommended but not mandatory. A base component will expose us some api e.g. `this.ui` or `this.closest`

BaseComponent.js

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
      checkVariant,
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
    if: is.eq("props.active",true) // or "props.active" or _`props.active` as a string,
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

## API

### Global Methods

#### scoped

creates scoped helpers from `theme.scope_name`

`scoped("scope_name")`

returns two helper

`{ _, mixin }`

#### style

returns resolved UI props and theme variables for styling

`` style(`buttons.size.padding`, ({ button, theme, active, props }) => {}) ``

#### \_

same as style

`` _`button.size.padding` ``

#### calc

calculates data in template literals, it's handy to use in conditions and unitless operations

`` calc(`${_`size.padding`} * 2`) ``

#### mixin

use global mixins defined in theme file.

`mixin("some_helper",1,2,3)("scope_name")(x=>{ // do something})`

#### cond

helps define conditions in styled-components

`cond({if: "props.active", then: "10px", else: "8px"})`

`cond({if: "props.active == true", then: "10px", else: "8px"})`

`cond({if: "!props.active", then: "10px", else: "8px"})`

`cond({if: "props.height > 10", then: "10px", else: "8px"})`

`` cond({if: _`props.height`, then: (p)=> p.height , else: "0"}) ``

`cond({if: is.ne("props.status","error"), then: "blue" , else: "red"})`

`cond({if: (p)=> p.height/2 == 10, then: "foo" , else: "bar"})`

`cond({if: and("props.active",is.eq("status","error")), then: "foo" , else: "bar"})`

### Helper Methods

#### active

return all active interactive keys and their variants if exists.

`active(this.props)`

#### properties

collect all interactive variables and specified props.

`properties(this.props, ["align","active","etc"])`

#### closest

collect all interactive variables and specified props.

`closest("size", active(this.props).size.key, -1)`

`closest("color", active(this.props).color, 1, true)`

`closest("color", active(this.props).color.variant, -1, true)`

### Scoped Methods

#### \_

same as global style or \_ but it is scoped, so there is no need for scope name in dot notation.

`` _`size.padding` ``

#### mixin

same as global mixins but scoped.

`` mixin`variant.active`(color=> transparentize(0.9,color)) ``

### Condition Methods

`or(a,b)` or helper for conditions

`and(a,b)` and helper for conditions

`is.eq(key,value)` checks if it is equal

`is.ne(key,value)` checks if it is not equal

`is.nset(key)` checks if it is not exists

`is.set(key)` checks if it is exists

`is.in(key,value)` checks if it is included

`is.nin(key,value)` checks if it is not included

`is.lt(key,value)` checks if it is little than

`is.lte(key,value)` checks if it is equal or little than

`is.gt(key,value)` checks if it is greater than

`is.gte(key,value)` checks if it is equal or greater than

`is.color(key)` checks if it is color

---

## Contribute

Pull requests are welcome and please submit bugs 🐛.

## Contact

- Follow [@doubco](https://twitter.com/doubco) on Twitter
- Follow [@doubco](http://facebook.com/doubco) on Facebook
- Follow [@doubco](http://instagram.com/doubco) on Instagram
- Email <mailto:hi@doub.co>
