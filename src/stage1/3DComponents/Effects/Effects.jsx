import { EffectComposer, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import {
  DotScreen,
  ChromaticAberration,
  ColorAverage,
  HueSaturation,
  Grid,
  Scanline,
  BrightnessContrast,
} from "@react-three/postprocessing";

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
          blendFunction={
            index !== 7 ? BlendFunction.OVERLAY : BlendFunction.DIVIDE
          } // blend mode
          offset={index !== 7 ? [0.001, 0.001] : [0.1, 0.005]} // color offset
        />
        {index === 1 && (
          <ColorAverage
            blendFunction={BlendFunction.OVERLAY} // blend mode
          />
        )}
        {index === 2 && (
          <Noise
            premultiply // enables or disables noise premultiplication
            blendFunction={BlendFunction.OVERLAY} // blend mode
          />
        )}
        {index === 3 && (
          <HueSaturation
            blendFunction={BlendFunction.NORMAL} // blend mode
            hue={2} // hue in radians
            saturation={2} // saturation in radians
          />
        )}
        {index === 4 && (
          <>
            <Grid
              blendFunction={BlendFunction.DIFFERENCE} // blend mode
              scale={0.1} // grid pattern scale
              lineWidth={0.1} // grid pattern line width
            />
            <ColorAverage
              blendFunction={BlendFunction.VIVID_LIGHT} // blend mode
            />
          </>
        )}
        {index === 5 && (
          <>
            <Scanline
              blendFunction={BlendFunction.MULTIPLY} // blend mode
              density={0.25} // scanline density
            />
            <BrightnessContrast
              brightness={0} // brightness. min: -1, max: 1
              contrast={0.9} // contrast: min -1, max: 1
            />
          </>
        )}
        {index === 6 && (
          <>
            <BrightnessContrast
              brightness={-1} // brightness. min: -1, max: 1
              contrast={-0.9} // contrast: min -1, max: 1
            />
            <HueSaturation
              blendFunction={BlendFunction.MULTIPLY} // blend mode
              hue={6.6} // hue in radians
              saturation={2} // saturation in radians
            />
          </>
        )}
        {index === 7 && (
          <ColorAverage
            blendFunction={BlendFunction.COLOR} // blend mode
          />
        )}
      </EffectComposer>
    </>
  );
};
