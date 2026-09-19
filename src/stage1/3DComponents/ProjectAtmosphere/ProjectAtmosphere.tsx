import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide, type Group, type Mesh } from "three";

import { useAppSelector } from "../../../app/hooks";

const orbitNodes = [
  [-12, 2, 0],
  [-7, 10, -2],
  [7, 10, -2],
  [12, 2, 0],
  [7, -7, -2],
  [-7, -7, -2],
] as const;

const stackBlocks = [
  [-14, 0, -2, 5, 2, 5, -0.08],
  [-14, 2.2, -2, 4.3, 2, 4.3, 0.09],
  [-14, 4.4, -2, 3.6, 2, 3.6, -0.12],
  [-9, 0, -7, 4, 2, 4, 0.08],
  [-9, 2.2, -7, 3.3, 2, 3.3, -0.1],
  [14, 0, -2, 5, 2, 5, 0.08],
  [14, 2.2, -2, 4.3, 2, 4.3, -0.09],
  [14, 4.4, -2, 3.6, 2, 3.6, 0.12],
  [9, 0, -7, 4, 2, 4, -0.08],
  [9, 2.2, -7, 3.3, 2, 3.3, 0.1],
] as const;

const scannerNodes = [
  [-13, 0, 0],
  [-9, 9, -1],
  [0, 13, -2],
  [9, 9, -1],
  [13, 0, 0],
  [9, -9, -1],
  [0, -13, -2],
  [-9, -9, -1],
] as const;

const PortfolioOrbit = (): JSX.Element => {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.35) * 0.12;
  });

  return (
    <group ref={groupRef} position={[0, 7, -7]}>
      {[9, 12, 15].map((radius, index) => (
        <mesh
          key={radius}
          rotation={[
            index === 1 ? Math.PI / 2.8 : Math.PI / 2,
            index * 0.65,
            index * 0.4,
          ]}
        >
          <torusGeometry args={[radius, 0.08 + index * 0.025, 8, 96]} />
          <meshStandardMaterial
            color={index === 1 ? "#c9f7ff" : "#36c8ff"}
            emissive="#087ea4"
            emissiveIntensity={1.2}
            metalness={0.85}
            roughness={0.15}
          />
        </mesh>
      ))}
      {orbitNodes.map((position, index) => (
        <mesh key={position.join(":")} position={position} scale={index % 2 ? 0.8 : 1.15}>
          <icosahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="#8deaff"
            emissive="#1599bd"
            emissiveIntensity={1.4}
            wireframe
          />
        </mesh>
      ))}
      <pointLight color="#48d9ff" intensity={8} distance={38} />
    </group>
  );
};

const StackingField = (): JSX.Element => {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = -0.8 + Math.sin(clock.getElapsedTime() * 0.8) * 0.35;
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.24) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, -0.8, -8]}>
      {stackBlocks.map(([x, y, z, width, height, depth, rotation]) => (
        <mesh
          key={`${x}:${y}:${z}`}
          position={[x, y, z]}
          rotation={[0, rotation, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[width, height, depth]} />
          <meshStandardMaterial
            color="#ff6534"
            emissive="#761900"
            emissiveIntensity={0.75}
            metalness={0.28}
            roughness={0.48}
          />
        </mesh>
      ))}
      <pointLight color="#ff4d18" intensity={10} distance={42} position={[0, 8, 2]} />
    </group>
  );
};

const ScannerField = (): JSX.Element => {
  const groupRef = useRef<Group>(null);
  const sweepRef = useRef<Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (groupRef.current) groupRef.current.rotation.y -= delta * 0.08;
    if (sweepRef.current) sweepRef.current.rotation.z = clock.getElapsedTime() * 0.7;
  });

  return (
    <group ref={groupRef} position={[0, 7, -7]}>
      {[6, 10, 14].map((radius) => (
        <mesh key={radius} rotation={[0, 0, 0]}>
          <torusGeometry args={[radius, 0.055, 6, 96]} />
          <meshBasicMaterial color="#6dff91" transparent opacity={0.72} />
        </mesh>
      ))}
      <mesh ref={sweepRef} position={[0, 0, 0.2]}>
        <ringGeometry args={[1.5, 14, 64, 1, 0, Math.PI / 5]} />
        <meshBasicMaterial
          color="#39ff72"
          side={DoubleSide}
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      </mesh>
      {scannerNodes.map((position, index) => (
        <mesh
          key={position.join(":")}
          position={position}
          rotation={[index * 0.2, index * 0.35, index * 0.15]}
        >
          <octahedronGeometry args={[index % 2 ? 0.55 : 0.9, 0]} />
          <meshStandardMaterial
            color="#b8ffc7"
            emissive="#20bb50"
            emissiveIntensity={1.5}
            wireframe={index % 2 === 0}
          />
        </mesh>
      ))}
      <pointLight color="#41ff78" intensity={8} distance={38} />
    </group>
  );
};

export const ProjectAtmosphere = (): JSX.Element | null => {
  const index = useAppSelector((state) => state.projectCounter.value);

  switch (index) {
    case 8:
      return <PortfolioOrbit />;
    case 9:
      return <StackingField />;
    case 11:
      return <ScannerField />;
    default:
      return null;
  }
};
