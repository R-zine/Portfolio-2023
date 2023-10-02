import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const glitchBorder = keyframes`
    0%   {transform: translate(-2px, 2px);}
    1%  {transform: translate(-2px, -2px);
    border-color: red}
    2%  {transform: translate(2px, 2px) skewX(2deg);}
    4%  {transform: translate(2px, -2px);
    border-color: cyan}
    6%  {transform: translate(-2px, 2px);}
    7% {transform: translate(0, 0); border-color: white}`;

export const ScrollDown = styled.div`
  position: fixed;
  width: 10vw;
  height: 5vh;
  top: 89vh;
  left: 45vw;
  display: flex;
  flex-direction: column;
  z-index: 1005;
  color: white;
  font-size: 2vh;
  align-items: center;
  justify-content: space-between;
  opacity: 0;

  & > div > svg {
    filter: invert(100%);
  }
`;

export const Tile = styled.div`
  position: fixed;
  top: ${(props) => (props.top ? `${props.top}vh` : 0)};
  left: ${(props) => (props.left ? `${props.left}vw` : 0)};
  background-color: black;
  z-index: ${(props) => (props.zIndex ? props.zIndex : 1000)};
  color: white;
  width: ${(props) => (props.width ? props.width : 15)}vw;
  height: ${(props) => (props.height ? props.height : 12)}vh;
  border: 2px solid white;
  border-radius: 4px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : 3)}vw;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.opacity ? "1" : "0")};
  text-transform: uppercase;
  animation: ${glitchBorder} 3s ease infinite;
  animation-delay: ${(props) => (props.animeDelay ? props.animeDelay : 0)}s;
  animation-play-state: paused;

  cursor: none;
  & span {
    font-size: 4vw;
    margin-bottom: 0.5vw;
  }
  &:hover {
  }
`;

export const NoOverflow = styled.div`
  position: fixed;
  width: 50vw;
  height: 10vw;
  top: 10vh;
  left: ${(props) => (props.left ? 0 : 50)}vw;
  z-index: 1000;
  clip: rect(auto, auto, auto, auto);
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    .rowcontainer {
      clip: auto;
      -webkit-mask-image: -webkit-linear-gradient(
        top,
        #ffffff 0%,
        #ffffff 100%
      );
    }
  }
`;

export const SlidingText = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-top: 48vh;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 12vh;
  }
`;

export const Curtain = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 0;
  background-color: black;
  z-index: 1002;
`;

export const ToolsTrade = styled.div`
  display: none;
  height: 80vh;
  width: 80vw;
  position: fixed;
  top: 10vh;
  left: 10vw;
  z-index: 1003;
  align-items: center;
  justify-content: center;
`;

export const ToolsText = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    color: white;
    font-size: 10vh;
    opacity: 0;
  }
`;

export const Stack = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 1002;
  color: white;
  display: none;
  align-items: center;
  justify-content: center;
  font-size: 20vh;
`;

export const EndTile = styled(Tile)({
  display: "none",
});
