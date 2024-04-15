import { describe, expect, it } from '@jest/globals';
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
        renderData={(data, idx) => <div>{data.title}</div>}
      />
    );
    expect(screen.queryByText('title1')).not.toBeNull();
    expect(screen.queryByText('title2')).not.toBeNull();
  });
});
