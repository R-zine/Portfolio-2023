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
    text-shadow: 30px 0px 5px white;
  }
  @media screen and (max-width: 1250px) {
    display: none;
  }
`;

export const FooterText = styled.div`
  padding: 0.5vh;
  padding-right: 2vh;
  border-top: 2px solid white;
  border-color: ${(props) => (props.dark ? "black" : "white")};
  font-size: 1.8vmin;
  text-shadow: ${(props) => `1px 0px 5px ${props.dark ? "black" : "white"}`};
  transition: 500ms;
  color: ${(props) => (props.opacity ? "white" : "#FFFFFF00")};
  display: ${(props) => (props.opacity ? "flex" : "none")};
  min-width: 6vmax;
  text-align: center;
  @media screen and (max-width: 1700px) {
    font-size: 16px;
  }
`;

export const FooterTail = styled.div`
  width: 40px;
  transform: skew(135deg);
  border-right: 2px solid white;
  border-color: ${(props) => (props.dark ? "black" : "white")};
  margin-bottom: -2px;
  margin-right: 1.5vh;
`;
