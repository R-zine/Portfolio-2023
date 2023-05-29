import { EffectComposer, Noise, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import {
  DotScreen,
  ChromaticAberration,
  ColorAverage,
  HueSaturation,
} from "@react-three/postprocessing";
import { BlurPass, Resolution } from "postprocessing";
import { useSelector } from "react-redux";

export const Effects = () => {
  const index = useSelector((state) => state.projectCounter.value);

  return (
    <>
      <EffectComposer>
        <DotScreen
          blendFunction={BlendFunction.MULTIPLY} // blend mode
          angle={0} // angle of the dot pattern
          scale={1000.0} // scale of the dot pattern
        />
        <DotScreen
          blendFunction={BlendFunction.OVERLAY} // blend mode
          angle={0} // angle of the dot pattern
          scale={300.0} // scale of the dot pattern
        />
        <DotScreen
          blendFunction={BlendFunction.MULTIPLY} // blend mode
          angle={0} // angle of the dot pattern
          scale={300.0} // scale of the dot pattern
        />
        <ChromaticAberration
          blendFunction={BlendFunction.OVERLAY} // blend mode
          offset={[0.001, 0.001]} // color offset
        />
        {index === 1 && (
          <ColorAverage
            blendFunction={BlendFunction.OVERLAY} // blend mode
          />
        )}
        {index === 2 && (
          <Noise
            premultiply // enables or disables noise premultiplication
            blendFunction={BlendFunction.DIFFERENCE} // blend mode
          />
        )}
        {index === 3 && (
          <HueSaturation
            blendFunction={BlendFunction.NORMAL} // blend mode
            hue={2} // hue in radians
            saturation={2} // saturation in radians
          />
        )}
      </EffectComposer>
    </>
  );
};
