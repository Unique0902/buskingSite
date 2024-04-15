import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import PagingBar from '../Table/PagingBar';

describe('PagingBar component test', () => {
  it('rendering correctly test', () => {});
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
});
