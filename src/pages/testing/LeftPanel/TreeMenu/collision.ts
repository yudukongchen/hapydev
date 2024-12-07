import { pointerWithin } from '@dnd-kit/core';

export function customCollisionDetectionAlgorithm(args) {
  const pointerCollisions = pointerWithin(args);
  if (pointerCollisions.length > 0) {
    return pointerCollisions;
  }
  return [];
}
