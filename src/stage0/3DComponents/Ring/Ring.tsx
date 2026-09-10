import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import pointingImg from "./barcode.png";
import gsap from "gsap";
import { useScroll } from "@react-three/drei";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setAboutCount } from "../../../app/aboutSlice";
import { triggerWarning } from "../../../app/mainSlice";

interface PointerPosition {
  x: number;
  y: number;
}

interface RingProps {
  scale?: number;
  pos: PointerPosition;
  rotationMultiplier: number;
  color: THREE.ColorRepresentation;
  handleGlitchDisk?: (value: boolean) => void;
  onClick?: () => void;
  isAbout: boolean;
}

export const Ring = ({
  scale,
  pos,
  rotationMultiplier,
  color,
  handleGlitchDisk,
  onClick,
  isAbout,
}: RingProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const { value: offset, isBack } = useAppSelector(
    (state) => state.aboutCounter
  );

  const warningState = useAppSelector((state) => state.main.warning);

  const outerRingRef1 = useRef<
    THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>
  >(null);
  const innerRingRef1 = useRef<
    THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>
  >(null);
  const surfaceRef = useRef<
    THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>
  >(null);

  const groupRef = useRef<THREE.Group>(null);

  const scroll = useScroll();

  const dispatch = useAppDispatch();

  useFrame((_state, delta) => {
    if (scale === 0.5 && !isBack && isAbout)
      dispatch(setAboutCount(scroll.offset));

    if (!warningState.wasTriggered && scale === 0.5) {
      if (delta > 0.4 && delta < 0.6) dispatch(triggerWarning("fps"));
    }
  });

  useEffect(() => {
    if (!outerRingRef1.current || !innerRingRef1.current || !surfaceRef.current)
      return;

    outerRingRef1.current.material.displacementScale = offset * 30;
    innerRingRef1.current.material.displacementScale = offset * 60;
    surfaceRef.current.material.displacementScale = offset * 60;
  }, [offset]);

  const pointingTexture = useLoader(
    THREE.TextureLoader,
    pointingImg
  ) as THREE.Texture;

  useEffect(() => {
    if (outerRingRef1.current) outerRingRef1.current.rotation.x = Math.PI / 2;
    if (innerRingRef1.current) innerRingRef1.current.rotation.x = Math.PI / 2;
  }, [outerRingRef1, innerRingRef1]);

  useEffect(() => {
    if (groupRef.current && pos) {
      groupRef.current.rotation.x = pos.y * rotationMultiplier;
      groupRef.current.rotation.y = pos.x * rotationMultiplier;
    }
  }, [pos, rotationMultiplier]);

  useEffect(() => {
    const materials = [
      surfaceRef.current?.material,
      outerRingRef1.current?.material,
      innerRingRef1.current?.material,
    ].filter(
      (material): material is THREE.MeshStandardMaterial => Boolean(material)
    );

    gsap.to(materials, {
      emissiveIntensity: isHovered ? 0.5 : 0.05,
      duration: 0.2,
      overwrite: "auto",
    });
    document.body.classList.toggle("button", isHovered);

    return () => {
      gsap.killTweensOf(materials);
      document.body.classList.remove("button");
    };
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
      onClick={typeof onClick === "function" ? onClick : undefined}
    >
      <mesh position={[0, 0, 0]} ref={surfaceRef} receiveShadow castShadow>
        <ringGeometry args={[10, 12, 50]} />
        <meshStandardMaterial
          color={color}
          roughness={0.05}
          metalness={1}
          emissive={color}
          emissiveIntensity={0.05}
          displacementMap={pointingTexture}
          displacementScale={0}
        />
      </mesh>

      <mesh position={[0, 0, -1]} ref={outerRingRef1} receiveShadow castShadow>
        <cylinderBufferGeometry args={[12, 12, 2, 70, 2, true]} />
        <meshStandardMaterial
          color={color}
          roughness={0.05}
          metalness={1}
          emissive={color}
          emissiveIntensity={0.05}
          bumpMap={pointingTexture}
          bumpScale={1}
          displacementMap={pointingTexture}
          displacementScale={0}
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
          emissiveIntensity={0.05}
          bumpMap={pointingTexture}
          bumpScale={1}
          displacementMap={pointingTexture}
          displacementScale={0}
        />
      </mesh>
    </group>
  );
};
