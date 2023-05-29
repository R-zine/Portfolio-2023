import {
  EffectComposer,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Cube } from "./3DComponents/Cube/Cube";
import { Floor } from "./3DComponents/Floor/Floor";

export const Stage2 = () => {
  return (
    <>
      <Cube />
      <Floor />
      <fog attach="fog" color={"white"} near={22} far={60} />
      <color attach="background" args={["#ffffff"]} />
      <EffectComposer>
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.002, 0.002]} // color offset
        />
      </EffectComposer>
    </>
  );
};
