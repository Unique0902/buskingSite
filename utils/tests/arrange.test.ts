import { compareByTextWhenSort, compareByNumberWhenSort } from './../arrange';
import { describe, expect, it } from '@jest/globals';

describe('arrange string or number array', () => {
  const strArr = ['b', 'c', 'a'];
  const numArr = [2, 3, 1];
  it('test string arrange by ascending', () => {
    expect(strArr.sort((a, b) => compareByTextWhenSort(a, b, true))).toEqual([
      'a',
      'b',
      'c',
    ]);
    expect(strArr.sort((a, b) => compareByTextWhenSort(a, b, false))).toEqual([
      'c',
      'b',
      'a',
    ]);
  });

  it('test number arrange by ascending', () => {
    expect(numArr.sort((a, b) => compareByNumberWhenSort(a, b, true))).toEqual([
      1, 2, 3,
    ]);
    expect(numArr.sort((a, b) => compareByNumberWhenSort(a, b, false))).toEqual(
      [3, 2, 1]
    );
  });
});
