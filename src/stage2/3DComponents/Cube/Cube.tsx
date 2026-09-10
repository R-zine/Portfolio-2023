import { Sparkles } from "@react-three/drei";
import { Side } from "./Side";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { incrementContact } from "../../../app/contactsCounterSlice";
import { useEffect, useState } from "react";

export const Cube = () => {
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitial(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const contactPhase = useAppSelector((state) => state.contactCounter.value);

  const dispatch = useAppDispatch();

  return (
    <group position={[20, 5, 0]} castShadow receiveShadow>
      {/* top */}
      <Side
        args={[5, 5, 0.01]}
        html={contactPhase === 3}
        position={[0, 0, 0]}
        rotateX={Math.PI / 2}
        rotateZ={Math.PI}
        handleClick={
          contactPhase === 1 && !isInitial
            ? () => dispatch(incrementContact())
            : null
        }
      />
      {/* bottom */}
      <Side args={[5, 5, 0.01]} position={[0, -5, 0]} rotateX={Math.PI / 2} />
      {/* back */}
      <Side
        args={[5, 5, 0.01]}
        position={[-2.5, -2.5, 0]}
        rotateY={Math.PI / 2}
      />
      {/* front */}
      <Side
        args={[5, 5, 0.01]}
        position={[2.5, -2.5, 0]}
        rotateY={Math.PI / 2}
        handleClick={
          contactPhase === 2 && !isInitial
            ? () => dispatch(incrementContact())
            : null
        }
      />
      {/* left */}
      <Side
        args={[5, 5, 0.01]}
        position={[0, -2.5, 2.5]}
        rotateZ={Math.PI / 2}
        handleClick={
          contactPhase === 0 && !isInitial
            ? () => dispatch(incrementContact())
            : null
        }
      />
      {/* right */}
      <Side
        args={[5, 5, 0.01]}
        position={[0, -2.5, -2.5]}
        rotateZ={Math.PI / 2}
      />

      <Sparkles count={570} scale={10} size={5} speed={0.9} />
    </group>
  );
};
