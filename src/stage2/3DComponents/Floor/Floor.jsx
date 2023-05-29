export const Floor = () => {
  return (
    <mesh position={[0, -0.6, 0]} receiveShadow>
      <boxGeometry args={[1000, 1, 1000]} />
      <meshStandardMaterial metalness={0.7} roughness={0.6} color={"grey"} />
    </mesh>
  );
};
