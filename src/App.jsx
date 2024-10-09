import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useState } from "react";
import { UI } from "./components/UI";
import { Experience } from "./components/Experience";
import { dataAtom, generatePages, pagesAtom } from "./constants/Constants";
import PictureGenerator from "./components/PictureGenerator";
import { useAtomValue, useSetAtom } from "jotai";
import useFetch from "./hooks/useFetch";
import LoadingScreen from "./components/LoadingScreen";
// import { data } from "./constants/Data";

function App() {
  useFetch();
  const data = useAtomValue(dataAtom);
  const [loadedPictures, setLoadedPictures] = useState(false);

  const [pictures, setPictures] = useState([]);
  const setPages = useSetAtom(pagesAtom);

  const handleTexturesGenerated = useCallback((generatedTextures) => {
    setPictures(generatedTextures);
  }, []);

  useEffect(() => {
    if (pictures.length === 0) {
      setLoadedPictures(false);
    } else {
      setLoadedPictures(true);
    }

    if (loadedPictures) {
      const pages = generatePages(pictures);
      setPages(pages);
    }
  }, [pictures, loadedPictures, setPages]);

  // useEffect(() => {
  //   // data.map((item) => {
  //   //   console.log("item", item.race);
  //   // });
  //   if (data.length === 0) return;
  //   console.log("data", data[4].description);
  // }, [data]);

  // useEffect(() => {
  //   if (loadingPictures) {
  //     console.log("Loaded");
  //   } else {
  //     console.log("loading");
  //   }
  // }, [loadingPictures]);

  return (
    <>
      <LoadingScreen loadedPictures={loadedPictures}></LoadingScreen>
      <PictureGenerator onGenerate={handleTexturesGenerated} data={data} />
      <UI />
      {/* <Loader /> */}
      <Canvas shadows camera={{ position: [0, 0, 3], fov: 45 }}>
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
            <Preload all />
          </Suspense>
        </group>
      </Canvas>
    </>
  );
}

export default App;
