import {
  forwardRef,
  type ComponentPropsWithoutRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  MenuButton,
  MenuButtonContainer,
  MenuButtonTail,
} from "../stage0/2DComponents/Menu/Menu.styles";
import {
  NoOverflow,
  SlidingText,
  Tile as StyledTile,
  Curtain,
  ToolsTrade,
  ToolsText,
  Stack,
  EndTile,
  ScrollDown,
} from "./Stage3Overlay.styles";
import gsap from "gsap";
import {
  decrementAboutCount,
  setBackState,
  setGlitchState,
} from "../app/aboutSlice";

const stackDelay = 1 / 2;

interface Stage3OverlayProps {
  handleBack: () => void;
  handleContact: () => void;
}

type TileProps = ComponentPropsWithoutRef<typeof StyledTile>;

export const Stage3Overlay = ({
  handleBack,
  handleContact,
}: Stage3OverlayProps) => {
  const [isBack, setIsBack] = useState(false);

  const offset = useAppSelector((state) => state.aboutCounter.value);

  const glitchRef = useRef(false);

  const isGlitch = useAppSelector((state) => state.aboutCounter.isGlitch);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const glitchInteval = setInterval(() => {
      if (glitchRef.current !== isGlitch) {
        dispatch(setGlitchState(glitchRef.current));
      }
    }, 100);
    return () => clearInterval(glitchInteval);
  }, [dispatch, isGlitch]);

  const scrollContRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  const a1 = useRef<HTMLDivElement>(null);
  const a2 = useRef<HTMLDivElement>(null);
  const a3 = useRef<HTMLDivElement>(null);
  const a4 = useRef<HTMLDivElement>(null);
  const a5 = useRef<HTMLDivElement>(null);
  const a6 = useRef<HTMLDivElement>(null);
  const a7 = useRef<HTMLDivElement>(null);
  const a8 = useRef<HTMLDivElement>(null);
  const a9 = useRef<HTMLDivElement>(null);
  const b1 = useRef<HTMLDivElement>(null);
  const b2 = useRef<HTMLDivElement>(null);
  const b3 = useRef<HTMLDivElement>(null);
  const b4 = useRef<HTMLDivElement>(null);

  const slidingTextRef = useRef<HTMLDivElement>(null);
  const noOverflowLeft = useRef<HTMLDivElement>(null);
  const noOverflowRight = useRef<HTMLDivElement>(null);

  const curtainRef = useRef<HTMLDivElement>(null);
  const toolsContRef = useRef<HTMLDivElement>(null);
  const toolTextRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  const stackRef = useRef<HTMLDivElement>(null);

  const reachRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (newValue: string) => {
    if (stackRef.current) stackRef.current.innerText = newValue;
  };

  const Tile = useMemo(
    () =>
      forwardRef<HTMLDivElement, TileProps>((props, ref) => (
        <StyledTile
          ref={ref}
          {...props}
          onMouseEnter={() => (glitchRef.current = true)}
          onMouseLeave={() => (glitchRef.current = false)}
        ></StyledTile>
      )),
    []
  );

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (
      (glitchRef.current === false || glitchRef.current === true) &&
      a1.current &&
      a2.current &&
      a3.current &&
      a4.current &&
      a5.current &&
      a6.current &&
      a7.current &&
      a8.current &&
      a9.current &&
      b1.current &&
      b2.current &&
      b3.current &&
      b4.current &&
      slidingTextRef.current &&
      curtainRef.current &&
      toolsContRef.current &&
      toolTextRef.current &&
      questionRef.current &&
      stackRef.current &&
      noOverflowLeft.current &&
      noOverflowRight.current &&
      reachRef.current &&
      backRef.current
    ) {
      const tl = gsap.timeline();

      tl
        .addLabel("first", 0)
        .to(a1.current, { top: "10vh", duration: 0.1 }, "first")
        .to(a2.current, { top: "10vh", duration: 0.1 }, "first")
        .to(a3.current, { top: "10vh", duration: 0.1 }, "first")
        .to(a4.current, { top: "10vh", duration: 0.1 }, "first")
        .set(glitchRef, { current: false })
        .to(a1.current, { animationPlayState: "running", duration: 0.01 })
        .to(a2.current, { animationPlayState: "running", duration: 0.01 })
        .to(a3.current, { animationPlayState: "running", duration: 0.02 })
        .to(a4.current, { animationPlayState: "running", duration: 0.01 })
        .set(glitchRef, { current: false })
        .set(glitchRef, { current: true })
        .addLabel("second", 0.18)
        .set(a1.current, { opacity: 0 }, "second")
        .set(a2.current, { opacity: 0 }, "second")
        .set(a3.current, { opacity: 0 }, "second")
        .set(a4.current, { opacity: 0 }, "second")
        .set(a5.current, { opacity: 0 }, "second")
        .set(a6.current, { opacity: 0 }, "second")
        .set(a7.current, { opacity: 0 }, "second")
        .set(a8.current, { opacity: 0 }, "second")
        .set(a9.current, { opacity: 0 }, "second")
        .set(a5.current, { opacity: 1 }, "second")
        .set(a6.current, { opacity: 1 }, "second")
        .set(a7.current, { opacity: 1 }, "second")
        .set(a8.current, { opacity: 1 }, "second")
        .set(a9.current, { opacity: 1 }, "second")
        .set(glitchRef, { current: true }, "<")
        .set(glitchRef, { current: false }, "<")
        .addLabel("third", 0.23)
        .to(a5.current, { left: "50vw", duration: 0.1 }, "third")
        .to(a8.current, { left: "35vw", duration: 0.1 }, "third")
        .to(a6.current, { left: "50vw", duration: 0.1 }, "third")
        .to(a7.current, { left: "35vw", duration: 0.1 }, "third")
        .addLabel("fourth", 0.33)
        .to(b1.current, { left: "5vw", duration: 0.1 }, "fourth")
        .to(b2.current, { left: "25vw", duration: 0.1 }, "fourth")
        .to(b3.current, { left: "60vw", duration: 0.1 }, "fourth")
        .to(b4.current, { left: "80vw", duration: 0.1 }, "fourth")
        .to(slidingTextRef.current, {
          marginTop: "-48vh",
          duration: 0.05,
          delay: 0.01,
        })
        .timeScale(0.001)
        .timeScale(1)
        .addLabel("noControl", 1)
        .to(
          curtainRef.current,
          { height: "100vh", duration: 1, ease: "power4.out" },
          "noControl"
        )
        .set(toolsContRef.current, { display: "flex" })
        .to(toolTextRef.current.children, { opacity: 1, stagger: 0.5 })
        .to(questionRef.current, { opacity: 1 })
        .set(toolsContRef.current, { display: "none", delay: 3 })
        .set(stackRef.current, { display: "flex" })
        .call(handleTextChange, ["React"], "+=" + stackDelay)
        .call(handleTextChange, ["Next"], "+=" + stackDelay)
        .call(handleTextChange, ["React Native"], "+=" + stackDelay)
        .call(handleTextChange, ["Redux/TK"], "+=" + stackDelay)
        .call(handleTextChange, ["ThreeJS/Fiber"], "+=" + stackDelay)
        .call(handleTextChange, ["MUI"], "+=" + stackDelay)
        .call(handleTextChange, ["Styled/Emotion"], "+=" + stackDelay)
        .call(handleTextChange, ["Rapier"], "+=" + stackDelay)
        .call(handleTextChange, ["CannonJS"], "+=" + stackDelay)
        .call(handleTextChange, ["Astro"], "+=" + stackDelay)
        .call(handleTextChange, ["Prisma/SQL"], "+=" + stackDelay)
        .call(handleTextChange, ["Node"], "+=" + stackDelay)
        .set(noOverflowLeft.current, { display: "none" })
        .set(noOverflowRight.current, { display: "none" })
        .set(a9.current, { display: "none" })
        .set(reachRef.current, { display: "flex" })
        .set(backRef.current, { display: "flex" })
        .to(curtainRef.current, {
          top: "100vh",
          ease: "power4.out",
          duration: 2.5,
          delay: 0.8,
        })
        .to(
          stackRef.current,
          { opacity: 0, top: "100vh", ease: "power4.out", duration: 2.5 },
          "<"
        )
        .set(stackRef.current, { display: "none" })
        .set(curtainRef.current, { display: "none" })
        .pause();

      timelineRef.current = tl;
      return () => {
        tl.kill();
        if (timelineRef.current === tl) timelineRef.current = null;
      };
    }
    return undefined;
  }, []);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (timeline && offset && !isBack) {
      if (offset < 0.55) timeline.seek(offset);
      else timeline.play();
    }

    if (offset === 0 && isBack) {
      setIsBack(false);
      handleBack();
    }
    let scrollOutTimeline: gsap.core.Timeline | undefined;
    if (offset > 0.02) {
      scrollOutTimeline = gsap.timeline();
      scrollOutTimeline
        .to(scrollContRef.current, { opacity: 0 })
        .set(scrollContRef.current, { display: "none" });
    }

    return () => {
      scrollOutTimeline?.kill();
    };
  }, [handleBack, isBack, offset]);

  useLayoutEffect(() => {
    if (scrollContRef.current && svgRef.current) {
      const scrollTL = gsap.timeline();

      const introTween = gsap.to(scrollContRef.current, {
        opacity: 1,
        duration: 1,
        delay: 0.5,
      });

      scrollTL
        .to(scrollContRef.current, {
          height: "7vh",
          duration: 2,
          ease: "power4.out",
        })
        .to(svgRef.current, { opacity: 0, duration: 2 }, "<")
        .repeat(-1);

      return () => {
        introTween.kill();
        scrollTL.kill();
      };
    }

    return undefined;
  }, []);

  const backStartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const backStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const offsetIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const beginBack = () => {
    if (isBack) return;

    setIsBack(true);
    timelineRef.current?.timeScale(5).reverse();
    glitchRef.current = true;
    backStartTimerRef.current = setTimeout(() => {
      gsap.set(
        [a5.current, a6.current, a7.current, a8.current, a9.current].filter(
          Boolean
        ),
        { display: "none" }
      );
      dispatch(setBackState(true));
      offsetIntervalRef.current = setInterval(
        () => dispatch(decrementAboutCount(0.01)),
        10
      );
    }, 3300);
    backStopTimerRef.current = setTimeout(() => {
      if (offsetIntervalRef.current)
        clearInterval(offsetIntervalRef.current);
      offsetIntervalRef.current = null;
    }, 6000);
  };

  useEffect(
    () => () => {
      if (backStartTimerRef.current)
        clearTimeout(backStartTimerRef.current);
      if (backStopTimerRef.current) clearTimeout(backStopTimerRef.current);
      if (offsetIntervalRef.current) clearInterval(offsetIntervalRef.current);
    },
    []
  );

  return (
    <>
      <>
        <MenuButtonContainer
          type="button"
          className="button"
          onClick={beginBack}
        >
          <MenuButton>Back</MenuButton>
          <MenuButtonTail />
        </MenuButtonContainer>

        <ScrollDown ref={scrollContRef}>
          <div>Scroll</div>

          <div ref={svgRef}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M246.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 402.7 361.4 265.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-160 160zm160-352l-160 160c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 210.7 361.4 73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3z" />
            </svg>
          </div>
        </ScrollDown>
      </>
      <>
        <Tile top={120} left={5} ref={a1} isVisible animeDelay={0.5}>
          I
        </Tile>
        <Tile top={160} left={25} ref={a2} isVisible animeDelay={2}>
          am
        </Tile>
        <Tile top={110} left={60} ref={a3} isVisible animeDelay={0}>
          <span>I</span>van
        </Tile>
        <Tile top={270} left={80} ref={a4} isVisible animeDelay={1.3}>
          <span>R</span>adev
        </Tile>
        <Tile
          top={8}
          left={49.5}
          width={1}
          height={16}
          fontSize={8.4}
          zIndex={999}
          ref={a9}
        >
          |
        </Tile>
        <NoOverflow ref={noOverflowLeft} left>
          <Tile top={10} left={5} ref={a5} zIndex={1001}>
            <span>C</span>reative
          </Tile>
          <Tile top={10} left={25} ref={a6}>
            <span>D</span>eveloper
          </Tile>
          <Tile top={10} left={51} isVisible ref={b1} zIndex={1001}>
            <span>C</span>rafting
          </Tile>
          <Tile top={10} left={51} isVisible ref={b2}>
            <SlidingText ref={slidingTextRef}>
              <div>
                <span>A</span>rtful
              </div>
              <div>
                <span>S</span>tellar
              </div>
              <div>
                <span>T</span>hrilling
              </div>
              <div>
                <span>U</span>nique
              </div>
              <div>
                <span>S</span>uperb
              </div>
            </SlidingText>
          </Tile>
        </NoOverflow>
        <NoOverflow ref={noOverflowRight}>
          <Tile top={10} left={60} ref={a7}>
            <span>F</span>rontend
          </Tile>
          <Tile top={10} left={80} ref={a8}>
            <span>E</span>ngineer
          </Tile>
          <Tile top={10} left={34} isVisible ref={b3}>
            <span>W</span>eb
          </Tile>
          <Tile top={10} left={34} isVisible ref={b4}>
            <span>C</span>ontent
          </Tile>
        </NoOverflow>
        <Curtain ref={curtainRef}>
          <ToolsTrade ref={toolsContRef}>
            <ToolsText ref={toolTextRef}>
              <div>Tools</div> <div>of</div> <div>the</div>
              <div>Trade</div>
            </ToolsText>
            <div ref={questionRef} style={{ fontSize: "70vh", opacity: 0 }}>
              ?
            </div>
          </ToolsTrade>
          <Stack className="stack" ref={stackRef}>
            HTML/CSS/JS
          </Stack>
        </Curtain>
        <EndTile
          as="button"
          type="button"
          className="button"
          top={20}
          left={40}
          width={20}
          isVisible
          ref={reachRef}
          onClick={handleContact}
        >
          Reach out
        </EndTile>

        <EndTile
          as="button"
          type="button"
          className="button"
          top={65}
          left={42}
          width={16}
          isVisible
          ref={backRef}
          onClick={beginBack}
        >
          Back
        </EndTile>
      </>
    </>
  );
};
