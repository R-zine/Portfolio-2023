import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MenUButton,
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
} from "./Stage3Overlay.styles";
import gsap from "gsap";
import {
  decrementAboutCount,
  setBackState,
  setGlitchState,
} from "../app/aboutSlice";

const stackDelay = 1 / 2;

export const Stage3Overlay = ({ handleBack }) => {
  const [isBack, setIsBack] = useState(false);

  const offset = useSelector((state) => state.aboutCounter.value);

  const glitchRef = useRef(false);

  const isGlitch = useSelector((state) => state.aboutCounter.isGlitch);

  const dispatch = useDispatch();

  useEffect(() => {
    const glitchInteval = setInterval(() => {
      if (glitchRef.current !== isGlitch) {
        dispatch(setGlitchState(glitchRef.current));
      }
    }, 100);
    return () => clearInterval(glitchInteval);
  }, [isGlitch]);

  const a1 = useRef(null);
  const a2 = useRef(null);
  const a3 = useRef(null);
  const a4 = useRef(null);
  const a5 = useRef(null);
  const a6 = useRef(null);
  const a7 = useRef(null);
  const a8 = useRef(null);
  const a9 = useRef(null);
  const b1 = useRef(null);
  const b2 = useRef(null);
  const b3 = useRef(null);
  const b4 = useRef(null);

  const slidingTextRef = useRef(null);
  const noOverflowLeft = useRef(null);
  const noOverflowRight = useRef(null);

  const curtainRef = useRef(null);
  const toolsContRef = useRef(null);
  const toolTextRef = useRef(null);
  const questionRef = useRef(null);

  const stackRef = useRef(null);

  const reachRef = useRef(null);
  const backRef = useRef(null);

  const handleTextChange = (newValue) => {
    const stackElement = document.querySelector(".stack");
    stackElement.innerText = newValue;
  };

  const Tile = useMemo(
    () =>
      forwardRef((props, ref) => (
        <StyledTile
          ref={ref}
          {...props}
          onMouseEnter={() => (glitchRef.current = true)}
          onMouseLeave={() => (glitchRef.current = false)}
        ></StyledTile>
      )),
    []
  );

  const timeline = useMemo(() => {
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

      return tl
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
        .call(handleTextChange, ["Prisma/SQLite"], "+=" + stackDelay)
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
        })
        .to(
          stackRef.current,
          { opacity: 0, top: "100vh", ease: "power4.out", duration: 2.5 },
          "<"
        )
        .set(stackRef.current, { display: "none" })
        .set(curtainRef.current, { display: "none" })
        .pause();
    }
    return null;
  }, [
    glitchRef.current,
    a1.current,
    a2.current,
    a3.current,
    a4.current,
    a5.current,
    a6.current,
    a7.current,
    a8.current,
    a9.current,
    b1.current,
    b2.current,
    b3.current,
    b4.current,
    slidingTextRef.current,
    curtainRef.current,
    toolsContRef.current,
    toolTextRef.current,
    questionRef.current,
    stackRef.current,
    noOverflowLeft.current,
    noOverflowRight.current,
    reachRef.current,
    backRef.current,
  ]);

  useEffect(() => {
    if (timeline && offset) {
      if (offset < 0.55) setTimeout(() => timeline.seek(offset), 100);
      else if (!isBack) timeline.play();
    }

    if (offset === 0 && isBack) {
      setIsBack(false);
      handleBack();
    }
  }, [offset, timeline, isBack]);

  return (
    <>
      <>
        <MenuButtonContainer
          onClick={() => {
            setIsBack(true);
            timeline.timeScale(5).reverse();
            glitchRef.current = true;
            setTimeout(() => {
              const tl2 = gsap.timeline();

              tl2
                .set(a5.current, { display: "none" })
                .set(a6.current, { display: "none" })
                .set(a7.current, { display: "none" })
                .set(a8.current, { display: "none" })
                .set(a9.current, { display: "none" });

              dispatch(setBackState(true));
              window.offsetInterval = setInterval(
                () => offset > 0 && dispatch(decrementAboutCount(0.01)),
                10
              );
            }, 3300);
            setTimeout(() => clearInterval(window.offsetInterval), 6000);
          }}
        >
          <MenUButton>Back</MenUButton>
          <MenuButtonTail />
        </MenuButtonContainer>
      </>
      <>
        <Tile top={120} left={5} ref={a1} opacity animeDelay={0.5}>
          I
        </Tile>
        <Tile top={160} left={25} ref={a2} opacity animeDelay={2}>
          am
        </Tile>
        <Tile top={110} left={60} ref={a3} opacity animeDelay={0}>
          <span>I</span>van
        </Tile>
        <Tile top={270} left={80} ref={a4} opacity animeDelay={1.3}>
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
          <Tile top={10} left={51} opacity ref={b1} zIndex={1001}>
            <span>C</span>rafting
          </Tile>
          <Tile top={10} left={51} opacity ref={b2}>
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
          <Tile top={10} left={34} opacity ref={b3}>
            <span>W</span>eb
          </Tile>
          <Tile top={10} left={34} opacity ref={b4}>
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
        <EndTile top={20} left={40} width={20} opacity ref={reachRef}>
          Reach out
        </EndTile>

        <EndTile
          top={65}
          left={42}
          width={16}
          opacity
          ref={backRef}
          onClick={() => {
            setIsBack(true);
            timeline.timeScale(5).reverse();
            setTimeout(() => {
              const tl2 = gsap.timeline();

              tl2
                .set(a5.current, { display: "none" })
                .set(a6.current, { display: "none" })
                .set(a7.current, { display: "none" })
                .set(a8.current, { display: "none" })
                .set(a9.current, { display: "none" });

              dispatch(setBackState(true));
              window.offsetInterval = setInterval(
                () => offset > 0 && dispatch(decrementAboutCount(0.01)),
                10
              );
            }, 3300);
            setTimeout(() => clearInterval(window.offsetInterval), 6000);
          }}
        >
          Back
        </EndTile>
      </>
    </>
  );
};
