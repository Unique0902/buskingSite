import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import NewSearchBar from '../Search/NewSearchBar';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

describe('newSearchBar component tests', () => {
  const testCategories = ['category1', 'category2'];

  it('render test', () => {
    const component = renderer.create(
      <NewSearchBar categories={testCategories}>
        <NewSearchBar.MainSec>
          <NewSearchBar.MainSec.Select />
          <NewSearchBar.MainSec.Input />
          <NewSearchBar.MainSec.Button handleClickBtn={() => {}} text='btn' />
        </NewSearchBar.MainSec>
        <NewSearchBar.SubSec>
          <div>subsec</div>
        </NewSearchBar.SubSec>
      </NewSearchBar>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('categoriesArr change to each option', () => {
    render(
      <NewSearchBar categories={testCategories}>
        <NewSearchBar.MainSec>
          <NewSearchBar.MainSec.Select />
        </NewSearchBar.MainSec>
      </NewSearchBar>
    );
    const [category1, category2] = screen.getAllByRole('option');

    expect(category1.textContent).toBe('category1');
    expect(category2.textContent).toBe('category2');
  });

  it('when btn click, handleClickBtn execute with searchWord', async () => {
    const handleClickBtn = jest.fn();
    render(
      <NewSearchBar categories={testCategories}>
        <NewSearchBar.MainSec>
          <NewSearchBar.MainSec.Select />
          <NewSearchBar.MainSec.Input />
          <NewSearchBar.MainSec.Button
            handleClickBtn={handleClickBtn}
            text='btn'
          />
        </NewSearchBar.MainSec>
      </NewSearchBar>
    );
    const input = screen.getByRole('searchbox');
    await userEvent.type(input, 'text');
    expect(input).toHaveValue('text');
    const btn = screen.getByRole('button');
    await userEvent.click(btn);
    expect(handleClickBtn).toBeCalledWith({
      category: 'category1',
      name: 'text',
    });
  });
});
