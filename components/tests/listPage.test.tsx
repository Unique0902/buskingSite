import { describe, expect, it, jest } from '@jest/globals';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import ListPage from '../ListPage/ListPage';
import { render, screen } from '@testing-library/react';

describe('List Page Component Test', () => {
  type TestData = {
    title: string;
    description: string;
  };

  const testPageDataArr: TestData[] = [
    { title: 'title1', description: 'description1' },
    { title: 'title2', description: 'description2' },
  ];

  const testPageDataArr2: TestData[] = [
    { title: 'title1', description: 'description1' },
    { title: 'title2', description: 'description2' },
  ];

  const bigTestPageDataArr: TestData[] = [
    { title: 'title1', description: 'description1' },
    { title: 'title2', description: 'description2' },
    { title: 'title2', description: 'description2' },
    { title: 'title2', description: 'description2' },
    { title: 'title2', description: 'description2' },
    { title: 'title2', description: 'description2' },
    { title: 'title2', description: 'description2' },
    { title: 'title2', description: 'description2' },
    { title: 'title2', description: 'description2' },
    { title: 'title2', description: 'description2' },
  ];

  const bigTestPageDataArr2: TestData[] = [
    { title: 'title1', description: 'description1' },
    { title: 'title2', description: 'description2' },
    { title: 'title2', description: 'description2' },
    { title: 'title2', description: 'description2' },
    { title: 'title2', description: 'description2' },
    { title: 'title2', description: 'description2' },
    { title: 'title2', description: 'description2' },
    { title: 'title2', description: 'description2' },
    { title: 'title2', description: 'description2' },
    { title: 'title2', description: 'description2' },
  ];

  it('test rendering correctly', () => {
    const component = renderer.create(
      <ListPage<TestData>
        pageDataArr={testPageDataArr}
        renderData={(data, idx) => (
          <div key={data.title + idx}>{data.title}</div>
        )}
        pageDataInform={{
          resultTotalNum: testPageDataArr.length,
          resultNumPerPage: 6,
          totalDataArr: testPageDataArr,
        }}
        handleChangePage={() => {}}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('show given dataArr by given figure', () => {
    render(
      <ListPage<TestData>
        pageDataArr={testPageDataArr}
        renderData={(data, idx) => (
          <div key={data.title + idx}>{data.title}</div>
        )}
        pageDataInform={{
          resultTotalNum: testPageDataArr.length,
          resultNumPerPage: 6,
          totalDataArr: testPageDataArr,
        }}
        handleChangePage={() => {}}
      />
    );
    expect(screen.queryByText('title1')).not.toBeNull();
    expect(screen.queryByText('title2')).not.toBeNull();
  });

  it('when click pagingBarBtn, excute handleChangePage', async () => {
    const handleChangePage = jest.fn();
    render(
      <ListPage<TestData>
        pageDataArr={testPageDataArr}
        renderData={(data, idx) => (
          <div key={data.title + idx}>{data.title}</div>
        )}
        pageDataInform={{
          resultTotalNum: bigTestPageDataArr.length,
          resultNumPerPage: 2,
          totalDataArr: bigTestPageDataArr,
        }}
        handleChangePage={handleChangePage}
      />
    );
    const [minusBtn, plusBtn] = screen.queryAllByRole('button');
    await userEvent.click(plusBtn);
    expect(handleChangePage).toHaveBeenCalledWith(2);
    await userEvent.click(minusBtn);
    expect(handleChangePage).toHaveBeenCalledWith(1);
  });

  it('when pageDataArr length is bigger than resultNumPerPage', async () => {
    expect(() =>
      render(
        <ListPage<TestData>
          pageDataArr={testPageDataArr}
          renderData={(data, idx) => (
            <div key={data.title + idx}>{data.title}</div>
          )}
          pageDataInform={{
            resultTotalNum: bigTestPageDataArr.length,
            resultNumPerPage: 1,
            totalDataArr: bigTestPageDataArr,
          }}
          handleChangePage={() => {}}
        />
      )
    ).toThrow(
      'pageDataArr length must be same or smaller than resultNumPerPage'
    );
  });

  it('when no data', () => {
    render(
      <ListPage<TestData>
        pageDataArr={[]}
        renderData={(data, idx) => (
          <div key={data.title + idx}>{data.title}</div>
        )}
        pageDataInform={{
          resultTotalNum: 0,
          resultNumPerPage: 6,
          totalDataArr: [],
        }}
        handleChangePage={() => {}}
        renderNoData={() => <div>no data</div>}
      />
    );
    expect(screen.queryByText('no data')).not.toBeNull();
  });
  // TODO: totalDataArr 변화했을때 pageNum 0 된거 테스트하기

  it('when totalDataArr change, pageNum clear', async () => {
    const { rerender } = render(
      <ListPage<TestData>
        pageDataArr={testPageDataArr}
        renderData={(data, idx) => (
          <div key={data.title + idx}>{data.title}</div>
        )}
        pageDataInform={{
          resultTotalNum: bigTestPageDataArr.length,
          resultNumPerPage: 2,
          totalDataArr: bigTestPageDataArr,
        }}
        handleChangePage={() => {}}
      />
    );
    const [minusBtn, plusBtn] = screen.queryAllByRole('button');
    await userEvent.click(plusBtn);
    expect(screen.queryByText('2')).not.toBeNull();
    rerender(
      <ListPage<TestData>
        pageDataArr={testPageDataArr2}
        renderData={(data, idx) => (
          <div key={data.title + idx}>{data.title}</div>
        )}
        pageDataInform={{
          resultTotalNum: bigTestPageDataArr2.length,
          resultNumPerPage: 2,
          totalDataArr: bigTestPageDataArr2,
        }}
        handleChangePage={() => {}}
      />
    );

    expect(screen.queryByText('1')).not.toBeNull();
  });
});
