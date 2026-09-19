import {
  Bloom,
  BrightnessContrast,
  ChromaticAberration,
  ColorAverage,
  ColorDepth,
  DotScreen,
  EffectComposer,
  Grid,
  HueSaturation,
  Noise,
  Scanline,
  Sepia,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

import { useAppSelector } from "../../../app/hooks";

const chromaticOffset = new Vector2(0.001, 0.001);
const finalChromaticOffset = new Vector2(0.1, 0.005);

interface ProjectEffectsProps {
  index: number;
}

const ProjectEffects = ({ index }: ProjectEffectsProps): JSX.Element => {
  switch (index) {
    case 1:
      return <ColorAverage blendFunction={BlendFunction.OVERLAY} />;
    case 2:
      return (
        <Noise premultiply blendFunction={BlendFunction.OVERLAY} />
      );
    case 3:
      return (
        <HueSaturation
          blendFunction={BlendFunction.NORMAL}
          hue={2}
          saturation={2}
        />
      );
    case 4:
      return (
        <>
          <Grid
            blendFunction={BlendFunction.OVERLAY}
            scale={0.1}
            lineWidth={0.1}
          />
          <ColorAverage blendFunction={BlendFunction.VIVID_LIGHT} />
        </>
      );
    case 5:
      return (
        <>
          <Scanline
            blendFunction={BlendFunction.MULTIPLY}
            density={0.25}
          />
          <BrightnessContrast brightness={0} contrast={0.9} />
        </>
      );
    case 6:
      return (
        <>
          <BrightnessContrast brightness={-1} contrast={-0.9} />
          <HueSaturation
            blendFunction={BlendFunction.MULTIPLY}
            hue={6.6}
            saturation={2}
          />
        </>
      );
    case 7:
      return <ColorAverage blendFunction={BlendFunction.COLOR} />;
    case 8:
      return (
        <>
          <ColorDepth bits={5} blendFunction={BlendFunction.NORMAL} />
          <Noise blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.12} />
          <BrightnessContrast brightness={-0.04} contrast={0.3} />
        </>
      );
    case 9:
      return (
        <>
          <Bloom
            mipmapBlur
            intensity={1.2}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.4}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.65} />
        </>
      );
    case 10:
      return (
        <>
          <Sepia intensity={0.8} blendFunction={BlendFunction.SOFT_LIGHT} />
          <Vignette eskil={false} offset={0.3} darkness={0.45} />
        </>
      );
    case 11:
      return (
        <>
          <Grid
            blendFunction={BlendFunction.SOFT_LIGHT}
            scale={0.5}
            lineWidth={0.08}
          />
          <HueSaturation
            blendFunction={BlendFunction.NORMAL}
            hue={0.7}
            saturation={0.55}
          />
          <Bloom
            mipmapBlur
            intensity={0.65}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.25}
          />
        </>
      );
    case 12:
      return (
        <>
          <Scanline
            blendFunction={BlendFunction.OVERLAY}
            density={1.2}
            opacity={0.25}
          />
          <HueSaturation
            blendFunction={BlendFunction.NORMAL}
            hue={-0.4}
            saturation={0.35}
          />
          <Vignette eskil={false} offset={0.15} darkness={0.45} />
        </>
      );
    default:
      return <></>;
  }
};

export const Effects = () => {
  const index = useAppSelector((state) => state.projectCounter.value);

  return (
    <>
      <EffectComposer multisampling={0}>
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
          offset={index !== 7 ? chromaticOffset : finalChromaticOffset} // color offset
        />
        <ProjectEffects index={index} />
      </EffectComposer>
    </>
  );
};
