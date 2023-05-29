import { Sparkles } from "@react-three/drei";
import { Side } from "./Side";

export const Cube = () => {
  return (
    <group position={[20, 5, 0]} castShadow receiveShadow>
      {/* top */}
      <Side
        args={[5, 5]}
        html="top"
        position={[0, 0, 0]}
        rotateX={Math.PI / 2}
      />
      {/* bottom */}
      <Side args={[5, 5]} position={[0, -5, 0]} rotateX={Math.PI / 2} />
      {/* back */}
      <Side args={[5, 5]} position={[-2.5, -2.5, 0]} rotateY={Math.PI / 2} />
      {/* front */}
      <Side args={[5, 5]} position={[2.5, -2.5, 0]} rotateY={Math.PI / 2} />
      {/* left */}
      <Side args={[5, 5]} position={[0, -2.5, 2.5]} rotateZ={Math.PI / 2} />
      {/* right */}
      <Side args={[5, 5]} position={[0, -2.5, -2.5]} rotateZ={Math.PI / 2} />

      <Sparkles amount={370} scale={20} size={5} speed={0.9} depth={10} />
    </group>
  );
};
