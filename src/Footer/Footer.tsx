import { useLayoutEffect, useRef } from "react";
import { FooterContainer, FooterTail, FooterText } from "./Footer.styles";
import gsap from "gsap";

export const Footer = () => {
  const t1 = useRef<HTMLDivElement>(null);
  const t2 = useRef<HTMLDivElement>(null);
  const t3 = useRef<HTMLDivElement>(null);
  const t4 = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline();

    if (t1.current && t2.current && t3.current && t4.current) {
      tl.to(t1.current, { color: "#FFFFFF00" })
        .set(t1.current, { display: "none" })
        .set(t2.current, { display: "flex" })
        .to(t2.current, { color: "white" })
        .to(t2.current, { color: "#FFFFFF00" }, "+=1")
        .set(t2.current, { display: "none" })
        .set(t3.current, { display: "flex" })
        .to(t3.current, { color: "white" })
        .to(t3.current, { color: "#FFFFFF00" }, "+=1")
        .set(t3.current, { display: "none" })
        .set(t4.current, { display: "flex" })
        .to(t4.current, { color: "white" })
        .pause();
    }

    timelineRef.current = tl;
    return () => {
      tl.kill();
      timelineRef.current = null;
    };
  }, []);

  return (
    <FooterContainer
      className="button"
      onMouseEnter={() => {
        timelineRef.current?.timeScale(1).play();
      }}
      onMouseLeave={() => {
        timelineRef.current?.timeScale(2).reverse();
      }}
    >
      <FooterText isVisible ref={t1}>
        Ivan Radev
      </FooterText>
      <FooterText ref={t2}>Creative</FooterText>
      <FooterText ref={t3}>Developer</FooterText>
      <FooterText ref={t4}>© {new Date().getFullYear()}</FooterText>
      <FooterTail />
    </FooterContainer>
  );
};
