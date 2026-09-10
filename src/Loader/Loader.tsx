import { useEffect, useLayoutEffect, useRef } from "react";
import { Circle, Container, Text, Letter } from "./Loader.styles";
import gsap from "gsap";
import {
  LOADER_INTRO_END,
  setLoaderProgress,
  startLoaderReveal,
} from "../app/loaderSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

interface LoaderProps {
  isGo?: boolean;
}

export const Loader = ({ isGo = false }: LoaderProps) => {
  const text1 = useRef<HTMLDivElement>(null);
  const text2 = useRef<HTMLDivElement>(null);

  const circle = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const counter = useAppSelector((state) => state.loader.value);
  const initialCounterRef = useRef(counter);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
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

      timelineRef.current = tl;
      return () => {
        tl.kill();
        timelineRef.current = null;
      };
    }

    return undefined;
  }, []);

  useEffect(() => {
    const startedAt = performance.now() - initialCounterRef.current * 1000;
    const updateProgress = () => {
      const elapsed = (performance.now() - startedAt) / 1000;
      dispatch(setLoaderProgress(elapsed));
      if (elapsed >= LOADER_INTRO_END) clearInterval(loaderInterval);
    };
    const loaderInterval = setInterval(updateProgress, 50);
    updateProgress();

    return () => clearInterval(loaderInterval);
  }, [dispatch]);

  useEffect(() => {
    if (isGo && counter >= LOADER_INTRO_END) {
      const text1Element = text1.current;
      const text2Element = text2.current;
      const circleElement = circle.current;
      const containerElement = containerRef.current;
      if (!text1Element || !text2Element || !circleElement || !containerElement)
        return undefined;

      const tl2 = gsap.timeline();

      tl2
        .to(text1Element.children, { opacity: 0, stagger: 0.2 })
        .to(text2Element.children, { opacity: 0, stagger: 0.1 })
        .to(circleElement, { width: "1vw", height: "1vw", duration: 0.4 })
        .to(containerElement, {
          opacity: 0,
          onStart: () => {
            dispatch(startLoaderReveal());
          },
        })
        .set(containerElement, { display: "none" });

      return () => {
        tl2.kill();
      };
    }

    return undefined;
  }, [counter, dispatch, isGo]);

  useEffect(() => {
    if (counter && timelineRef.current) timelineRef.current.seek(counter);
  }, [counter]);

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
