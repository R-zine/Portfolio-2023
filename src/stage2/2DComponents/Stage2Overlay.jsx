import { useEffect, useRef, useState } from "react";
import { Black, EndScreen, NothingIs } from "./Stage2Overlay.styles";
import gsap from "gsap";
import {
  MenuButton,
  MenuButtonContainer,
  MenuButtonTail,
} from "../../stage0/2DComponents/Menu/Menu.styles";
import { useDispatch, useSelector } from "react-redux";
import { setContactCount } from "../../app/contactsCounterSlice";

export const Stage2Overlay = ({ back }) => {
  const [isNothing, setIsNothing] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isBlack, setIsBlack] = useState(false);

  const nothingRef = useRef(null);

  const contactPhase = useSelector((state) => state.contactCounter.value);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEnd) {
      setTimeout(() => {
        setIsEnd(false);
        dispatch(setContactCount(4));
      }, 3000);
    }
  }, [isEnd]);

  useEffect(() => {
    if (nothingRef.current)
      setTimeout(() => gsap.to(nothingRef.current, { opacity: 0 }), 5000);
    setTimeout(() => setIsNothing(false), 5600);
  }, [nothingRef]);

  useEffect(() => {
    if (contactPhase === 4) {
      setTimeout(() => setIsBlack(true), 3300);
      setTimeout(() => back(), 3700);
    }
  }, [contactPhase]);

  return (
    <>
      {isNothing && <NothingIs ref={nothingRef}>Hide and Seek</NothingIs>}
      {isEnd && (
        <EndScreen>
          {contactPhase === 3 || contactPhase === 5
            ? "LEAVE NO EVIDENCE BEHIND"
            : "???"}
        </EndScreen>
      )}

      {contactPhase !== 4 && !isEnd && (
        <MenuButtonContainer className="button" onClick={() => setIsEnd(true)}>
          <MenuButton dark>Back</MenuButton>
          <MenuButtonTail dark />
        </MenuButtonContainer>
      )}
      {isBlack && <Black />}
    </>
  );
};
