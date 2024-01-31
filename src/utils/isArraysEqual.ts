const isArraysEqual = (list1: number[], list2: number[]): boolean => {
  return (
    list1.length === list2.length &&
    list1.every((value, index) => value === list2[index])
  );
};

export default isArraysEqual;
