import { Environment } from "@react-three/drei";

export const Lights = () => {
  return (
    <>
      <Environment files="/sky.hdr" />
      <ambientLight intensity={0.1} color={"red"} />
      <ambientLight intensity={1} color={"purple"} />
      <ambientLight intensity={10} color={"grey"} />
      <pointLight position={[10, 10, 10]} color={"grey"} castShadow />
      <spotLight
        castShadow
        position={[10, 20, 10]}
        penumbra={1}
        intensity={3}
        color="blue"
      />
      <color attach="background" args={["#010108"]} />
    </>
  );
};
