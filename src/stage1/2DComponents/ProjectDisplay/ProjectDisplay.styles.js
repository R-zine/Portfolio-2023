import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";

const glitchBorder = keyframes`
    0%   {transform: translate(-2px, 2px);}
    1%  {transform: translate(-2px, -2px);
    border-color: red}
    2%  {transform: translate(2px, 2px) skewX(2deg);}
    4%  {transform: translate(2px, -2px);
    border-color: cyan}
    6%  {transform: translate(-2px, 2px);}
    7% {transform: translate(0, 0); border-color: white}`;

const pathAnime = keyframes`
    0% {
    clip-path: polygon(
      0% 43%,
      83% 43%,
      83% 22%,
      23% 22%,
      23% 24%,
      91% 24%,
      91% 26%,
      18% 26%,
      18% 83%,
      29% 83%,
      29% 17%,
      41% 17%,
      41% 39%,
      18% 39%,
      18% 82%,
      54% 82%,
      54% 88%,
      19% 88%,
      19% 4%,
      39% 4%,
      39% 14%,
      76% 14%,
      76% 52%,
      23% 52%,
      23% 35%,
      19% 35%,
      19% 8%,
      36% 8%,
      36% 31%,
      73% 31%,
      73% 16%,
      1% 16%,
      1% 56%,
      50% 56%,
      50% 8%
    );
  }

  5% {
    clip-path: polygon(
      0% 29%,
      44% 29%,
      44% 83%,
      94% 83%,
      94% 56%,
      11% 56%,
      11% 64%,
      94% 64%,
      94% 70%,
      88% 70%,
      88% 32%,
      18% 32%,
      18% 96%,
      10% 96%,
      10% 62%,
      9% 62%,
      9% 84%,
      68% 84%,
      68% 50%,
      52% 50%,
      52% 55%,
      35% 55%,
      35% 87%,
      25% 87%,
      25% 39%,
      15% 39%,
      15% 88%,
      52% 88%
    );
  }

  30% {
    clip-path: polygon(
      0% 53%,
      93% 53%,
      93% 62%,
      68% 62%,
      68% 37%,
      97% 37%,
      97% 89%,
      13% 89%,
      13% 45%,
      51% 45%,
      51% 88%,
      17% 88%,
      17% 54%,
      81% 54%,
      81% 75%,
      79% 75%,
      79% 76%,
      38% 76%,
      38% 28%,
      61% 28%,
      61% 12%,
      55% 12%,
      55% 62%,
      68% 62%,
      68% 51%,
      0% 51%,
      0% 92%,
      63% 92%,
      63% 4%,
      65% 4%
    );
  }

  45% {
    clip-path: polygon(
      0% 33%,
      2% 33%,
      2% 69%,
      58% 69%,
      58% 94%,
      55% 94%,
      55% 25%,
      33% 25%,
      33% 85%,
      16% 85%,
      16% 19%,
      5% 19%,
      5% 20%,
      79% 20%,
      79% 96%,
      93% 96%,
      93% 50%,
      5% 50%,
      5% 74%,
      55% 74%,
      55% 57%,
      96% 57%,
      96% 59%,
      87% 59%,
      87% 65%,
      82% 65%,
      82% 39%,
      63% 39%,
      63% 92%,
      4% 92%,
      4% 36%,
      24% 36%,
      24% 70%,
      1% 70%,
      1% 43%,
      15% 43%,
      15% 28%,
      23% 28%,
      23% 71%,
      90% 71%,
      90% 86%,
      97% 86%,
      97% 1%,
      60% 1%,
      60% 67%,
      71% 67%,
      71% 91%,
      17% 91%,
      17% 14%,
      39% 14%,
      39% 30%,
      58% 30%,
      58% 11%,
      52% 11%,
      52% 83%,
      68% 83%
    );
  }

  76% {
    clip-path: polygon(
      0% 26%,
      15% 26%,
      15% 73%,
      72% 73%,
      72% 70%,
      77% 70%,
      77% 75%,
      8% 75%,
      8% 42%,
      4% 42%,
      4% 61%,
      17% 61%,
      17% 12%,
      26% 12%,
      26% 63%,
      73% 63%,
      73% 43%,
      90% 43%,
      90% 67%,
      50% 67%,
      50% 41%,
      42% 41%,
      42% 46%,
      50% 46%,
      50% 84%,
      96% 84%,
      96% 78%,
      49% 78%,
      49% 25%,
      63% 25%,
      63% 14%
    );
  }

  90% {
    clip-path: polygon(
      0% 41%,
      13% 41%,
      13% 6%,
      87% 6%,
      87% 93%,
      10% 93%,
      10% 13%,
      89% 13%,
      89% 6%,
      3% 6%,
      3% 8%,
      16% 8%,
      16% 79%,
      0% 79%,
      0% 99%,
      92% 99%,
      92% 90%,
      5% 90%,
      5% 60%,
      0% 60%,
      0% 48%,
      89% 48%,
      89% 13%,
      80% 13%,
      80% 43%,
      95% 43%,
      95% 19%,
      80% 19%,
      80% 85%,
      38% 85%,
      38% 62%
    );
  }

  1%,
  7%,
  33%,
  47%,
  78%,
  93% {
    clip-path: none;
  }`;

const fontAnime = keyframes`
   0% {
    font-weight: 100;
    color: #e0287d;
    filter: blur(3px);
  }

  20% {
    font-weight: 500;
    color: #fff;
    filter: blur(0);
  }

  50% {
    font-weight: 300;
    color: #1bc7fb;
    filter: blur(2px);
  }

  60% {
    font-weight: 700;
    color: #fff;
    filter: blur(0);
  }

  90% {
    font-weight: 500;
    color: #e0287d;
    filter: blur(6px);
  }`;

const movementAnime = keyframes`
   0% {
    top: 0px;
    left: -20px;
  }

  15% {
    top: 10px;
    left: 10px;
  }

  60% {
    top: 5px;
    left: -10px;
  }

  75% {
    top: -5px;
    left: 20px;
  }

  100% {
    top: 10px;
    left: 5px;
  }`;

export const Container = styled.div`
  position: fixed;
  width: ${(props) => props.width + "vw"};
  height: ${(props) => props.height + "vh"};
  top: ${(props) => props.top + "vh"};
  left: ${(props) => props.left + "vw"};
  z-index: 100;
  border: 2px solid white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #00000099;
  animation: ${glitchBorder} 3s ease infinite;
  animation-play-state: ${(props) => (props.isHovered ? "paused" : "running")};
  animation-delay: ${(props) => (props.delay ? props.delay : 0)}s;
  cursor: none;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  min-height: 4vh;
`;

export const Title = styled.div`
  width: 100%;
  font-size: 1.5vw;
  text-align: left;
  text-indent: 1vw;

  animation: ${pathAnime} 5s step-end infinite,
    ${fontAnime} 4s step-end infinite, ${movementAnime} 2s step-end infinite;
  animation-delay: ${(props) => (props.delay ? props.delay : 0)}s;
`;

export const Tail = styled.div`
  width: ${(props) => props.width + "vw"};
  height: 1px;
  margin-right: 2vw;
  background-color: white;
`;

export const Description = styled.div`
  font-size: ${(props) => (props.isQuestion ? "5vw" : "1vw")};
  text-align: ${(props) => (props.isQuestion ? "center" : "left")};
  padding: 1vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: none;

  &:hover {
    animation: ${(props) =>
      css`
        ${pathAnime} 1s ${props.delay ? props.delay : 0}s step-end infinite
      `};
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const TechContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, min-max(50%, 1fr));
  font-size: 1vw;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  gap: 1vw;
  margin-bottom: ${(props) => (props.bottom ? props.bottom + "px" : 0)};
`;

export const Button = styled.div`
  font-size: 2vw;
  transition: 0.5s ease-in-out;

  &:hover {
    padding-left: ${(props) => (props.type ? "0px" : "20px")};
    padding-right: ${(props) => (props.type ? "20px" : "0px")};
    text-shadow: ${(props) =>
      props.type ? "20px 0px 5px white" : "-20px 0px 5px white"};
  }
`;

export const QuestionMark = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5vw;
  width: 100%;
  height: 100%;
`;

export const Image = styled.img`
  width: 95%;
  height: 95%;
  object-fit: contain;
  filter: grayscale(80%);
`;

export const CursorReplace = styled.div`
  position: fixed;
  top: ${(props) => props.top + "vh"};
  left: ${(props) => props.left + "vw"};
  border: 1px solid white;
  font-weight: bold;
  z-index: 200;
  color: white;
  padding: 10px;
  background-color: #00000099;
`;

export const MenuButtonContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  color: white;
  display: flex;
  &:hover > div {
    text-indent: 30px;
    cursor: pointer;
    text-shadow: -30px 0px 5px white;
  }
`;

export const MenUButton = styled.div`
  padding: 10px;
  padding-right: 30px;
  border-bottom: 2px solid white;
  font-size: 1.5rem;
  text-shadow: 1px 0px 5px white;
  transition: 500ms;
`;

export const MenuButtonTail = styled.div`
  width: 40px;
  transform: skew(135deg);
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  margin-bottom: -2px;
  margin-left: -14px;
`;

export const Back = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: black;
  z-index: 250;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.flipped ? "50vw" : "60vw")};
  writing-mode: ${(props) => (props.flipped ? "vertical-rl" : "auto")};
  animation: ${pathAnime} 5s step-end infinite,
    ${fontAnime} 4s step-end infinite, ${movementAnime} 2s step-end infinite;
`;
