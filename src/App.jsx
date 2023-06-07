import { useState, useRef, useEffect, Suspense } from "react";
import "./App.css";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";

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

function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isGlitch, setIsGlitch] = useState(false);
  const [isProject, setIsProject] = useState(false);
  const [isContact, setIsContact] = useState(false);
  const [stage, setStage] = useState(0);

  const handleGlitchDisk = (value) => setIsGlitch(value);

  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const canvasRef = useRef(null);

  const handleBack = () => {
    setStage(0);
    setIsGlitch(false);
    setIsProject(false);
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
  }, [controlsRef?.current?.target, stage]);

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
        .set(canvasRef.current, { opacity: 0 }, "-=1.2");
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

  return (
    <Suspense fallback={null}>
      {isProject && stage === 0 && <ScreenEffect />}
      {stage === 0 && <Menu />}
      {stage === 1 && <ProjectDisplay pos={pos} back={handleBack} />}
      {stage === 2 && <Stage2Overlay />}
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
      </Canvas>
    </Suspense>
  );
}

export default App;
