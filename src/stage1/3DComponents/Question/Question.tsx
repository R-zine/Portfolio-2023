import { Sphere, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import type { Group } from "three";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { increment } from "../../../app/projectCounterSlice";

const materialStyles = {
  8: {
    color: "#78e9ff",
    emissive: "#087e9f",
    emissiveIntensity: 0.9,
    metalness: 0.9,
    roughness: 0.18,
    wireframe: true,
  },
  9: {
    color: "#ff6534",
    emissive: "#6f1600",
    emissiveIntensity: 0.8,
    metalness: 0.3,
    roughness: 0.45,
    wireframe: false,
  },
  11: {
    color: "#82ff9d",
    emissive: "#116c2b",
    emissiveIntensity: 0.85,
    metalness: 0.72,
    roughness: 0.22,
    wireframe: false,
  },
} as const;

export const Question = () => {
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useAppDispatch();

  const value = useAppSelector((state) => state.projectCounter.value);

  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current)
      groupRef.current.rotation.y = clock.getElapsedTime() / -2;
  });

  const sphereArgs = useMemo<[number, number, number]>(() => {
    const heightSegments = [2, 3, 4, 6, 9, 12, 16, 20, 24, 28, 32, 36];
    return [5, 4, heightSegments[value - 1] ?? heightSegments[0]];
  }, [value]);

  const materialStyle = materialStyles[value as keyof typeof materialStyles];

  return (
    <>
      <group
        ref={groupRef}
        position={[0, -1, 0]}
        onClick={() => dispatch(increment())}
      >
        <Text
          position={[0, 15, 0]}
          color={isHovered ? "crimson" : "white"}
          fontSize={isHovered ? 4 : 3}
        >
          {value === 0 ? "?" : value}
        </Text>
        <Sphere
          args={sphereArgs}
          castShadow
          position={[0, 7, 0]}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
        >
          <meshStandardMaterial
            color={isHovered ? "white" : materialStyle?.color ?? "crimson"}
            emissive={materialStyle?.emissive ?? "black"}
            emissiveIntensity={materialStyle?.emissiveIntensity ?? 0}
            roughness={materialStyle?.roughness ?? 1}
            metalness={materialStyle?.metalness ?? 0.5}
            wireframe={materialStyle?.wireframe ?? false}
          />
        </Sphere>
      </group>
    </>
  );
};
