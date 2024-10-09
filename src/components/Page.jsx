/* eslint-disable react/prop-types */
import { useCursor, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  changeViewAtom,
  currentPageAtom,
  pagesAtom,
} from "../constants/Constants";
import { PAGE_DEPTH, manualSkinnedMesh } from "../constants/PageGeometry";
import { pageMaterials } from "../constants/PageMaterials";
import { SRGBColorSpace } from "three";
import { pageTransition } from "../constants/PageTransition";
import { useAtom, useSetAtom } from "jotai";

function Page({
  pageNumber,
  front,
  back,
  currentPage,
  pageOpened,
  bookClosed,
  ...props
}) {
  const [pages] = useAtom(pagesAtom);
  // pages.forEach((page) => {
  //   useTexture.preload(`/textures/${page.front}.jpg`);
  //   useTexture.preload(`/textures/${page.back}.jpg`);
  //   useTexture.preload(`/textures/book-cover-roughness.jpg`);
  // });

  const [pictureFront, pictureBack, pictureRoughness] = useTexture([
    front,
    back,
    ...(pageNumber === 0
      ? [`/textures/FrontRoughness.webp`]
      : pageNumber === pages.length - 1
      ? [`/textures/BackRoughness.webp`]
      : []),
  ]);

  pictureFront.colorSpace = pictureBack.colorSpace = SRGBColorSpace;

  const group = useRef();
  const skinnedMeshRef = useRef();
  const turnedAt = useRef(0);
  const lastOpened = useRef(pageOpened);
  const lastPageNumber = pages.length - 1;
  const [highlighted, setHighlighted] = useState(false);
  const setCurrentPage = useSetAtom(currentPageAtom);
  const setView = useSetAtom(changeViewAtom);

  useCursor(highlighted);

  useEffect(() => {
    if (!bookClosed) {
      setView("Center");
    }
  }, [bookClosed, setView]);

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
      highlighted,
      delta
    );
  });

  return (
    <group
      {...props}
      ref={group}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHighlighted(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHighlighted(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setCurrentPage(pageOpened ? pageNumber : pageNumber + 1);
      }}
    >
      <primitive
        object={pageSkinnedMesh}
        ref={skinnedMeshRef}
        position-z={-pageNumber * PAGE_DEPTH + currentPage * PAGE_DEPTH}
      />
    </group>
  );
}

export default Page;
