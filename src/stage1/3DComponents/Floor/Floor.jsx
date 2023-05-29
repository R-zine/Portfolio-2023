import { MeshReflectorMaterial, Plane, Box } from "@react-three/drei";

export const Floor = () => {
  return (
    <>
      <Box args={[1000, 1, 1000]} receiveShadow position={[0, -2, 0]}>
        <MeshReflectorMaterial
          blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
          mixBlur={0.4} // How much blur mixes with surface roughness (default = 1)
          mixStrength={0.3} // Strength of the reflections
          mixContrast={1} // Contrast of the reflections
          resolution={100} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthScale={0.4} // Scale the depth factor (0 = no depth, default = 0)
          minDepthThreshold={0.2} // Lower edge for the depthTexture interpolation (default = 0)
          maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
          reflectorOffset={-4} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        />
      </Box>
    </>
  );
};
