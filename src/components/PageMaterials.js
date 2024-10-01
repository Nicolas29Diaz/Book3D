import { Color, MeshStandardMaterial } from "three";

const whiteColor = new Color("white");

export const pageMaterials = (
  pictureFront,
  pictureBack,
  pictureRoughness,
  pageNumber,
  lastPageNumber
) => {
  return [
    new MeshStandardMaterial({
      color: whiteColor,
    }),
    new MeshStandardMaterial({
      color: "#111",
    }),
    new MeshStandardMaterial({
      color: whiteColor,
    }),
    new MeshStandardMaterial({
      color: whiteColor,
    }),
    new MeshStandardMaterial({
      color: whiteColor,
      map: pictureFront,
      ...(pageNumber === 0
        ? { roughnessMap: pictureRoughness }
        : { roughness: 0.1 }),
    }),
    new MeshStandardMaterial({
      color: whiteColor,
      map: pictureBack,
      ...(pageNumber === lastPageNumber
        ? { roughnessMap: pictureRoughness }
        : { roughness: 0.1 }),
    }),
  ];
};
