import { Color, MeshStandardMaterial } from "three";

const whiteColor = new Color("white");
const emissiveColor = new Color("orange");

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
      map: pictureFront,
      emissive: emissiveColor,
      emissiveIntensity: 0,
      ...(pageNumber === 0
        ? { roughnessMap: pictureRoughness }
        : { roughness: 0.4 }),
    }),
    new MeshStandardMaterial({
      map: pictureBack,
      emissive: emissiveColor,
      emissiveIntensity: 0,
      ...(pageNumber === lastPageNumber
        ? { roughnessMap: pictureRoughness }
        : { roughness: 0.4 }),
    }),
  ];
};
