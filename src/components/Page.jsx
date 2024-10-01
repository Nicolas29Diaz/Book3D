/* eslint-disable react/prop-types */
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { pages } from "../constants/Constants";
import { PAGE_DEPTH, manualSkinnedMesh } from "./PageGeometry";
import { pageMaterials } from "./PageMaterials";
import { SRGBColorSpace } from "three";
import { pageTransition } from "./PageTransition";

pages.forEach((page) => {
  useTexture.preload(`/textures/${page.front}.jpg`);
  useTexture.preload(`/textures/${page.back}.jpg`);
  useTexture.preload(`/textures/book-cover-roughness.jpg`);
});

function Page({
  pageNumber,
  front,
  back,
  currentPage,
  pageOpened,
  bookClosed,
  ...props
}) {
  const [pictureFront, pictureBack, pictureRoughness] = useTexture([
    `/textures/${front}.jpg`,
    `/textures/${back}.jpg`,
    ...(pageNumber === 0 || pageNumber === pages.length - 1
      ? [`/textures/book-cover-roughness.jpg`]
      : []),
  ]);
  pictureFront.colorSpace = pictureBack.colorSpace = SRGBColorSpace;

  const group = useRef();
  const skinnedMeshRef = useRef();
  const turnedAt = useRef(0);
  const lastOpened = useRef(pageOpened);
  const lastPageNumber = pages.length - 1;

  const pageSkinnedMesh = useMemo(() => {
    const materials = pageMaterials(
      pictureFront,
      pictureBack,
      pictureRoughness,
      pageNumber,
      lastPageNumber
    );
    return manualSkinnedMesh(materials);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, delta) => {
    pageTransition(
      skinnedMeshRef,
      lastOpened,
      pageOpened,
      turnedAt,
      bookClosed,
      pageNumber,
      group,
      delta
    );
  });

  return (
    <group {...props} ref={group}>
      <primitive
        object={pageSkinnedMesh}
        ref={skinnedMeshRef}
        position-z={-pageNumber * PAGE_DEPTH + currentPage * PAGE_DEPTH}
      />
    </group>
  );
}

export default Page;
