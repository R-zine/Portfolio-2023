import {
  EffectComposer,
  ChromaticAberration,
  ColorAverage,
  Glitch,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import { Cube } from "./3DComponents/Cube/Cube";
import { Floor } from "./3DComponents/Floor/Floor";
import { useEffect, useState } from "react";
import { Physics } from "@react-three/rapier";
import { useAppSelector } from "../app/hooks";
import { Vector2 } from "three";

const chromaticOffset = new Vector2(0.002, 0.002);
const glitchDelay = new Vector2(0, 0.1);
const glitchDuration = new Vector2(0.6, 2);
const glitchStrength = new Vector2(0.9, 1);

const Primitives = () => (
  <>
    <fog attach="fog" color={"white"} near={22} far={60} />
    <color attach="background" args={["#ffffff"]} />
  </>
);

export const Stage2 = () => {
  const [isInverted, setIsInverted] = useState(false);
  const [isGlitch, setIsGlitch] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  const contactPhase = useAppSelector((state) => state.contactCounter.value);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitial(false), 160);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (contactPhase === 4) {
      const timers: ReturnType<typeof setTimeout>[] = [
        setTimeout(() => setIsInverted(true), 1200),
        setTimeout(() => setIsInverted(false), 1300),
        setTimeout(() => setIsInverted(true), 2100),
        setTimeout(() => setIsInverted(false), 2200),
        setTimeout(() => setIsInverted(true), 2400),
        setTimeout(() => setIsInverted(false), 2500),
        setTimeout(() => setIsInverted(true), 2800),
        setTimeout(() => setIsGlitch(true), 3100),
      ];

      return () => timers.forEach(clearTimeout);
    }

    setIsInverted(false);
    setIsGlitch(false);
    return undefined;
  }, [contactPhase]);

  return (
    <>
      <Physics gravity={[0, 0.4, 0]} paused={contactPhase !== 4}>
        <Cube />
        <Floor />
      </Physics>
      {!isInitial && <Primitives />}

      <EffectComposer>
        {!isGlitch ? (
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL} // blend mode
            offset={chromaticOffset} // color offset
          />
        ) : (
          <></>
        )}
        {isInverted ? (
          <ColorAverage blendFunction={BlendFunction.DIFFERENCE} />
        ) : (
          <></>
        )}
        {isGlitch ? (
          <Glitch
            delay={glitchDelay} // min and max glitch delay
            duration={glitchDuration} // min and max glitch duration
            strength={glitchStrength} // min and max glitch strength
            mode={GlitchMode.CONSTANT_WILD} // glitch mode
            active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
            ratio={0} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
          />
        ) : (
          <></>
        )}
      </EffectComposer>
    </>
  );
};
