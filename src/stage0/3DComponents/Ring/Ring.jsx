import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

export const Ring = ({
  scale,
  pos,
  rotationMultiplier,
  color,
  handleGlitchDisk,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const intensity = useRef(0.05);

  const outerRingRef1 = useRef(null);
  const innerRingRef1 = useRef(null);

  const groupRef = useRef(null);

  useEffect(() => {
    if (outerRingRef1.current) outerRingRef1.current.rotation.x = Math.PI / 2;
    if (innerRingRef1.current) innerRingRef1.current.rotation.x = Math.PI / 2;
  }, [outerRingRef1, innerRingRef1]);

  useEffect(() => {
    if (groupRef.current && pos.x) {
      groupRef.current.rotation.x = pos.y * rotationMultiplier;
      groupRef.current.rotation.y = pos.x * rotationMultiplier;
    }
  }, [groupRef, pos, rotationMultiplier]);

  useEffect(() => {
    if (isHovered) gsap.to(intensity, { current: 0.5, duration: 0.2 });
    if (!isHovered) gsap.to(intensity, { current: 0.05, duration: 0.2 });
  }, [isHovered]);

  return (
    <group
      scale={scale}
      ref={groupRef}
      onPointerEnter={() => {
        if (handleGlitchDisk) handleGlitchDisk(true);
        setIsHovered(true);
      }}
      onPointerLeave={() => {
        if (handleGlitchDisk) handleGlitchDisk(false);
        setIsHovered(false);
      }}
      onClick={() => onClick()}
    >
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <ringGeometry args={[10, 12, 50]} />
        <meshStandardMaterial
          color={color}
          roughness={0.05}
          metalness={1}
          emissive={color}
          emissiveIntensity={intensity.current}
        />
      </mesh>

      <mesh position={[0, 0, -1]} ref={outerRingRef1} receiveShadow castShadow>
        <cylinderBufferGeometry args={[12, 12, 2, 70, 2, true]} />
        <meshStandardMaterial
          color={color}
          roughness={0.05}
          metalness={1}
          emissive={color}
          emissiveIntensity={intensity.current}
        />
      </mesh>
      <mesh position={[0, 0, -1]} ref={innerRingRef1} receiveShadow castShadow>
        <cylinderBufferGeometry args={[10, 10, 2, 70, 2, true]} />
        <meshStandardMaterial
          color={color}
          roughness={0.05}
          metalness={1}
          side={THREE.DoubleSide}
          emissive={color}
          emissiveIntensity={intensity.current}
        />
      </mesh>
    </group>
  );
};
