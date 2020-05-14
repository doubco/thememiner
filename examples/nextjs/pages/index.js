import React from "react";
import styled from "styled-components";

import { useUI } from "theme-miner/lib/react/styled-components";
// import { useUI } from "../theme-miner/react/styled-components";

// styled components
import { UI } from "../ui";
import { useWorld } from "world-i18n/lib/react";
const { _: t, scoped, cond, mixin } = UI;
const { _: button } = scoped("button");

const Viewport = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
  /* if mixin doesn't need or use the interactives, you need the run the under function like below */
  ${mixin("debug")()}
`;

const Box = styled.div`
  border-radius: ${t`radius.active``px`};
  background: ${t`palette.active`};
  padding: ${t`padding.active``px`};
  margin: ${t`margin.active``px`};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Button = styled.div`
  cursor: pointer;
  margin: ${t`margin.active``px`};
  border-radius: ${t`radius.active``px`};

  background: ${mixin`paint``palette.active`};
  color: ${mixin`paintFG``palette.active`};

  &:hover {
    background: ${mixin`asHover``palette.active`};
  }
  &:active {
    background: ${mixin`asActive``palette.active`};
  }

  height: ${button`scale.active.height``px`};

  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.span`
  color: ${cond({
    // check the documentation for other usage
    if: "props.$inherit",
    then: null,
    else: mixin`paint``palette.active`,
  })};
  font-family: ${t`typography.active.family`};
  line-height: ${t`typography.active.height``px`};
  font-size: ${t`typography.active.size``px`};
  opacity: ${t`opacity.active`};
`;

const ButtonDemo = (props) => {
  const { t, locale } = useWorld();
  const ui = useUI(props);

  // ui.props has special object '__active' which includes all processed verisons of all theme-miner props
  // this is for performans reasons
  // when you try to alter it you have to tell theme-miner to ignore previous processed data and re-run by adding
  // ui.props._safe instead of ui.props
  // alternatively depens on the use case you can use

  // ui.props._local instead of ui.props => this will return only the local props data
  // ui.props._glocal instead of ui.props => this will return only the glocal props data e.g. ThemeMiner.properties
  // ui.props._interactives instead of ui.props => this will return only the interactives props data

  // or
  // you could just simple wont use it at all

  return (
    <Button
      // this will pass all theme-miner related props to this component
      {...ui.props._interactives}
      // this will get the current shade and overwrite it with lighter one.
      $shade={ui.closest("palette.shade", -2)}
      // this will remove the cache.

      $margin="sp+2"
      $radius="ra+1"
    >
      <Text
        // you can use more convenient but a bit expensive version of ui.props
        // __active object is not included so it won't used cache
        {...ui.props._clean}
        $negative
        $size="ty-2"
      >
        {t("click-me")}
      </Text>
    </Button>
  );
};

// page
export default (props) => {
  const { t, locale } = useWorld();
  const ui = useUI(props);

  return (
    <Viewport {...ui.props._theme}>
      <Box {...ui.props._theme} $padding="sp+2" $radius="ra+2">
        <Button
          $margin="sp+2"
          $radius="ra+1"
          onClick={() => ui.setTheme("white")}
        >
          <Text $negative {...ui.props._theme} $size="ty-2">
            {t("white")}
          </Text>
        </Button>

        <Button
          $margin="sp+2"
          $radius="ra+1"
          onClick={() => ui.setTheme("black")}
        >
          <Text $negative {...ui.props._theme} $size="ty-2">
            {t("black")}
          </Text>
        </Button>

        <Text {...ui.props._theme} $negative $typography="display" $size="ty-2">
          {locale}
        </Text>

        <Text {...ui.props._theme} $negative $typography="display" $size="ty+2">
          {t("hello")}
        </Text>

        <Text $negative {...ui.props._theme} $size="ty-1" $opacity="op-2">
          {t("hello-description")}
        </Text>
        <ButtonDemo $shade={"sh+2"} />
        <Button $color="#ff0000" $margin="sp+2" $radius="ra+1">
          {/* this text will inherit the css color property from the parent, but default it will the default pallete active color  */}
          <Text $inherit $size="ty-2">
            {t("click-me")}
          </Text>
        </Button>
      </Box>
    </Viewport>
  );
};
