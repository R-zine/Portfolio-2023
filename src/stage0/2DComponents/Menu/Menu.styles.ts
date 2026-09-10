import styled from "@emotion/styled";

interface DarkProps {
  dark?: boolean;
}

interface CurtainProps {
  expanded: boolean;
}

interface PositionedItemProps {
  top: number;
  left: number;
}

interface TailProps extends PositionedItemProps {
  width: number;
}

export const MenuButtonContainer = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1005;
  color: white;
  display: flex;
  border: 0;
  background: transparent;
  padding: 0;
  font: inherit;
  &:hover > div {
    text-indent: 30px;
    text-shadow: -30px 0px 5px white;
  }
`;

export const MenuButton = styled.div<DarkProps>`
  border-bottom: 2px solid white;
  border-color: ${(props) => (props.dark ? "black" : "white")};
  text-shadow: ${(props) => `1px 0px 5px ${props.dark ? "black" : "white"}`};
  transition: 500ms;
  color: ${(props) => (props.dark ? "black" : "white")};

  padding: 13px;
  padding-right: 39px;
  font-size: 19.5px;
`;

export const MenuButtonTail = styled.div<DarkProps>`
  transform: skew(135deg);
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  border-color: ${(props) => (props.dark ? "black" : "white")};
  margin-bottom: -2px;

  margin-left: -26px;
  width: 52px;
`;

export const Curtain = styled("div")<CurtainProps>`
  width: 100vw;
  height: ${(props) => (props.expanded ? "101vh" : "1vh")};
  position: fixed;
  top: 0;
  left: 0;
  background: #20202099;
  z-index: 999;
  margin-top: -1vh;
  transition: 2s cubic-bezier(0.26, 1.11, 0.71, 0.88);
`;

export const MenuItem = styled("button")<PositionedItemProps>`
  position: fixed;
  top: ${(props) => props.top}vh;
  left: ${(props) => props.left}vw;
  color: white;
  z-index: 1000;
  font-size: 1.3vmin;
  opacity: 0;
  border: 0;
  background: transparent;
  font-family: inherit;
  transition: color 200ms ease;

  &:hover,
  &:focus-visible {
    color: cyan;
  }
`;

export const Tail = styled("div")<TailProps>`
  height: 0.5px;
  width: ${(props) => props.width}vw;
  position: fixed;
  top: ${(props) => props.top}vh;
  left: ${(props) => props.left}vw;
  background-color: white;
  z-index: 1000;
  opacity: 0;
`;
