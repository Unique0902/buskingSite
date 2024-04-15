import { calculateTotalPageNum } from './../calculate';
import { describe, expect, it } from '@jest/globals';
describe('calculateTotalPageNum util function test', () => {
  it('resultTotalNum = 2, resultNumPerPage = 6 normal case', () => {
    const resultTotalNum = 2;
    const resultNumPerPage = 6;
    expect(calculateTotalPageNum(resultTotalNum, resultNumPerPage)).toBe(1);
  });
  it('resultTotalNum, resultNumPerPage are same case', () => {
    const resultTotalNum = 6;
    const resultNumPerPage = 6;
    expect(calculateTotalPageNum(resultTotalNum, resultNumPerPage)).toBe(1);
  });
  it('total page 2 case', () => {
    const resultTotalNum = 7;
    const resultNumPerPage = 6;
    expect(calculateTotalPageNum(resultTotalNum, resultNumPerPage)).toBe(2);
  });
  it('0 case', () => {
    expect(calculateTotalPageNum(0, 6)).toBe(0);
    expect(() => calculateTotalPageNum(6, 0)).toThrow(
      'resultNumPerPage must be positive'
    );
    expect(() => calculateTotalPageNum(0, 0)).toThrow(
      'resultNumPerPage must be positive'
    );
  });
  it('negative case', () => {
    expect(() => calculateTotalPageNum(-3, 6)).toThrow(
      'resultTotalNum must be positive or zero'
    );
    expect(() => calculateTotalPageNum(6, -3)).toThrow(
      'resultNumPerPage must be positive'
    );
    expect(() => calculateTotalPageNum(-3, -3)).toThrow(
      'resultTotalNum must be positive or zero'
    );
  });
});
