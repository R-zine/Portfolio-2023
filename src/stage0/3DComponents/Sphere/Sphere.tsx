import { MeshTransmissionMaterial } from "@react-three/drei";
import { NodeToyMaterial } from "@nodetoy/react-nodetoy";
import { data } from "./shader";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Vector2, type Mesh } from "three";

const normalScale = new Vector2(0.3, 0.3);

interface SphereProps {
  handleClick: () => void;
}

export const Sphere = ({ handleClick }: SphereProps) => {
  const [isHovered, setisHovered] = useState(false);

  const shellRef = useRef<Mesh>(null);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return undefined;

    const timeline = gsap.timeline({ repeat: -1 });
    timeline.to(shell.rotation, { y: Math.PI, duration: 2 }).to(
      shell.rotation,
      { y: Math.PI * 2, duration: 2 }
    );

    return () => {
      timeline.kill();
    };
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return undefined;

    gsap.to(shell.scale, {
      x: isHovered ? 1.5 : 1.02,
      y: isHovered ? 1.5 : 1.02,
      z: isHovered ? 1.5 : 1.02,
      duration: 0.2,
      overwrite: "auto",
    });
    document.body.classList.toggle("button", isHovered);

    return () => {
      gsap.killTweensOf(shell.scale);
      document.body.classList.remove("button");
    };
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
          normalScale={normalScale}
          roughness={0}
          ior={1.5}
          thickness={0.035}
          transmission={1}
          chromaticAberration={1}
          anisotropy={20}
          distortion={0}
          distortionScale={0}
          temporalDistortion={0}
          samples={10}
          backside={true}
          color={"#fff"}
          attenuationDistance={0.2}
          attenuationColor={"#e2ae5b"}
        />
      </mesh>

      <mesh scale={1.02} ref={shellRef}>
        <sphereGeometry args={[3, 50, 50, 0, Math.PI, 0, Math.PI]} />
        <NodeToyMaterial data={data} />
      </mesh>
    </group>
  );
};
