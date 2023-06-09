import { Box } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export const Floor = () => {
  return (
    <RigidBody restitution={2} type="fixed">
      <Box args={[1000, 1, 1000]} position={[0, -0.6, 0]} receiveShadow>
        <meshStandardMaterial metalness={0.7} roughness={0.6} color={"grey"} />
      </Box>
    </RigidBody>
  );
};
