import styled from "@emotion/styled";

export const NothingIs = styled.div`
  position: fixed;
  top: 80vh;
  left: 0;
  width: 100vw;
  height: 300px;
  font-size: 120px;
  z-index: 1000;
  text-shadow: 2px 2px 10px black;
`;

export const EndScreen = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
  color: white;
  font-size: 120px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Black = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 1000;
`;
