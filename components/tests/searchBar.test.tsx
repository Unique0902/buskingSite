import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import SearchBar from '../Search/SearchBar';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

describe('newSearchBar component tests', () => {
  const testCategories = ['category1', 'category2'];

  it('render test', () => {
    const component = renderer.create(
      <SearchBar categories={testCategories}>
        <SearchBar.MainSec>
          <SearchBar.MainSec.Select />
          <SearchBar.MainSec.Input />
          <SearchBar.MainSec.Button handleClickBtn={() => {}} text='btn' />
        </SearchBar.MainSec>
        <SearchBar.SubSec>
          <div>subsec</div>
        </SearchBar.SubSec>
      </SearchBar>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('categoriesArr change to each option', () => {
    render(
      <SearchBar categories={testCategories}>
        <SearchBar.MainSec>
          <SearchBar.MainSec.Select />
        </SearchBar.MainSec>
      </SearchBar>
    );
    const [category1, category2] = screen.getAllByRole('option');

    expect(category1.textContent).toBe('category1');
    expect(category2.textContent).toBe('category2');
  });

  it('when btn click, handleClickBtn execute with searchWord', async () => {
    const handleClickBtn = jest.fn();
    render(
      <SearchBar categories={testCategories}>
        <SearchBar.MainSec>
          <SearchBar.MainSec.Select />
          <SearchBar.MainSec.Input />
          <SearchBar.MainSec.Button
            handleClickBtn={handleClickBtn}
            text='btn'
          />
        </SearchBar.MainSec>
      </SearchBar>
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
