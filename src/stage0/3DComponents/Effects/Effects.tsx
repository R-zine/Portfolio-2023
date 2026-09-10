import {
  EffectComposer,
  ChromaticAberration,
  Noise,
  Glitch,
  Scanline,
  DotScreen,
} from "@react-three/postprocessing";
import {
  BlendFunction,
  GlitchMode,
  type ChromaticAberrationEffect,
} from "postprocessing";
import { Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Vector2 } from "three";

const glitchDelay = new Vector2(0, 0.1);
const glitchDuration = new Vector2(0.6, 2);
const glitchStrength = new Vector2(0.6, 1);

interface EffectsProps {
  isGlitch: boolean;
  isProject: boolean;
  isContact: boolean;
}

export const Effects = ({
  isGlitch,
  isProject,
  isContact,
}: EffectsProps) => {
  const [stage, setStage] = useState(0);
  const chromaticEffectRef = useRef<ChromaticAberrationEffect>(null);
  const initialOffset = useMemo(() => new Vector2(0.0008, 0.0008), []);

  useEffect(() => {
    const liveOffset = chromaticEffectRef.current?.offset;
    if (!liveOffset) return undefined;

    gsap.to(liveOffset, {
      x: isGlitch ? 0.08 : 0.0008,
      y: isGlitch ? 0.08 : 0.0008,
      duration: isGlitch ? 0.5 : 0.2,
      overwrite: "auto",
    });

    return () => gsap.killTweensOf(liveOffset);
  }, [isGlitch]);

  useEffect(() => {
    if (isProject) {
      const timers: ReturnType<typeof setTimeout>[] = [];
      timers.push(
        setTimeout(() => {
          setStage(1);
          timers.push(
            setTimeout(() => {
              setStage(2);
              timers.push(setTimeout(() => setStage(3), 1500));
            }, 1500)
          );
        }, 1000)
      );

      return () => timers.forEach(clearTimeout);
    }

    setStage(0);
    return undefined;
  }, [isProject]);

  return (
    <>
      {!isProject && (
        <EffectComposer multisampling={0}>
          <ChromaticAberration
            ref={chromaticEffectRef}
            blendFunction={BlendFunction.NORMAL} // blend mode
            offset={initialOffset} // color offset
          />
          <Noise
            opacity={0.7}
            premultiply // enables or disables noise premultiplication
            blendFunction={BlendFunction.ADD} // blend mode
          />
          {isContact ? (
            <>
              <Noise
                premultiply // enables or disables noise premultiplication
                blendFunction={BlendFunction.OVERLAY} // blend mode
              />
              <Scanline
                blendFunction={BlendFunction.COLOR_DODGE} // blend mode
                density={1.25} // scanline density
              />
            </>
          ) : (
            <></>
          )}
        </EffectComposer>
      )}

      {isProject && (
        <EffectComposer>
          <Glitch
            delay={glitchDelay} // min and max glitch delay
            duration={glitchDuration} // min and max glitch duration
            strength={glitchStrength} // min and max glitch strength
            mode={GlitchMode.SPORADIC} // glitch mode
            active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
            ratio={0} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
          />
          {stage > 0 ? (
            <Noise
              opacity={1}
              premultiply // enables or disables noise premultiplication
              blendFunction={BlendFunction.MULTIPLY} // blend mode
            />
          ) : (
            <></>
          )}
          {stage > 1 ? (
            <Scanline
              blendFunction={BlendFunction.OVERLAY} // blend mode
              density={5.25} // scanline density
            />
          ) : (
            <></>
          )}
          {stage > 2 ? (
            <DotScreen
              blendFunction={BlendFunction.NORMAL} // blend mode
              angle={Math.PI * 0.5} // angle of the dot pattern
              scale={1.0} // scale of the dot pattern
            />
          ) : (
            <></>
          )}
        </EffectComposer>
      )}

      <Stars
        radius={150}
        depth={50}
        count={15000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </>
  );
};
