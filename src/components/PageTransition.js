import { easing } from "maath";
import { degToRad } from "three/src/math/MathUtils.js";

export const pageTransition = (
  skinnedMeshRef,
  lastOpened,
  pageOpened,
  turnedAt,
  bookClosed,
  pageNumber,
  group,
  delta
) => {
  const easingFactor = 0.5;
  const insideCurveStrength = 0.18;
  const outsideCurveStrength = 0.05;
  const turningCurveStrength = 0.09;
  const easingFactorFold = 0.3;

  if (!skinnedMeshRef.current) return;

  if (lastOpened.current !== pageOpened) {
    turnedAt.current = +new Date();
    lastOpened.current = pageOpened;
  }
  let turningTime = Math.min(400, new Date() - turnedAt.current) / 400;
  turningTime = Math.sin(turningTime * Math.PI);

  let targetRotation = pageOpened ? -Math.PI / 2.1 : Math.PI / 2.1;

  if (!bookClosed) {
    targetRotation += degToRad(pageNumber * 0.8);
  }

  const bones = skinnedMeshRef.current.skeleton.bones;
  for (let i = 0; i < bones.length; i++) {
    const targetObject = i === 0 ? group.current : bones[i];

    const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
    const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
    const turningIntensity =
      Math.sin(i * Math.PI * (1 / bones.length)) * turningTime;

    let rotationAngle =
      targetRotation * insideCurveIntensity * insideCurveStrength -
      targetRotation * outsideCurveIntensity * outsideCurveStrength +
      turningCurveStrength * turningIntensity * targetRotation;

    let foldRotationAngle = degToRad(Math.sign(targetRotation) * 2);

    if (bookClosed) {
      if (i === 0) {
        rotationAngle = targetRotation;
      } else {
        rotationAngle = 0;
      }
    }
    easing.dampAngle(
      targetObject.rotation,
      "y",
      rotationAngle,
      easingFactor,
      delta
    );

    const foldIntensity =
      i > 8
        ? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) * turningTime
        : 0;
    easing.dampAngle(
      targetObject.rotation,
      "x",
      foldRotationAngle * foldIntensity,
      easingFactorFold,
      delta
    );
  }
};
