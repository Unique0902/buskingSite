import { describe, expect, it, jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import ListPage from '../ListPage/ListPage';
import { render, screen } from '@testing-library/react';

describe('List Page Component Test', () => {
  //   it('test rendering correctly', () => {
  //     const component = renderer.create(<ListPage />);
  //     expect(component.toJSON()).toMatchSnapshot();
  //   });

  type TestData = {
    title: string;
    description: string;
  };

  const testPageDataArr: TestData[] = [
    { title: 'title1', description: 'description1' },
    { title: 'title2', description: 'description2' },
  ];

  it('show given dataArr by given figure', () => {
    render(
      <ListPage<TestData>
        pageDataArr={testPageDataArr}
        renderData={(data, idx) => (
          <div key={data.title + idx}>{data.title}</div>
        )}
        pageDataInform={{ resultTotalNum: 2, resultNumPerPage: 6 }}
        handleChangePage={() => {}}
      />
    );
    expect(screen.queryByText('title1')).not.toBeNull();
    expect(screen.queryByText('title2')).not.toBeNull();
  });

  it('when change page, excute handleChangePage', () => {
    const handleChangePage = jest.fn();
    render(
      <ListPage<TestData>
        pageDataArr={testPageDataArr}
        renderData={(data, idx) => (
          <div key={data.title + idx}>{data.title}</div>
        )}
        pageDataInform={{ resultTotalNum: 2, resultNumPerPage: 6 }}
        handleChangePage={handleChangePage}
      />
    );
    const [minusBtn, plusBtn] = screen.queryAllByRole('button');
  });
});
