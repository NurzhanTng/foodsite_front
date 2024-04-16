const getCenterOfPolygon = (points: [number, number][]) => {
  if (points.length === 0) {
    throw new Error("Cannot calculate center of an empty list of points");
  }
  const sumX = points.reduce((sum, [x, _]) => sum + x, 0);
  const sumY = points.reduce((sum, [_, y]) => sum + y, 0);
  return [sumX / points.length, sumY / points.length];
};

export default getCenterOfPolygon;
