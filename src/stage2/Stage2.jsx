import {
  EffectComposer,
  ChromaticAberration,
  ColorAverage,
  Glitch,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import { Cube } from "./3DComponents/Cube/Cube";
import { Floor } from "./3DComponents/Floor/Floor";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const Stage2 = () => {
  const [isInverted, setIsInverted] = useState(false);
  const [isGlitch, setIsGlitch] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  const contactPhase = useSelector((state) => state.contactCounter.value);

  useEffect(() => {
    setTimeout(() => setIsInitial(false), 50);
  }, []);

  useEffect(() => {
    if (contactPhase === 4) {
      setTimeout(() => setIsInverted(true), 1200);
      setTimeout(() => setIsInverted(false), 1300);
      setTimeout(() => setIsInverted(true), 2100);
      setTimeout(() => setIsInverted(false), 2200);
      setTimeout(() => setIsInverted(true), 2400);
      setTimeout(() => setIsInverted(false), 2500);
      setTimeout(() => setIsInverted(true), 2800);
      setTimeout(() => setIsGlitch(true), 3100);
    }
  }, [contactPhase]);

  return (
    <>
      <Cube />
      <Floor />
      {!isInitial && <fog attach="fog" color={"white"} near={22} far={60} />}
      <color attach="background" args={["#ffffff"]} />
      <EffectComposer>
        {!isGlitch && (
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL} // blend mode
            offset={[0.002, 0.002]} // color offset
          />
        )}
        {isInverted && (
          <ColorAverage blendFunction={BlendFunction.DIFFERENCE} />
        )}
        {isGlitch && (
          <Glitch
            delay={[0, 0.1]} // min and max glitch delay
            duration={[0.6, 2.0]} // min and max glitch duration
            strength={[0.9, 1.0]} // min and max glitch strength
            mode={GlitchMode.CONSTANT_WILD} // glitch mode
            active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
            ratio={0} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
          />
        )}
      </EffectComposer>
    </>
  );
};
