import { Sphere, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../../app/projectCounterSlice";

export const Question = () => {
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();

  const value = useSelector((state) => state.projectCounter.value);

  const groupRef = useRef(null);

  useFrame(({ clock }) => {
    if (groupRef.current)
      groupRef.current.rotation.y = clock.getElapsedTime() / -2;
  });

  const sphereArgs = useMemo(() => {
    if (!value || value === 1) return [5, 4, 2];
    if (value === 2) return [5, 4, 3];
    if (value === 3) return [5, 4, 4];
    if (value === 4) return [5, 4, 6];
    if (value === 5) return [5, 4, 9];
    if (value === 6) return [5, 4, 12];
    if (value === 7) return [5, 4, 16];
    return [5, 4, 20];
  }, [value]);

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
            color={isHovered ? "white" : "crimson"}
            roughness={1}
            metalness={0.5}
          />
        </Sphere>
      </group>
    </>
  );
};
