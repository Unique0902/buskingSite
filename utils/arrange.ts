export const compareByTextWhenSort = (
  a: string,
  b: string,
  isAscending: boolean
) => {
  if (a.toLowerCase() > b.toLowerCase()) return isAscending ? 1 : -1;
  else if (a.toLowerCase() < b.toLowerCase()) return isAscending ? -1 : 1;
  else return 0;
};
export const compareByNumberWhenSort = (
  a: number,
  b: number,
  isAscending: boolean
) => (isAscending ? a - b : b - a);
