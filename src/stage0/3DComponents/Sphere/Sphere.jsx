import { MeshTransmissionMaterial } from "@react-three/drei";
import { NodeToyMaterial } from "@nodetoy/react-nodetoy";
import { data } from "./shader";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const Sphere = ({ handleClick }) => {
  const [isHovered, setisHovered] = useState(false);

  const scale = useRef(1.02);

  const shellRef = useRef(null);

  const tl = gsap.timeline({ repeat: -1 });

  useEffect(() => {
    tl.to(shellRef.current.rotation, { y: Math.PI, duration: 2 }).to(
      shellRef.current.rotation,
      { y: Math.PI * 2, duration: 2 }
    );

    tl.play();
  }, []);

  useEffect(() => {
    if (isHovered) gsap.to(scale, { current: 1.5, duration: 0.2 });
    if (!isHovered) gsap.to(scale, { current: 1.02, duration: 0.2 });
  }, [isHovered]);

  return (
    <group
      onPointerEnter={() => setisHovered(true)}
      onPointerLeave={() => setisHovered(false)}
      onClick={handleClick}
    >
      <mesh>
        <sphereGeometry args={[3, 50, 50]} />
        <MeshTransmissionMaterial
          normalScale={[0.3, 0.3]}
          roughness={0}
          ior={1.5}
          thickness={0.035}
          transmission={1}
          chromaticAberration={1}
          anisotropy={20}
          distortion={0}
          distortionScale={0}
          samples={10}
          backside={true}
          color={"#fff"}
          attenuationDistance={0.2}
          attenuationColor={"#e2ae5b"}
        />
      </mesh>

      <mesh
        scale={[scale.current, scale.current, scale.current]}
        ref={shellRef}
      >
        <sphereGeometry args={[3, 50, 50, 0, Math.PI, 0, Math.PI]} />
        <NodeToyMaterial data={data} />
      </mesh>
    </group>
  );
};
