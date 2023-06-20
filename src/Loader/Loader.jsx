import { useEffect, useMemo, useRef } from "react";
import { Circle, Container, Text, Letter } from "./Loader.styles";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { loaderIncrement } from "../app/loaderSlice";

export const Loader = ({ isGo }) => {
  const text1 = useRef(null);
  const text2 = useRef(null);

  const circle = useRef(null);

  const containerRef = useRef(null);

  const counter = useSelector((state) => state.loader.value);

  const dispatch = useDispatch();

  const timeline = useMemo(() => {
    if (text1.current && text2.current && circle.current) {
      const tl = gsap.timeline();

      tl.to(circle.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power4.in",
      })
        .to(text1.current, {
          opacity: 1,
          duration: 0.5,
          delay: 1,
          ease: "power4.out",
        })

        .to(text1.current.children, {
          color: "#ffffffff",
          textShadow: "0.2vw 5px 30px white",
          duration: 1.5,
          stagger: 0.2,
          ease: "power4.out",
        })
        .to(text2.current, {
          opacity: 1,
          duration: 0.2,
          ease: "power4.out",
        })
        .to(text2.current.children, {
          color: "#ffffffff",
          textShadow: "0.2vw 5px 30px white",
          duration: 1.5,
          stagger: 0.1,
          ease: "power4.out",
        })
        .pause();

      return tl;
    }
  }, [text1.current, text2.current, circle.current]);

  useEffect(() => {
    if (!isGo || counter <= 8.7) {
      window.loaderInteval = setInterval(() => dispatch(loaderIncrement()), 50);
    }

    if (isGo && counter >= 8.7) {
      const tl2 = gsap.timeline();

      tl2
        .to(text1.current.children, { opacity: 0, stagger: 0.2 })
        .to(text2.current.children, { opacity: 0, stagger: 0.1 })
        .to(circle.current, { width: "1vw", height: "1vw", duration: 0.4 })
        .to(containerRef.current, { opacity: 0 })
        .set(containerRef.current, { display: "none" });
    }

    return () => clearInterval(window.loaderInteval);
  }, [isGo, timeline, counter]);

  useEffect(() => {
    if (counter && timeline) timeline.seek(counter);
  }, [counter, timeline]);

  return (
    <>
      <Container ref={containerRef}>
        <Text ref={text1}>
          <span>I</span>
          <Letter>v</Letter>
          <Letter>a</Letter>
          <Letter>n </Letter>

          <span>R</span>
          <Letter>a</Letter>
          <Letter>d</Letter>
          <Letter>e</Letter>
          <Letter>v</Letter>
        </Text>
        <Circle ref={circle} />
        <Text ref={text2}>
          <span>C</span>
          <Letter>r</Letter>
          <Letter>e</Letter>
          <Letter>a</Letter>
          <Letter>t</Letter>
          <Letter>i</Letter>
          <Letter>v</Letter>
          <Letter>e </Letter>
          <span>D</span>
          <Letter>e</Letter>
          <Letter>v</Letter>
          <Letter>e</Letter>
          <Letter>l</Letter>
          <Letter>o</Letter>
          <Letter>p</Letter>
          <Letter>e</Letter>
          <Letter>r</Letter>
        </Text>
      </Container>
    </>
  );
};
