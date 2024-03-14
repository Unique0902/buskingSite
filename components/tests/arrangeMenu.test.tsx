import { describe, expect, it, jest } from '@jest/globals';
import { screen, render } from '@testing-library/react';
import ArrangeMenu from '../ArrangeMenu/ArrangeMenu';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

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

  it('click arrange btn correctly', async () => {
    render(
      <ArrangeMenu
        setIsShowArrangeMenu={setIsArrangeMenu}
        setResults={setResults}
        arrangeOptionArr={arrangeOption}
      />
    );

    const sortButton = screen.getByRole('button');

    await userEvent.click(sortButton);

    expect(setIsArrangeMenu).toHaveBeenCalledWith(false);
    expect(setResults).toHaveBeenCalled();
  });
});
