import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Html, Box } from "@react-three/drei";
import "./html.css";
import pointingImg from "./pointing.jpg";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { setContactCount } from "../../../app/contactsCounterSlice";
import { RigidBody } from "@react-three/rapier";
import emailjs from "@emailjs/browser";

emailjs.init("D0ctY-SwJYajvmMel");

export const Side = ({
  rotateX,
  rotateY,
  rotateZ,
  position,
  args,
  html,
  handleClick,
}) => {
  const [isHovered, setIsHovered] = useState({
    linkedin: false,
    git: false,
    reddit: false,
    email: false,
    message: false,
    send: false,
  });

  const [isHTML, setIsHTML] = useState(false);

  const [emailValue, setEmailValue] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const ref = useRef(null);
  const rigidRef = useRef(null);
  const reflectionRef = useRef(1);

  const contactPhase = useSelector((state) => state.contactCounter.value);

  const dispatch = useDispatch();

  useEffect(() => {
    if (html) setTimeout(() => setIsHTML(true), 1000);
  }, [html]);

  useEffect(() => {
    if (rigidRef.current && contactPhase === 4) {
      rigidRef.current.applyImpulse(
        {
          x: 0.5 * (Math.random() - 0.49),
          y: Math.random() - 0.49,
          z: 0.5 * (Math.random() * 0.49),
        },
        true
      );
      rigidRef.current.applyTorqueImpulse(
        {
          x: 0.5 * (Math.random() - 0.49),
          y: Math.random() - 0.49,
          z: 0.5 * (Math.random() * 0.49),
        },
        true
      );
    }
  }, [contactPhase, rigidRef]);

  useEffect(() => {
    if (Object.keys(isHovered).some((key) => isHovered[key]))
      document.body.classList.add("button");
    else document.body.classList.remove("button");
  }, [isHovered]);

  const pointingTexture = useLoader(THREE.TextureLoader, pointingImg);

  const handleHoverChange = (key, newValue) =>
    setIsHovered((prev) => ({ ...prev, [key]: newValue }));

  useFrame((state) => {
    if (rotateX) ref.current.rotation.x = rotateX;
    if (rotateY) ref.current.rotation.y = rotateY;
    if (rotateZ) ref.current.rotation.z = rotateZ;
  });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleFormSend = () => {
    if (validateEmail(emailValue) && !!messageValue) {
      emailjs
        .send("service_0lnz0ab", "template_dw76dor", {
          subject: "Portfolio 2023 Message Form",
          name: "System",
          email: emailValue,
          message: messageValue,
        })
        .then(
          function (response) {
            setEmailValue("Message sent!");
            setMessageValue("");
          },
          function (error) {
            setEmailValue("Sending failed");
          }
        );
    } else {
      setEmailValue("Invalid Email!");
    }
  };

  if (!!position && !!args)
    return (
      <group
        onClick={() => {
          if (handleClick) handleClick();
        }}
      >
        <RigidBody
          type="dynamic"
          restitution={1.3}
          friction={0.2}
          ref={rigidRef}
        >
          <Box
            args={args}
            ref={ref}
            onPointerEnter={() =>
              gsap.to(reflectionRef, {
                current: 2,
                duration: 1,
                overwrite: "auto",
              })
            }
            onPointerLeave={() =>
              gsap.to(reflectionRef, { current: 1, overwrite: "auto" })
            }
            position={position}
            castShadow
          >
            <meshStandardMaterial
              metalness={reflectionRef.current}
              roughness={0.005}
              color={"grey"}
              emissive={"purple"}
              emissiveIntensity={0.1}
              side={THREE.DoubleSide}
              bumpMap={pointingTexture}
              bumpScale={1}
              normalMap={pointingTexture}
            />
          </Box>
        </RigidBody>
        {isHTML && contactPhase !== 4 && (
          <>
            <mesh position={position} scale={0.99}>
              <RigidBody>
                <Box args={args}>
                  <meshStandardMaterial
                    metalness={1}
                    roughness={0.005}
                    color={"grey"}
                    emissive={"white"}
                    emissiveIntensity={0.8}
                    side={THREE.BackSide}
                  />
                </Box>
              </RigidBody>

              <Html
                position={[0, 1.7, 0]}
                rotation={[0, Math.PI, 0]}
                scale={10}
                wrapperClass="cubeHTML"
                distanceFactor={1} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
                zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
                transform // If true, applies matrix3d transformations (default=false)
                castShadow
                occlude={false} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
              >
                <div
                  style={{
                    fontSize: 16,
                    color: "black",
                    fontWeight: 900,
                  }}
                >
                  <div>This is a secret.</div>
                </div>
              </Html>
              <Html
                position={[0, 1, 0]}
                rotation={[0, Math.PI, 0]}
                scale={10}
                wrapperClass="cubeHTML"
                distanceFactor={1} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
                zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
                transform // If true, applies matrix3d transformations (default=false)
                castShadow
                occlude={false} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
              >
                <div
                  style={{
                    fontSize: 22,
                    color: "black",
                    fontWeight: 900,
                  }}
                >
                  <div>Don't tell anyone.</div>
                </div>
              </Html>
            </mesh>
            <group
              onPointerEnter={() =>
                contactPhase !== 4 && dispatch(setContactCount(3))
              }
              position={[-5, -2.5, 0]}
            >
              <mesh scale={0.99}>
                <RigidBody>
                  <Box args={args}>
                    <meshStandardMaterial
                      metalness={1}
                      roughness={0.005}
                      color={"grey"}
                      emissive={"white"}
                      emissiveIntensity={0.8}
                      side={THREE.BackSide}
                    />
                  </Box>
                </RigidBody>
                <Html
                  position={[0, 1.7, -1]}
                  rotation={[0, Math.PI, 0]}
                  scale={10}
                  distanceFactor={1} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
                  zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
                  transform // If true, applies matrix3d transformations (default=false)
                  castShadow
                  occlude={false} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
                >
                  <span
                    style={{
                      color: "black",
                      fontSize: 16,
                    }}
                  >
                    Socials:
                  </span>
                </Html>
                <Html
                  position={[0, 0.9, -1]}
                  rotation={[0, Math.PI, 0]}
                  scale={10}
                  distanceFactor={1} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
                  zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
                  transform // If true, applies matrix3d transformations (default=false)
                  castShadow
                  occlude={false} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
                >
                  <div
                    onPointerEnter={() => handleHoverChange("linkedin", true)}
                    onPointerLeave={() => handleHoverChange("linkedin", false)}
                    style={{
                      fontSize: 16,
                      display: "flex",
                      gap: 10,
                      border: "1px solid black",
                      borderRadius: 1.5,
                      padding: 1.5,
                      backgroundColor: isHovered.linkedin
                        ? "black"
                        : "#00000000",
                      transition: "0.5s",
                      width: isHovered.linkedin ? 95 : 75,
                    }}
                  >
                    <div
                      style={{
                        height: 18,
                        marginTop: -1.5,
                        filter: isHovered.linkedin ? "invert(100%)" : "none",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                      </svg>
                    </div>
                    <div
                      onPointerEnter={() => handleHoverChange("linkedin", true)}
                      onPointerLeave={() =>
                        handleHoverChange("linkedin", false)
                      }
                      onClick={() =>
                        window.open(
                          "https://www.linkedin.com/in/ivan-radev/",
                          "_blank"
                        )
                      }
                      style={{
                        color: isHovered.linkedin ? "white" : "black",
                        fontSize: 10,
                        textIndent: isHovered.linkedin ? 20 : 0,
                        textShadow: isHovered.linkedin
                          ? "-20px 0 2px white"
                          : "0 0 0 0 white",
                        transition: "0.5s",
                      }}
                    >
                      Ivan Radev
                    </div>
                  </div>
                </Html>
                <Html
                  position={[0, 0, -1]}
                  rotation={[0, Math.PI, 0]}
                  scale={10}
                  distanceFactor={1} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
                  zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
                  transform // If true, applies matrix3d transformations (default=false)
                  castShadow
                  occlude={false} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
                >
                  <div
                    onPointerEnter={() => handleHoverChange("git", true)}
                    onPointerLeave={() => handleHoverChange("git", false)}
                    onClick={() =>
                      window.open("https://github.com/R-zine", "_blank")
                    }
                    style={{
                      fontSize: 16,
                      display: "flex",
                      gap: 10,
                      border: "1px solid black",
                      borderRadius: 1.5,
                      padding: 1.5,
                      backgroundColor: isHovered.git ? "black" : "#00000000",
                      transition: "0.5s",
                      width: isHovered.git ? 95 : 75,
                    }}
                  >
                    <div
                      style={{
                        height: 18,
                        marginTop: -1.5,
                        filter: isHovered.git ? "invert(100%)" : "none",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 496 512"
                      >
                        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                      </svg>
                    </div>
                    <div
                      onPointerEnter={() => handleHoverChange("git", true)}
                      onPointerLeave={() => handleHoverChange("git", false)}
                      style={{
                        color: isHovered.git ? "white" : "black",
                        fontSize: 10,
                        textIndent: isHovered.git ? 20 : 0,
                        textShadow: isHovered.git
                          ? "-20px 0 2px white"
                          : "0 0 0 0 white",
                        transition: "0.5s",
                      }}
                    >
                      R-zine
                    </div>
                  </div>
                </Html>
                <Html
                  position={[0, -0.9, -1]}
                  rotation={[0, Math.PI, 0]}
                  scale={10}
                  distanceFactor={1} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
                  zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
                  transform // If true, applies matrix3d transformations (default=false)
                  castShadow
                  occlude={false} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
                >
                  <div
                    onPointerEnter={() => handleHoverChange("reddit", true)}
                    onPointerLeave={() => handleHoverChange("reddit", false)}
                    onClick={() =>
                      window.open(
                        "https://www.reddit.com/user/IvanRadevHorror",
                        "_blank"
                      )
                    }
                    style={{
                      fontSize: 16,
                      display: "flex",
                      gap: 10,
                      border: "1px solid black",
                      borderRadius: 1.5,
                      padding: 1.5,
                      backgroundColor: isHovered.reddit ? "black" : "#00000000",
                      transition: "0.5s",
                      width: isHovered.reddit ? 95 : 75,
                    }}
                  >
                    <div
                      style={{
                        height: 18,
                        marginTop: -1.5,
                        filter: isHovered.reddit ? "invert(100%)" : "none",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M201.5 305.5c-13.8 0-24.9-11.1-24.9-24.6 0-13.8 11.1-24.9 24.9-24.9 13.6 0 24.6 11.1 24.6 24.9 0 13.6-11.1 24.6-24.6 24.6zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-132.3-41.2c-9.4 0-17.7 3.9-23.8 10-22.4-15.5-52.6-25.5-86.1-26.6l17.4-78.3 55.4 12.5c0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.3 24.9-24.9s-11.1-24.9-24.9-24.9c-9.7 0-18 5.8-22.1 13.8l-61.2-13.6c-3-.8-6.1 1.4-6.9 4.4l-19.1 86.4c-33.2 1.4-63.1 11.3-85.5 26.8-6.1-6.4-14.7-10.2-24.1-10.2-34.9 0-46.3 46.9-14.4 62.8-1.1 5-1.7 10.2-1.7 15.5 0 52.6 59.2 95.2 132 95.2 73.1 0 132.3-42.6 132.3-95.2 0-5.3-.6-10.8-1.9-15.8 31.3-16 19.8-62.5-14.9-62.5zM302.8 331c-18.2 18.2-76.1 17.9-93.6 0-2.2-2.2-6.1-2.2-8.3 0-2.5 2.5-2.5 6.4 0 8.6 22.8 22.8 87.3 22.8 110.2 0 2.5-2.2 2.5-6.1 0-8.6-2.2-2.2-6.1-2.2-8.3 0zm7.7-75c-13.6 0-24.6 11.1-24.6 24.9 0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.1 24.9-24.6 0-13.8-11-24.9-24.9-24.9z" />
                      </svg>
                    </div>
                    <div
                      onPointerEnter={() => handleHoverChange("reddit", true)}
                      onPointerLeave={() => handleHoverChange("reddit", false)}
                      style={{
                        color: isHovered.reddit ? "white" : "black",
                        fontSize: 10,
                        textIndent: isHovered.reddit ? 20 : 0,
                        textShadow: isHovered.reddit
                          ? "-20px 0 2px white"
                          : "0 0 0 0 white",
                        transition: "0.5s",
                      }}
                    >
                      ???
                    </div>
                  </div>
                </Html>
              </mesh>
            </group>
            <mesh
              position={[5, -2.5, 0]}
              scale={0.99}
              onPointerEnter={() =>
                contactPhase !== 4 && dispatch(setContactCount(5))
              }
            >
              <RigidBody>
                <Box args={args}>
                  <meshStandardMaterial
                    metalness={1}
                    roughness={0.005}
                    color={"grey"}
                    emissive={"white"}
                    emissiveIntensity={0.8}
                    side={THREE.BackSide}
                  />
                </Box>
              </RigidBody>
              <Html
                position={[0, 1.7, -1]}
                rotation={[0, Math.PI, 0]}
                scale={10}
                distanceFactor={1} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
                zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
                transform // If true, applies matrix3d transformations (default=false)
                castShadow
                occlude={false} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
              >
                <span
                  style={{
                    color: "black",
                    fontSize: 16,
                  }}
                >
                  Connect:
                </span>
              </Html>
              <Html
                position={[0, 0.9, -1]}
                rotation={[0, Math.PI, 0]}
                scale={10}
                distanceFactor={1} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
                zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
                transform // If true, applies matrix3d transformations (default=false)
                castShadow
                occlude={false} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
              >
                <div
                  onPointerEnter={() => handleHoverChange("email", true)}
                  onPointerLeave={() => handleHoverChange("email", false)}
                  style={{
                    fontSize: 16,
                    display: "flex",
                    gap: 10,
                    border: "1px solid black",
                    borderRadius: 1.5,
                    transition: "0.5s",
                    width: isHovered.email ? 115 : 105,
                  }}
                >
                  <input
                    type="email"
                    placeholder="Email"
                    className="input"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                  />
                </div>
              </Html>
              <Html
                position={[0, -0.3, -1]}
                rotation={[0, Math.PI, 0]}
                scale={10}
                distanceFactor={1} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
                zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
                transform // If true, applies matrix3d transformations (default=false)
                castShadow
                occlude={false} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
              >
                <div
                  onPointerEnter={() => handleHoverChange("message", true)}
                  onPointerLeave={() => handleHoverChange("message", false)}
                  className="textarea"
                  style={{
                    border: "1px solid black",
                    borderRadius: 1.5,
                    transition: "0.5s",
                    width: 105,
                    justifyItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <textarea
                    placeholder="Message"
                    className="textarea"
                    value={messageValue}
                    onChange={(e) => setMessageValue(e.target.value)}
                  />
                </div>
              </Html>
              <Html
                position={[0, -1.8, -1]}
                rotation={[0, Math.PI, 0]}
                scale={8}
                distanceFactor={1} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
                zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
                transform // If true, applies matrix3d transformations (default=false)
                castShadow
                sprite={true} // Renders as sprite, but only in transform mode (default=false)
                occlude={false} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
              >
                {!emailValue || !messageValue ? (
                  <>
                    <div
                      style={{
                        color: "black",
                        fontSize: 20,
                      }}
                    >
                      Nobody
                    </div>
                    <div
                      style={{
                        color: "black",
                        fontSize: 20,
                      }}
                    >
                      can see this.
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      onPointerEnter={() => handleHoverChange("send", true)}
                      onPointerLeave={() => handleHoverChange("send", false)}
                      onClick={() => handleFormSend()}
                      style={{
                        fontSize: 16,
                        display: "flex",
                        gap: 10,
                        border: "1px solid black",
                        borderRadius: 1.5,
                        padding: 1.5,
                        backgroundColor: isHovered.send ? "black" : "#00000000",
                        transition: "0.5s",
                        width: isHovered.send ? 95 : 75,
                      }}
                    >
                      <div
                        style={{
                          height: 18,
                          marginTop: -1.5,
                          filter: isHovered.send ? "invert(100%)" : "none",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 448 512"
                        >
                          <path d="M384 32c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H384zM160 144c-13.3 0-24 10.7-24 24s10.7 24 24 24h94.1L119 327c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l135-135V328c0 13.3 10.7 24 24 24s24-10.7 24-24V168c0-13.3-10.7-24-24-24H160z" />
                        </svg>
                      </div>
                      <div
                        onPointerEnter={() => handleHoverChange("send", true)}
                        onPointerLeave={() => handleHoverChange("send", false)}
                        style={{
                          color: isHovered.send ? "white" : "black",
                          fontSize: 10,
                          textIndent: isHovered.send ? 20 : 0,
                          textShadow: isHovered.send
                            ? "-20px 0 2px white"
                            : "0 0 0 0 white",
                          transition: "0.5s",
                        }}
                      >
                        Send
                      </div>
                    </div>
                  </>
                )}
              </Html>
            </mesh>
          </>
        )}
      </group>
    );
  return null;
};
