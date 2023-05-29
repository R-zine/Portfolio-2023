import {
  EffectComposer,
  ChromaticAberration,
  Noise,
  Glitch,
  Scanline,
  DotScreen,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import { Stars } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const Effects = ({ isGlitch, isProject, isContact }) => {
  const [stage, setStage] = useState(0);

  const offset = useRef(0.0008);

  useEffect(() => {
    if (isGlitch) gsap.to(offset, { current: 0.08, duration: 0.5 });
    if (!isGlitch) gsap.to(offset, { current: 0.0008 });
  }, [isGlitch]);

  useEffect(() => {
    if (isProject)
      setTimeout(() => {
        setStage(1);
        setTimeout(() => {
          setStage(2);
          setTimeout(() => {
            setStage(3);
          }, 1500);
        }, 1500);
      }, 1000);
  }, [isProject]);

  return (
    <>
      {!isProject && (
        <EffectComposer multisampling={0}>
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL} // blend mode
            offset={[offset.current, offset.current]} // color offset
          />
          <Noise
            opacity={0.7}
            premultiply // enables or disables noise premultiplication
            blendFunction={BlendFunction.ADD} // blend mode
          />
          {isContact && (
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
          )}
        </EffectComposer>
      )}

      {isProject && (
        <EffectComposer>
          <Glitch
            delay={[0, 0.1]} // min and max glitch delay
            duration={[0.6, 2.0]} // min and max glitch duration
            strength={[0.6, 1.0]} // min and max glitch strength
            mode={GlitchMode.SPORADIC} // glitch mode
            active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
            ratio={0} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
          />
          {stage > 0 && (
            <Noise
              opacity={1}
              premultiply // enables or disables noise premultiplication
              blendFunction={BlendFunction.MULTIPLY} // blend mode
            />
          )}
          {stage > 1 && (
            <Scanline
              blendFunction={BlendFunction.OVERLAY} // blend mode
              density={5.25} // scanline density
            />
          )}
          {stage > 2 && (
            <DotScreen
              blendFunction={BlendFunction.NORMAL} // blend mode
              angle={Math.PI * 0.5} // angle of the dot pattern
              scale={1.0} // scale of the dot pattern
            />
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
