import { useState, useRef, useEffect, Suspense } from "react";
import "./App.css";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { useSelector } from "react-redux";

import { Ring } from "./stage0/3DComponents/Ring/Ring";
import { Effects } from "./stage0/3DComponents/Effects/Effects";
import { Sphere } from "./stage0/3DComponents/Sphere/Sphere";
import { Lights } from "./stage0/3DComponents/Lights/Lights";
import { Menu } from "./stage0/2DComponents/Menu/Menu";
import { ScreenEffect } from "./stage0/2DComponents/ScreenEffect/ScreenEffect";

import { Stage1 } from "./stage1/Stage1";
import { ProjectDisplay } from "./stage1/2DComponents/ProjectDisplay/ProjectDisplay";
import { Stage2 } from "./stage2/Stage2";
import { Stage2Overlay } from "./stage2/2DComponents/Stage2Overlay";
import { Physics } from "@react-three/rapier";

function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isGlitch, setIsGlitch] = useState(false);
  const [isProject, setIsProject] = useState(false);
  const [isContact, setIsContact] = useState(false);
  const [isStage2Initial, setIsStage2Initial] = useState(true);
  const [stage, setStage] = useState(0);

  const handleGlitchDisk = (value) => setIsGlitch(value);

  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const canvasRef = useRef(null);

  const contactPhase = useSelector((state) => state.contactCounter.value);

  const handleBack = () => {
    setStage(0);
    setIsGlitch(false);
    setIsProject(false);
    setIsContact(false);
    gsap.to(cameraRef.current.position, { x: 0, y: 0, z: 60 });
    gsap.to(controlsRef.current.target, { y: 0, x: 0, z: 0 });
  };

  useEffect(() => {
    if (cameraRef?.current)
      setTimeout(
        () =>
          gsap.to(cameraRef.current.position, {
            z: 60,
            duration: 3,
            ease: "power4",
          }),
        1000
      );
    if (!!cameraRef?.current && stage === 1) {
      setTimeout(() => {
        gsap.to(cameraRef.current.position, { y: 20 });
      }, 50);
    }
  }, [cameraRef.current, stage]);

  useEffect(() => {
    if (!!controlsRef?.current && stage === 1) {
      setTimeout(() => {
        gsap.to(controlsRef.current.target, { y: 4 });
      }, 100);
    }
    if (controlsRef.current && stage === 2 && contactPhase === 1) {
      setTimeout(
        () => gsap.to(controlsRef.current.target, { y: -17, duration: 1 }),
        500
      );
    }
    if (controlsRef.current && stage === 2 && contactPhase === 2) {
      setTimeout(
        () => gsap.to(controlsRef.current.target, { y: -10, duration: 1 }),
        500
      );
    }
    if (controlsRef.current && stage === 2 && contactPhase === 3) {
      setTimeout(
        () =>
          gsap.to(controlsRef.current.target, {
            z: 2,
            y: 4,
            x: 20,
            duration: 1,
          }),
        500
      );
    }
    if (contactPhase === 4) {
      setTimeout(() => setStage(0), 3700);
    }
  }, [controlsRef?.current?.target, stage, contactPhase]);

  useEffect(() => {
    if (isProject) setTimeout(() => setStage(1), 5500);
  }, [isProject]);

  useEffect(() => {
    if (canvasRef.current && isContact) {
      const contactTL = gsap.timeline();
      const cameraTL = gsap.timeline();
      contactTL
        .to(canvasRef.current, { y: 100, ease: "power4" })
        .to(canvasRef.current, { y: "-100%", ease: "power4", duration: 1.5 })
        .set(canvasRef.current, { opacity: 0 }, "-=1.3");
      setTimeout(() => {
        setStage(2);
        gsap.set(canvasRef.current, { y: 0, duration: 1, ease: "power4" });
        gsap.to(canvasRef.current, { opacity: 1, duration: 1 });
        setTimeout(
          () => {
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
          },

          1500
        );
      }, 2500);
    }
  }, [canvasRef, isContact]);

  useEffect(() => {
    if (stage === 2) setTimeout(() => setIsStage2Initial(false), 8100);
    if (
      stage === 2 &&
      cameraRef.current &&
      !isStage2Initial &&
      contactPhase === 0
    ) {
      gsap.to(cameraRef.current.position, {
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
    }
    if (
      stage === 2 &&
      cameraRef.current &&
      !isStage2Initial &&
      contactPhase === 1
    ) {
      setTimeout(
        () =>
          gsap.to(cameraRef.current.position, {
            y: 13,
            z: 12,
            overwrite: "auto",
            duration: 1.5,
          }),
        0
      );
    }
    if (
      stage === 2 &&
      cameraRef.current &&
      !isStage2Initial &&
      contactPhase === 2
    ) {
      setTimeout(
        () =>
          gsap.to(cameraRef.current.position, {
            y: 7,
            z: 9,
            overwrite: "auto",
            duration: 1.5,
          }),
        0
      );
    }
    if (
      stage === 2 &&
      cameraRef.current &&
      !isStage2Initial &&
      contactPhase === 3
    ) {
      setTimeout(
        () =>
          gsap.to(cameraRef.current.position, {
            x: 16,
            y: 4,
            z: -20,
            overwrite: "auto",
            duration: 2.5,
          }),
        0
      );
    }
    if (
      stage === 2 &&
      cameraRef.current &&
      !isStage2Initial &&
      contactPhase === 5
    ) {
      setTimeout(
        () =>
          gsap.to(cameraRef.current.position, {
            x: 19,
            y: 4,
            z: -17,
            overwrite: "auto",
            duration: 1.5,
          }),
        0
      );
    }
  }, [pos, stage, cameraRef.current, isStage2Initial, contactPhase]);

  return (
    <Suspense fallback={null}>
      {isProject && stage === 0 && <ScreenEffect />}
      {stage === 0 && <Menu />}
      {stage === 1 && <ProjectDisplay pos={pos} back={handleBack} />}
      {stage === 2 && <Stage2Overlay back={handleBack} />}

      <Canvas
        ref={canvasRef}
        onMouseMove={(e) =>
          setPos({
            x: (e.clientX - window.innerWidth / 2) / 1000,
            y: (e.clientY - window.innerHeight / 2) / 1000,
          })
        }
        gl={{ antialias: true }}
        shadows
      >
        <Physics gravity={[0, 0.4, 0]} paused={contactPhase !== 4}>
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 0, 1500]}
            fov={30}
            near={0.01}
            far={1500}
          />
          <OrbitControls ref={controlsRef} autoRotate={stage === 1} />
          {stage === 0 && (
            <>
              <Sphere handleClick={() => setIsProject(true)} />

              <Ring
                pos={pos}
                rotationMultiplier={-0.3}
                color={"#615f65"}
                onClick={() => {
                  setIsContact(true);
                }}
              />
              <Ring
                scale={0.7}
                pos={pos}
                rotationMultiplier={0.5}
                color={"#DEE7E7"}
              />
              <Ring
                handleGlitchDisk={handleGlitchDisk}
                scale={0.5}
                pos={pos}
                rotationMultiplier={1.1}
                color={"#5d5769"}
              />
              <Effects
                isGlitch={isGlitch}
                isProject={isProject}
                isContact={isContact}
              />
            </>
          )}
          {stage === 1 && <Stage1 />}
          {stage === 2 && <Stage2 />}
          <Lights />
        </Physics>
      </Canvas>
    </Suspense>
  );
}

export default App;
