import { useRef, useMemo, forwardRef } from "react";
import { FooterContainer, FooterTail, FooterText } from "./Footer.styles";
import gsap from "gsap";

export const Footer = () => {
  const t1 = useRef(null);
  const t2 = useRef(null);
  const t3 = useRef(null);
  const t4 = useRef(null);

  const timeline = useMemo(() => {
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

    return tl;
  }, [t1.current, t2.current, t3.current, t4.current]);

  return (
    <FooterContainer
      className="button"
      onMouseEnter={() => timeline.timeScale(1).play()}
      onMouseLeave={() => timeline.timeScale(2).reverse()}
    >
      <FooterText opacity ref={t1}>
        Ivan Radev
      </FooterText>
      <FooterText ref={t2}>Creative</FooterText>
      <FooterText ref={t3}>Developer</FooterText>
      <FooterText ref={t4}>© {new Date().getFullYear()}</FooterText>
      <FooterTail />
    </FooterContainer>
  );
};
