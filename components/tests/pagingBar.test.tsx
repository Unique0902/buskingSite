import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import PagingBar from '../Table/PagingBar';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

describe('PagingBar component test', () => {
  it('rendering correctly test', () => {
    const component = renderer.create(
      <PagingBar
        totalPageNum={2}
        pageNum={1}
        onPageMinus={() => {}}
        onPagePlus={() => {}}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('show totalPageNum and nowPageNum correctly', () => {
    render(
      <PagingBar
        totalPageNum={2}
        pageNum={1}
        onPageMinus={() => {}}
        onPagePlus={() => {}}
      />
    );
    expect(screen.queryByText('1')).not.toBeNull();
    expect(screen.queryByText('2')).not.toBeNull();
  });

  it('click each plus, minus btn, and get event onPagePlus and onPageMinus', async () => {
    const handlePagePlus = jest.fn();
    const handlePageMinus = jest.fn();
    render(
      <PagingBar
        totalPageNum={2}
        pageNum={1}
        onPagePlus={handlePagePlus}
        onPageMinus={handlePageMinus}
      />
    );

    const [minusBtn, plusBtn] = screen.queryAllByRole('button');

    await userEvent.click(plusBtn);
    expect(handlePagePlus).toHaveBeenCalled();
    await userEvent.click(minusBtn);
    expect(handlePageMinus).toHaveBeenCalled();
  });
});
