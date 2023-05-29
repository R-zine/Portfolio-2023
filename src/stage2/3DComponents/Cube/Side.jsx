import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import gsap from "gsap";

export const Side = ({ rotateX, rotateY, rotateZ, position, args, html }) => {
  const ref = useRef(null);
  const secondRef = useRef(null);

  useFrame((state) => {
    if (rotateX) ref.current.rotation.x = rotateX;
    if (rotateY) ref.current.rotation.y = rotateY;
    if (rotateZ) ref.current.rotation.z = rotateZ;
  });

  if (!!position && !!args)
    return (
      <group>
        <mesh ref={ref} position={position} castShadow>
          <planeGeometry args={args} />
          <meshStandardMaterial
            metalness={1}
            roughness={0.005}
            color={"grey"}
            emissive={"purple"}
            emissiveIntensity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
        {html && (
          <>
            <mesh position={position} scale={0.99}>
              <planeGeometry ref={secondRef} args={args} />
              <meshStandardMaterial
                metalness={1}
                roughness={0.005}
                color={"grey"}
                emissive={"white"}
                emissiveIntensity={0.8}
                side={THREE.BackSide}
              />

              <Html
                position={[1.5, 2, -0.2]}
                rotation={[0, Math.PI, 0]}
                scale={1}
                wrapperClass="cubeHTML"
                // prepend // Project content behind the canvas (default: false)
                distanceFactor={1} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
                zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
                // portal={cubeRef} // Reference to target container (default=undefined)
                transform // If true, applies matrix3d transformations (default=false)
                castShadow
                // sprite={true} // Renders as sprite, but only in transform mode (default=false)
                // calculatePosition={(el: Object3D, camera: Camera, size: { width: number; height: number }) => number[]} // Override default positioning function. (default=undefined) [ignored in transform mode]
                occlude={false} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
                // onOcclude={(// visible) => null} // Callback when the visibility changes (default: undefined)
                // {...groupProps} // All THREE.Group props are valid
                // {...divProps} // All HTMLDivElement props are valid
              >
                <div
                  style={{
                    fontSize: 160,
                    color: "black",
                    fontWeight: 900,
                  }}
                >
                  <div>Shh!</div>
                </div>
              </Html>
              <Html
                position={[-0.5, 1.5, -0.2]}
                rotation={[0, Math.PI, 0]}
                scale={1}
                wrapperClass="cubeHTML"
                // prepend // Project content behind the canvas (default: false)
                distanceFactor={1} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
                zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
                // portal={cubeRef} // Reference to target container (default=undefined)
                transform // If true, applies matrix3d transformations (default=false)
                castShadow
                // sprite={true} // Renders as sprite, but only in transform mode (default=false)
                // calculatePosition={(el: Object3D, camera: Camera, size: { width: number; height: number }) => number[]} // Override default positioning function. (default=undefined) [ignored in transform mode]
                occlude={false} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
                // onOcclude={(// visible) => null} // Callback when the visibility changes (default: undefined)
                // {...groupProps} // All THREE.Group props are valid
                // {...divProps} // All HTMLDivElement props are valid
              >
                <div
                  style={{
                    fontSize: 160,
                    color: "black",
                    fontWeight: 900,
                  }}
                >
                  <div>Keep it a secret.</div>
                </div>
              </Html>
            </mesh>
            <group position={[-5, -2.5, 0]}>
              <mesh scale={0.99}>
                <planeGeometry args={args} />
                <meshStandardMaterial
                  metalness={1}
                  roughness={0.005}
                  color={"grey"}
                  emissive={"white"}
                  emissiveIntensity={0.8}
                  side={THREE.BackSide}
                />

                <Html
                  position={[0, 0, 0]}
                  rotation={[0, Math.PI, 0]}
                  scale={1}
                  // prepend // Project content behind the canvas (default: false)
                  distanceFactor={1} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
                  zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
                  // portal={cubeRef} // Reference to target container (default=undefined)
                  transform // If true, applies matrix3d transformations (default=false)
                  castShadow
                  // sprite={true} // Renders as sprite, but only in transform mode (default=false)
                  // calculatePosition={(el: Object3D, camera: Camera, size: { width: number; height: number }) => number[]} // Override default positioning function. (default=undefined) [ignored in transform mode]
                  occlude={false} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
                  // onOcclude={(// visible) => null} // Callback when the visibility changes (default: undefined)
                  // {...groupProps} // All THREE.Group props are valid
                  // {...divProps} // All HTMLDivElement props are valid
                >
                  <span
                    style={{
                      color: "red",
                      fontSize: 50,
                      transform: "translateY(-200%) !important",
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellendus, a. Reiciendis officiis veritatis illum
                    voluptatum corporis hic ratione adipisci tenetur!
                  </span>
                </Html>
              </mesh>
            </group>
            <mesh position={[5, -2.5, 0]} scale={0.99}>
              <planeGeometry args={args} />
              <meshStandardMaterial
                metalness={1}
                roughness={0.005}
                color={"grey"}
                emissive={"white"}
                emissiveIntensity={0.8}
                side={THREE.BackSide}
              />

              <Html
                position={[0, 0, 0]}
                rotation={[0, Math.PI, 0]}
                scale={1}
                wrapperClass="cubeHTML"
                // prepend // Project content behind the canvas (default: false)
                distanceFactor={1} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
                zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
                // portal={cubeRef} // Reference to target container (default=undefined)
                transform // If true, applies matrix3d transformations (default=false)
                castShadow
                // sprite={true} // Renders as sprite, but only in transform mode (default=false)
                // calculatePosition={(el: Object3D, camera: Camera, size: { width: number; height: number }) => number[]} // Override default positioning function. (default=undefined) [ignored in transform mode]
                occlude={false} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
                // onOcclude={(// visible) => null} // Callback when the visibility changes (default: undefined)
                // {...groupProps} // All THREE.Group props are valid
                // {...divProps} // All HTMLDivElement props are valid
              >
                <span
                  style={{
                    color: "red",
                    fontSize: 50,
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellendus, a. Reiciendis officiis veritatis illum voluptatum
                  corporis hic ratione adipisci tenetur!
                </span>
              </Html>
            </mesh>
          </>
        )}
      </group>
    );
  return null;
};
