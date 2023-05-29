import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Screen = styled.div`
  background-color: black;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);
  content: " ";
  overflow: hidden;
  z-index: 1003;
  opacity: 0;
`;

const Black = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 1001;
  opacity: 0;
`;

export const ScreenEffect = () => {
  const screenRef = useRef(null);
  const blackRef = useRef(null);

  const tl = gsap.timeline();

  useEffect(() => {
    if (screenRef.current)
      setTimeout(
        () =>
          tl
            .set(screenRef.current, { opacity: 1 })
            .set(blackRef.current, { opacity: 1 })
            .to(screenRef.current, {
              width: "100vw",
              height: "2px",
              background: "#ffffff",
              ease: "power4.out",
            }),
        5000
      );
  }, [screenRef]);

  return (
    <>
      <Screen ref={screenRef} />
      <Black ref={blackRef} />
    </>
  );
};
