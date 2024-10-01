import {
  Bone,
  BoxGeometry,
  Float32BufferAttribute,
  Skeleton,
  SkinnedMesh,
  Uint16BufferAttribute,
  Vector3,
} from "three";

export const PAGE_WIDTH = 1.28;
export const PAGE_HEIGHT = 1.71;
export const PAGE_DEPTH = 0.003;
export const PAGE_SEGMENTS = 30;
export const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

export const pageGeomety = new BoxGeometry(
  PAGE_WIDTH,
  PAGE_HEIGHT,
  PAGE_DEPTH,
  PAGE_SEGMENTS,
  2
);

pageGeomety.translate(PAGE_WIDTH / 2, 0, 0);

const position = pageGeomety.attributes.position;
const vertex = new Vector3();
const skinIndexes = [];
const skinWeights = [];

for (let i = 0; i < position.count; i++) {
  vertex.fromBufferAttribute(position, i);
  const x = vertex.x;

  const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
  let skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;

  skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
  skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}

pageGeomety.setAttribute(
  "skinIndex",
  new Uint16BufferAttribute(skinIndexes, 4)
);
pageGeomety.setAttribute(
  "skinWeight",
  new Float32BufferAttribute(skinWeights, 4)
);

export const manualSkinnedMesh = (pageMaterials) => {
  const bones = [];
  for (let i = 0; i <= PAGE_SEGMENTS; i++) {
    const bone = new Bone();
    bones.push(bone);
    if (i === 0) {
      bone.position.x = 0;
    } else {
      bone.position.x = SEGMENT_WIDTH;
    }

    if (i > 0) {
      bones[i - 1].add(bone);
    }
  }
  const skeleton = new Skeleton(bones);
  //   const materials = [
  //     ...pageMaterials,
  //     new MeshStandardMaterial({
  //       color: whiteColor,
  //       map: pictureFront,
  //       ...(number === 0
  //         ? { roughnessMap: pictureRoughness }
  //         : { roughness: 0.1 }),
  //     }),
  //     new MeshStandardMaterial({
  //       color: whiteColor,
  //       map: pictureBack,
  //       ...(number === pages.length - 1
  //         ? { roughnessMap: pictureRoughness }
  //         : { roughness: 0.1 }),
  //     }),
  //   ];
  const materials = pageMaterials;
  const mesh = new SkinnedMesh(pageGeomety, materials);
  mesh.castShadow = true;
  mesh.frustumCulled = false;
  mesh.add(skeleton.bones[0]);
  mesh.bind(skeleton);

  return mesh;
};
