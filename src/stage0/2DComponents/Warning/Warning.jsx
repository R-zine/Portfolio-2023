import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { triggerWarning } from "../../../app/mainSlice";

const Curtain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000066;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3000;
`;

const WarningContainer = styled.div`
  width: 40vw;
  height: 40vh;
  background-color: black;
  color: white;
  border: 3px solid white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 2vmin;
  padding: 2vmin;
`;

const ButtonCont = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Button = styled.div`
  border: 2px solid white;
  background-color: #1f1f1f;
  padding: 1vmin 3vmin;
  width: 15vmin;
  font-size: 1.5vmin;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-color: black;
    text-indent: 3vmin;
    text-shadow: -3vmin 0 10px white;
  }
`;

export const Warning = ({ reason }) => {
  const dispatch = useDispatch();

  return (
    <Curtain>
      <WarningContainer>
        <div>
          {reason === "fps"
            ? "This 3D web experience seems to be running slowly on your machine. Please click 'View 2D Site' below to be redirected to the previous version of my portfolio. Clicking 'Cancel' will let you view this site and this warning will not appear again."
            : reason === "mobile"
            ? "It seems you are viewing this 3D web experience on a mobile device. Some interactions on this App require a mouse, and you might experience slowness depending on your device. Clicking 'View Mobile Site' will take you to the previous version of my portfolio. Clicking 'Cancel' will let you view this site and this warning will not appear again."
            : "You are viewing this website on Safari, which doesn't support some resources. Please switch to a different browser or view the previous portfolio version by clicking the button below. Clicking 'Cancel' will let you view this site and this warning will not appear again."}
        </div>
        <ButtonCont>
          <Button
            className="button"
            onClick={() =>
              window.open("https://ivanradev2021.netlify.app/", "_self")
            }
          >
            {reason === "fps" || reason === "safari"
              ? "View 2D Site"
              : "View Mobile Site"}
          </Button>
          <Button
            className="button"
            onClick={() => dispatch(triggerWarning("clear"))}
          >
            Cancel
          </Button>
        </ButtonCont>
      </WarningContainer>
    </Curtain>
  );
};
