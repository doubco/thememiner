import React from "react";
import styled from "styled-components";

// import { useUI } from "theme-miner/lib/react/styled-components";
import { useUI } from "../react/styled-components";

// styled components
import { UI } from "../ui";
import { useWorld } from "world-i18n/lib/react";
const { _: t, scoped, cond } = UI;
// const { _: tokens } = scoped("tokens");
const { _: button } = scoped("button");

const Viewport = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
`;

const Box = styled.div`
  border-radius: ${t`radius``px`};
  background: ${t`palette.active`};
  padding: ${t`padding``px`};
  margin: ${t`margin``px`};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Button = styled.div`
  cursor: pointer;
  margin: ${t`margin``px`};
  border-radius: ${t`radius``px`};
  background: ${t`palette.active`};
  &:hover {
    background: ${t`palette.sh-2`};
  }
  &:active {
    background: ${t`palette.sh+1`};
  }
  height: ${button`scale.height``px`};
  width: 200px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.span`
  color: ${cond({
    if: "props.$negative",
    then: t`palette.contrast.sh+0`,
    else: t`palette.active`,
  })};
  font-family: ${t`typography.active.family`};
  line-height: ${t`typography.active.height``px`};
  font-size: ${t`typography.active.size``px`};
  opacity: ${t`opacity`};
`;

// page
export default (props) => {
  const { t, locale } = useWorld();
  const ui = useUI(props);

  return (
    <Viewport {...ui.themeProps}>
      <Box {...ui.themeProps} $padding="sp+2" $radius="ra+2">
        <Text {...ui.themeProps} $negative $typography="display" $size="ty-2">
          {locale}
        </Text>

        <Text {...ui.themeProps} $negative $typography="display" $size="ty+2">
          {t("hello")}
        </Text>

        <Text $negative {...ui.themeProps} $size="ty-1" $opacity="op-2">
          {t("hello-description")}
        </Text>

        <Button $margin="sp+2" $radius="ra+1">
          <Text $negative {...ui.themeProps} $size="ty-2">
            {t("click-me")}
          </Text>
        </Button>
      </Box>
    </Viewport>
  );
};
