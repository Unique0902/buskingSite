export const calculateTotalPageNum = (
  resultTotalNum: number,
  resultNumPerPage: number
) => {
  return Math.floor((resultTotalNum - 1) / resultNumPerPage) + 1;
};
