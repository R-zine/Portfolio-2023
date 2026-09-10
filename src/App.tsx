import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ElementRef,
} from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  ScrollControls,
} from "@react-three/drei";
import gsap from "gsap";
import type { PerspectiveCamera as ThreePerspectiveCamera } from "three";

import { Ring } from "./stage0/3DComponents/Ring/Ring";
import { Effects } from "./stage0/3DComponents/Effects/Effects";
import { Sphere } from "./stage0/3DComponents/Sphere/Sphere";
import { Lights } from "./stage0/3DComponents/Lights/Lights";
import { Menu } from "./stage0/2DComponents/Menu/Menu";
import { ScreenEffect } from "./stage0/2DComponents/ScreenEffect/ScreenEffect";

import {
  setAboutCount,
  setBackState,
  setGlitchState,
} from "./app/aboutSlice";
import { setMain, triggerWarning } from "./app/mainSlice";
import { setContactCount } from "./app/contactsCounterSlice";
import type { ContactPhase } from "./app/contactsCounterSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Footer } from "./Footer";
import { Warning } from "./stage0/2DComponents/Warning/Warning";

const Stage1 = lazy(() =>
  import("./stage1/Stage1").then(({ Stage1 }) => ({ default: Stage1 }))
);
const ProjectDisplay = lazy(() =>
  import("./stage1/2DComponents/ProjectDisplay/ProjectDisplay").then(
    ({ ProjectDisplay }) => ({ default: ProjectDisplay })
  )
);
const Stage2 = lazy(() =>
  import("./stage2/Stage2").then(({ Stage2 }) => ({ default: Stage2 }))
);
const Stage2Overlay = lazy(() =>
  import("./stage2/2DComponents/Stage2Overlay").then(({ Stage2Overlay }) => ({
    default: Stage2Overlay,
  }))
);
const Stage3Overlay = lazy(() =>
  import("./stage3/Stage3Overlay").then(({ Stage3Overlay }) => ({
    default: Stage3Overlay,
  }))
);
const EffectsStage3 = lazy(() =>
  import("./stage3/Effects").then(({ EffectsStage3 }) => ({
    default: EffectsStage3,
  }))
);

const checkMobile = () => {
  let check = false;
  (function (a: string) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(
    navigator.userAgent ||
      navigator.vendor ||
      (window as Window & { opera?: string }).opera ||
      ""
  );
  return check;
};

const isSafari = Boolean(
  navigator.vendor &&
  navigator.vendor.indexOf("Apple") > -1 &&
  navigator.userAgent &&
  navigator.userAgent.indexOf("CriOS") == -1 &&
    navigator.userAgent.indexOf("FxiOS") === -1
);

function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isGlitch, setIsGlitch] = useState(false);
  const [isProject, setIsProject] = useState(false);
  const [isContact, setIsContact] = useState(false);
  const [isStage2Initial, setIsStage2Initial] = useState(true);
  const [isAbout, setIsAbout] = useState(false);

  const handleGlitchDisk = (value: boolean) => setIsGlitch(value);

  const cameraRef = useRef<ThreePerspectiveCamera>(null);
  const controlsRef = useRef<ElementRef<typeof OrbitControls>>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stage = useAppSelector((state) => state.main.value);

  const contactPhase = useAppSelector((state) => state.contactCounter.value);

  const aboutIsGlitch = useAppSelector((state) => state.aboutCounter.isGlitch);

  const warningState = useAppSelector((state) => state.main.warning);

  const isLoaderRevealing = useAppSelector(
    (state) => state.loader.isRevealing
  );

  const dispatch = useAppDispatch();

  const handleBack = useCallback(() => {
    dispatch(setMain(0));
    setIsGlitch(false);
    setIsProject(false);
    setIsContact(false);
    dispatch(setContactCount(0));
    setIsAbout(false);
    dispatch(setAboutCount(0));
    dispatch(setBackState(false));
    dispatch(setGlitchState(false));
    if (cameraRef.current)
      gsap.to(cameraRef.current.position, {
        x: 0,
        y: 0,
        z: 60,
        overwrite: "auto",
      });
    if (controlsRef.current)
      gsap.to(controlsRef.current.target, {
        y: 0,
        x: 0,
        z: 0,
        overwrite: "auto",
      });
  }, [dispatch]);

  const startProjects = useCallback(() => {
    if (!isAbout && !isContact) setIsProject(true);
  }, [isAbout, isContact]);

  const startContact = useCallback(() => {
    if (!isAbout && !isProject) setIsContact(true);
  }, [isAbout, isProject]);

  const startAbout = useCallback(() => {
    if (!isContact && !isProject) setIsAbout(true);
  }, [isContact, isProject]);

  const startContactFromAbout = useCallback(() => {
    dispatch(setAboutCount(0));
    dispatch(setBackState(false));
    dispatch(setGlitchState(false));
    setIsGlitch(false);
    setIsAbout(false);
    setIsContact(true);
  }, [dispatch]);

  useEffect(() => {
    if (!warningState.wasTriggered && checkMobile())
      dispatch(triggerWarning("mobile"));
    else if (!warningState.wasTriggered && isSafari)
      dispatch(triggerWarning("safari"));
  }, [dispatch, warningState.wasTriggered]);

  useEffect(() => {
    if (!isLoaderRevealing) return undefined;

    let cameraTween: gsap.core.Tween | undefined;
    let animationFrame: number | undefined;

    const startCameraReveal = () => {
      if (!cameraRef.current) {
        animationFrame = requestAnimationFrame(startCameraReveal);
        return;
      }

      cameraTween = gsap.to(cameraRef.current.position, {
        z: 60,
        duration: 3,
        ease: "power4",
        overwrite: "auto",
      });
    };

    startCameraReveal();

    return () => {
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
      cameraTween?.kill();
    };
  }, [isLoaderRevealing]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const tweens: gsap.core.Tween[] = [];

    if (cameraRef.current && stage === 1) {
      timers.push(
        setTimeout(() => {
          if (cameraRef.current)
            tweens.push(
              gsap.to(cameraRef.current.position, {
                y: 20,
                overwrite: "auto",
              })
            );
        }, 50)
      );
    }
    if (controlsRef.current && stage === 1) {
      timers.push(
        setTimeout(() => {
          if (controlsRef.current)
            tweens.push(
              gsap.to(controlsRef.current.target, {
                y: 4,
                overwrite: "auto",
              })
            );
        }, 100)
      );
    }

    if (controlsRef.current && stage === 2 && [1, 2, 3].includes(contactPhase)) {
      const targets: Partial<Record<ContactPhase, { x?: number; y?: number; z?: number }>> = {
        1: { y: -17 },
        2: { y: -10 },
        3: { z: 2, y: 4, x: 20 },
      };
      timers.push(
        setTimeout(() => {
          const target = targets[contactPhase];
          if (controlsRef.current && target)
            tweens.push(
              gsap.to(controlsRef.current.target, {
                ...target,
                duration: 1,
                overwrite: "auto",
              })
            );
        }, 500)
      );
    }

    return () => {
      timers.forEach(clearTimeout);
      tweens.forEach((tween) => {
        tween.kill();
      });
    };
  }, [contactPhase, stage]);

  useEffect(() => {
    if (!isProject) return undefined;
    const timer = setTimeout(() => {
      dispatch(setMain(1));
    }, 5500);
    return () => clearTimeout(timer);
  }, [dispatch, isProject]);

  useEffect(() => {
    if (canvasRef.current && isContact) {
      const contactTL = gsap.timeline();
      const cameraTL = gsap.timeline();
      let cameraTimer: ReturnType<typeof setTimeout> | undefined;
      let canvasRevealTween: gsap.core.Tween | undefined;
      contactTL
        .to(canvasRef.current, { y: 100, ease: "power4" })
        .to(canvasRef.current, { y: "-100%", ease: "power4", duration: 1.5 })
        .set(canvasRef.current, { opacity: 0 }, "-=1.3");
      const stageTimer = setTimeout(() => {
        dispatch(setMain(2));
        if (!canvasRef.current) return;
        gsap.set(canvasRef.current, { y: 0 });
        canvasRevealTween = gsap.to(canvasRef.current, {
          opacity: 1,
          duration: 1,
          overwrite: "auto",
        });
        cameraTimer = setTimeout(() => {
          if (cameraRef.current && controlsRef.current)
            cameraTL
              .to(cameraRef.current.position, {
                z: 20,
                x: 27,
                y: 8,
                duration: 8,
              })
              .to(
                controlsRef.current.target,
                {
                  x: 10,
                  z: -25,
                  y: -3,
                  duration: 8,
                },
                "<"
              );
        }, 1500);
      }, 2500);

      return () => {
        clearTimeout(stageTimer);
        clearTimeout(cameraTimer);
        contactTL.kill();
        cameraTL.kill();
        canvasRevealTween?.kill();
      };
    }

    return undefined;
  }, [dispatch, isContact]);

  useEffect(() => {
    if (stage !== 2) {
      setIsStage2Initial(true);
      return undefined;
    }

    setIsStage2Initial(true);
    const timer = setTimeout(() => setIsStage2Initial(false), 8100);
    return () => clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (
      stage !== 2 ||
      !cameraRef.current ||
      isStage2Initial ||
      contactPhase !== 0
    )
      return undefined;

    const cameraTween = gsap.to(cameraRef.current.position, {
      x:
        cameraRef.current.position.x < 24 && pos.x < 0
          ? cameraRef.current.position.x
          : cameraRef.current.position.x > 30 && pos.x > 0
          ? cameraRef.current.position.x
          : 27 + pos.x,
      y:
        cameraRef.current.position.y < 5 && pos.y > 0
          ? cameraRef.current.position.y
          : cameraRef.current.position.y > 13 && pos.y < 0
          ? cameraRef.current.position.y
          : 8 - pos.y * 2,
      duration: 1,
      overwrite: "auto",
    });

    return () => {
      cameraTween.kill();
    };
  }, [pos, stage, isStage2Initial, contactPhase]);

  useEffect(() => {
    if (stage !== 2 || !cameraRef.current || isStage2Initial)
      return undefined;

    const cameraTargets: Partial<
      Record<
        ContactPhase,
        { x?: number; y?: number; z?: number; duration: number }
      >
    > = {
      1: { y: 13, z: 12, duration: 1.5 },
      2: { y: 7, z: 9, duration: 1.5 },
      3: { x: 16, y: 4, z: -20, duration: 2.5 },
      5: { x: 19, y: 4, z: -17, duration: 1.5 },
    };
    const target = cameraTargets[contactPhase];
    if (!target) return undefined;

    const cameraTween = gsap.to(cameraRef.current.position, {
      ...target,
      overwrite: "auto",
    });

    return () => {
      cameraTween.kill();
    };
  }, [contactPhase, isStage2Initial, stage]);

  return (
    <>
      {isProject && stage === 0 && <ScreenEffect />}
      {stage === 0 && !isAbout && (
        <Menu
          onContact={startContact}
          onAbout={startAbout}
          onProjects={startProjects}
        />
      )}
      <Suspense fallback={null}>
        {stage === 1 && <ProjectDisplay back={handleBack} />}
        {stage === 2 && <Stage2Overlay back={handleBack} />}
        {isAbout && (
          <Stage3Overlay
            handleBack={handleBack}
            handleContact={startContactFromAbout}
          />
        )}
      </Suspense>
      <Footer />

      {warningState.reason && <Warning reason={warningState.reason} />}

      <Canvas
        ref={canvasRef}
        onMouseMove={(e) =>
          setPos({
            x: (e.clientX - window.innerWidth / 2) / 1000,
            y: (e.clientY - window.innerHeight / 2) / 1000,
          })
        }
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        shadows
      >
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 0, 1500]}
            fov={30}
            near={0.01}
            far={1500}
          />
          <OrbitControls
            ref={controlsRef}
            autoRotate={stage === 1}
            enableRotate={false}
            enablePan={false}
            enableZoom={false}
          />

          {isAbout ? (
            <ScrollControls enabled={isAbout} pages={10} damping={0.4}>
              {stage === 0 && (
                <>
                  <Sphere handleClick={startProjects} />

                  <Ring
                    pos={pos}
                    rotationMultiplier={-0.3}
                    color={"#464b52"}
                    onClick={startContact}
                    isAbout={isAbout}
                  />
                  <Ring
                    scale={0.7}
                    pos={pos}
                    rotationMultiplier={0.5}
                    color={"#9089a0"}
                    onClick={startAbout}
                    isAbout={isAbout}
                  />
                  <Ring
                    handleGlitchDisk={handleGlitchDisk}
                    scale={0.5}
                    pos={pos}
                    rotationMultiplier={1.1}
                    color={"#79737b"}
                    isAbout={isAbout}
                  />
                  <Effects
                    isGlitch={isGlitch}
                    isProject={isProject}
                    isContact={isContact}
                  />
                </>
              )}
            </ScrollControls>
          ) : stage === 0 ? (
            <>
              <Sphere handleClick={startProjects} />

              <Ring
                pos={pos}
                rotationMultiplier={-0.3}
                color={"#464b52"}
                onClick={startContact}
                isAbout={isAbout}
              />
              <Ring
                scale={0.7}
                pos={pos}
                rotationMultiplier={0.5}
                color={"#9089a0"}
                onClick={startAbout}
                isAbout={isAbout}
              />
              <Ring
                handleGlitchDisk={handleGlitchDisk}
                scale={0.5}
                pos={pos}
                rotationMultiplier={1.1}
                color={"#79737b"}
                isAbout={isAbout}
              />
              <Effects
                isGlitch={isGlitch}
                isProject={isProject}
                isContact={isContact}
              />
            </>
          ) : null}

          <Suspense fallback={null}>
            {stage === 1 && <Stage1 />}
            {stage === 2 && <Stage2 />}
            {aboutIsGlitch && <EffectsStage3 />}
          </Suspense>
          <Lights />
      </Canvas>
    </>
  );
}

export default App;
