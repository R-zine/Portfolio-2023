import styled from "@emotion/styled";

const BlackDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  z-index: 100;
`;

export const Black = () => {
  return <BlackDiv />;
};
