import { describe, expect, it, jest } from '@jest/globals';
import ArrangeMenu from '../ArrangeMenu/ArrangeMenu';
import renderer from 'react-test-renderer';

describe('arrangeMenu component test', () => {
  const setIsArrangeMenu = jest.fn();
  const setResults = jest.fn();
  const arrangeOption = [
    {
      name: '제목 문자순 정렬',
      arrangeFunc: (a: number, b: number) => a - b,
    },
  ];
  it('renders correctly', () => {
    const component = renderer.create(
      <ArrangeMenu
        setIsShowArrangeMenu={setIsArrangeMenu}
        setResults={setResults}
        arrangeOptionArr={arrangeOption}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
