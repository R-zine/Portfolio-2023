import styled from "@emotion/styled";

export const MenuButtonContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1005;
  color: white;
  display: flex;
  &:hover > div {
    text-indent: 30px;
    text-shadow: -30px 0px 5px white;
  }
`;

export const MenUButton = styled.div`
  padding: 1vmin;
  padding-right: 3vmin;
  border-bottom: 2px solid white;
  border-color: ${(props) => (props.dark ? "black" : "white")};
  font-size: 1.5vmin;
  text-shadow: ${(props) => `1px 0px 5px ${props.dark ? "black" : "white"}`};
  transition: 500ms;
  color: ${(props) => (props.dark ? "black" : "white")};
`;

export const MenuButtonTail = styled.div`
  width: 4vmin;
  transform: skew(135deg);
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  border-color: ${(props) => (props.dark ? "black" : "white")};
  margin-bottom: -2px;
  margin-left: -2vmin;
`;

export const Curtain = styled("div")`
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

export const MenuItem = styled("div")`
  position: fixed;
  top: ${(props) => props.top}vh;
  left: ${(props) => props.left}vw;
  color: white;
  z-index: 1000;
  font-size: 1.3vmin;
  opacity: 0;
`;

export const Tail = styled("div")`
  height: 0.5px;
  width: ${(props) => props.width}vw;
  position: fixed;
  top: ${(props) => props.top}vh;
  left: ${(props) => props.left}vw;
  background-color: white;
  z-index: 1000;
  opacity: 0;
`;
