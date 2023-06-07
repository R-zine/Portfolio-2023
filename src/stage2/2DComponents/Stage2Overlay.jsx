import { useEffect, useRef } from "react";
import { NothingIs } from "./Stage2Overlay.styles";
import gsap from "gsap";

export const Stage2Overlay = () => {
  const nothingRef = useRef(null);

  useEffect(() => {
    if (nothingRef.current)
      setTimeout(() => gsap.to(nothingRef.current, { opacity: 0 }), 5000);
  }, [nothingRef]);

  return (
    <>
      <NothingIs ref={nothingRef}>Nothing is what it seems.</NothingIs>
    </>
  );
};
