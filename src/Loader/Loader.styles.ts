import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const pulse = keyframes`
0% {
  transform: scale(1);
}
18% {

}
65% {
  transform: scale(1.05);
  box-shadow: 0 0 25px 5px white;
}
76% {
  transform: scale(0.97);
  box-shadow: 0 0 20px 5px white;
}
86% {
  transform: scale(1.05);
  box-shadow: 0 0 25x 5px white;
}
100% {

  transform: scale(1);
}
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  z-index: 2000;
  flex-direction: column;
`;

export const Circle = styled.div`
  height: 3vw;
  width: 3vw;
  border: 3px solid white;
  border-radius: 50%;
  z-index: 2001;
  box-shadow: 0 0 20px 10px white;
  animation: ${pulse} 1.5s infinite;
  opacity: 0;
`;

export const Text = styled.div`
  text-shadow: 0vw 0 50px #ffffff11;
  font-size: 4vw;
  color: #ffffff00;
  z-index: 2001;
  text-transform: uppercase;
  opacity: 0;
  letter-spacing: 1vw;
  & span {
    font-size: 5vw;
  }
`;

export const Letter = styled.div`
  display: inline;
`;
