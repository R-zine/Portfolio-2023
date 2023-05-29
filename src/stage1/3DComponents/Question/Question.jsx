import { Sphere, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
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
          args={[5, 4, 2]}
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
