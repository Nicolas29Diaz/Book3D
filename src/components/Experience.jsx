import { CameraControls } from "@react-three/drei";
import Book from "./Book";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { changeViewAtom } from "../constants/Constants";
export const Experience = () => {
  const cameraControlsRef = useRef();
  const [view, setView] = useAtom(changeViewAtom);
  const [prevView, setPrevView] = useState(view);
  const mobile = window.innerWidth < 768;

  // useEffect(() => {
  //   const camera = cameraControlsRef.current;
  //   let pos = {};
  //   camera.addEventListener("controlend", () => {
  //     pos = {
  //       x: camera._camera.position.x,
  //       y: camera._camera.position.y,
  //       z: camera._camera.position.z,
  //     };

  //     console.log("Camera position", pos);
  //     console.log("Camera target", camera._target);
  //   });
  // }, []);

  const moveCamera = (view, mobile) => {
    const cameraControl = cameraControlsRef.current;
    switch (view) {
      case "Left":
        mobile
          ? cameraControl.setLookAt(-0.75, 1.9, 2.58, -0.56, 0, -0.02, true)
          : cameraControl.setLookAt(-1.02, 1.54, 1.94, -0.73, -0.1, 0.05, true);
        break;
      case "Center":
        mobile
          ? cameraControl.setLookAt(0, 2.7, 5.36, 0, 0, 0, true)
          : cameraControl.setLookAt(0, 1.44, 2.62, -0.04, -0.1, 0.06, true);
        break;
      case "Right":
        mobile
          ? cameraControl.setLookAt(0.75, 1.9, 2.58, 0.56, 0, 0.02, true)
          : cameraControl.setLookAt(0.74, 1.54, 1.94, 0.52, -0.01, 0.15, true);
        break;
      case "Initial":
        console.log("Initial");
        mobile
          ? cameraControl.setLookAt(-0.41, 1.03, 3.27, 0.62, -0.14, 0.042, true)
          : cameraControl.setLookAt(-0.11, 0.42, 2.97, 0, 0, 0, true);
        break;
      default:
        break;
    }
  };

  const handleResize = useCallback(() => {
    setView(prevView);
  }, [setView, prevView]);

  useEffect(() => {
    if (!cameraControlsRef.current) return;
    if (view === "") return;
    moveCamera(view, mobile);
    setPrevView(view);
    setView("");
  }, [view, setView, mobile]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <>
      <Book />

      {/* <OrbitControls /> */}
      <CameraControls ref={cameraControlsRef}></CameraControls>
      {/* <Environment preset="studio"></Environment> */}
      <ambientLight intensity={1} />
      <directionalLight
        position={[2, 5, 2]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};
