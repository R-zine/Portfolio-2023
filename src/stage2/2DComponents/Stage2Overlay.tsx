import { useEffect, useRef, useState } from "react";
import { Black, EndScreen, NothingIs } from "./Stage2Overlay.styles";
import gsap from "gsap";
import {
  MenuButton,
  MenuButtonContainer,
  MenuButtonTail,
} from "../../stage0/2DComponents/Menu/Menu.styles";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setContactCount } from "../../app/contactsCounterSlice";

interface Stage2OverlayProps {
  back: () => void;
}

export const Stage2Overlay = ({ back }: Stage2OverlayProps) => {
  const [isNothing, setIsNothing] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isBlack, setIsBlack] = useState(false);

  const nothingRef = useRef<HTMLDivElement>(null);

  const contactPhase = useAppSelector((state) => state.contactCounter.value);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isEnd) {
      const timer = setTimeout(() => {
        setIsEnd(false);
        dispatch(setContactCount(4));
      }, 3000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [dispatch, isEnd]);

  useEffect(() => {
    const nothingElement = nothingRef.current;
    const fadeTimer = setTimeout(() => {
      if (nothingElement) gsap.to(nothingElement, { opacity: 0 });
    }, 5000);
    const hideTimer = setTimeout(() => setIsNothing(false), 5600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      if (nothingElement) gsap.killTweensOf(nothingElement);
    };
  }, []);

  useEffect(() => {
    if (contactPhase === 4) {
      const timers: ReturnType<typeof setTimeout>[] = [
        setTimeout(() => setIsBlack(true), 3300),
        setTimeout(() => back(), 3700),
      ];

      return () => timers.forEach(clearTimeout);
    }

    return undefined;
  }, [back, contactPhase]);

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
        <MenuButtonContainer
          type="button"
          className="button"
          onClick={() => setIsEnd(true)}
        >
          <MenuButton dark>Back</MenuButton>
          <MenuButtonTail dark />
        </MenuButtonContainer>
      )}
      {isBlack && <Black />}
    </>
  );
};
