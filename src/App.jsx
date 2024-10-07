import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useState } from "react";
import { UI } from "./components/UI";
import { Experience } from "./components/Experience";
import { dataAtom, generatePages, pagesAtom } from "./constants/Constants";
import PictureGenerator from "./components/PictureGenerator";
import { useAtomValue, useSetAtom } from "jotai";
import useFetch from "./hooks/useFetch";
// import { data } from "./constants/Data";

function App() {
  useFetch("https://dragonball-api.com/api/characters");
  const data = useAtomValue(dataAtom);
  const [loading, setLoading] = useState(true);

  const [pictures, setPictures] = useState([]);
  const setPages = useSetAtom(pagesAtom);

  const handleTexturesGenerated = useCallback((generatedTextures) => {
    setPictures(generatedTextures);
  }, []);

  useEffect(() => {
    if (pictures.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (!loading) {
      const pages = generatePages(pictures);
      setPages(pages);
      // console.log("pages", pages);
    }
  }, [pictures, loading, setPages]);

  useEffect(() => {
    // data.map((item) => {
    //   console.log("item", item.race);
    // });
  }, [data]);

  return (
    <>
      <PictureGenerator onGenerate={handleTexturesGenerated} data={data} />
      <UI />
      <Loader />
      <Canvas shadows camera={{ position: [0, 0, 3], fov: 45 }}>
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
