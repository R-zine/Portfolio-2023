import styled from "@emotion/styled";

export const FooterContainer = styled.div`
  position: fixed;
  top: 96vh;
  left: 90vw;
  height: 3vh;
  width: 10vw;
  z-index: 1005;
  color: white;
  display: flex;
  flex-direction: row-reverse;
  &:hover > div {
    cursor: pointer;
    text-shadow: 30px 0px 5px white;
  }
`;

export const FooterText = styled.div`
  padding: 10px;
  padding-right: 30px;
  border-top: 2px solid white;
  border-color: ${(props) => (props.dark ? "black" : "white")};
  font-size: 1.5rem;
  text-shadow: ${(props) => `1px 0px 5px ${props.dark ? "black" : "white"}`};
  transition: 500ms;
  color: ${(props) => (props.opacity ? "white" : "#FFFFFF00")};
  display: ${(props) => (props.opacity ? "flex" : "none")};
  min-width: 5vw;
  text-align: center;
`;

export const FooterTail = styled.div`
  width: 40px;
  transform: skew(135deg);
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  border-color: ${(props) => (props.dark ? "black" : "white")};
  margin-bottom: -2px;
  margin-right: 20px;
`;
