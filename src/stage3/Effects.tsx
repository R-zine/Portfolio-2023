import { EffectComposer, Glitch } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";
import { Vector2 } from "three";

const glitchDelay = new Vector2(0.1, 0.6);
const glitchDuration = new Vector2(0.6, 1);
const glitchStrength = new Vector2(0.3, 1);

export const EffectsStage3 = (): JSX.Element => {
  return (
    <>
      <EffectComposer>
        <Glitch
          delay={glitchDelay} // min and max glitch delay
          duration={glitchDuration} // min and max glitch duration
          strength={glitchStrength} // min and max glitch strength
          mode={GlitchMode.CONSTANT_MILD} // glitch mode
          active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
          ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
        />
      </EffectComposer>
    </>
  );
};
