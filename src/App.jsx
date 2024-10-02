import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useState } from "react";
import { UI } from "./components/UI";
import { Experience } from "./components/Experience";
import { generatePages, pagesAtom } from "./constants/Constants";
import PictureGenerator from "./components/PictureGenerator";
import { useSetAtom } from "jotai";
import { data } from "./constants/Data";
function App() {
  const [pictures, setPictures] = useState([]);
  const setPages = useSetAtom(pagesAtom);

  const handleTexturesGenerated = useCallback((generatedTextures) => {
    setPictures(generatedTextures);
  }, []);

  useEffect(() => {
    if (pictures.length === 0) return;

    setPages(generatePages(pictures));
  }, [pictures, setPages]);

  return (
    <>
      <PictureGenerator onGenerate={handleTexturesGenerated} data={data} />
      <UI />
      <Loader />
      <Canvas shadows camera={{ position: [-0.5, 1, 4], fov: 45 }}>
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </>
  );
}

export default App;
