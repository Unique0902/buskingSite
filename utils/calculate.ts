export const calculateTotalPageNum = (
  resultTotalNum: number,
  resultNumPerPage: number
) => {
  if (resultTotalNum < 0)
    throw new Error('resultTotalNum must be positive or zero');
  if (resultNumPerPage <= 0)
    throw new Error('resultNumPerPage must be positive');
  if (!Number.isInteger(resultNumPerPage))
    throw new Error('resultNumPerPage must be integer');
  if (!Number.isInteger(resultTotalNum))
    throw new Error('resultTotalNum must be integer');
  return Math.floor((resultTotalNum - 1) / resultNumPerPage) + 1;
};

export const calculateDataIdxInTable = (
  idx: number,
  nowPageNum: number,
  numPerPage: number
) => (nowPageNum - 1) * numPerPage + idx + 1;
