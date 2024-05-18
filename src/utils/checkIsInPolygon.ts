const checkIsInPolygon = (
  polygon: [number, number][],
  point: [number, number],
) => {
  let x = Math.min(point[0], point[1]);
  let y = Math.max(point[0], point[1]);

  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    let xi = Math.min(polygon[i][0], polygon[i][1]);
    let yi = Math.max(polygon[i][0], polygon[i][1]);
    let xj = Math.min(polygon[j][0], polygon[j][1]);
    let yj = Math.max(polygon[j][0], polygon[j][1]);

    let intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
};

export default checkIsInPolygon;
