function range(start: number, end: number, step: number = 1) {
  const rangeArray = [];
  for (let i = start; i < end; i += step) {
    rangeArray.push(i);
  }
  return rangeArray;
}

export default range;