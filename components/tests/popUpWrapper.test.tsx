import { screen, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import { expect, describe, it, jest } from '@jest/globals';
import PopupWrapper from '../PopUp/PopupWrapper';

describe('arrangeMenu component test', () => {
  const handleClickOther = jest.fn();
  it('renders correctly', () => {
    const component = renderer.create(
      <PopupWrapper isLeft handleClickOther={handleClickOther}>
        <div>inner</div>
      </PopupWrapper>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('click inner and handleClickOther not execute', async () => {
    render(
      <>
        <PopupWrapper isLeft handleClickOther={handleClickOther}>
          <div>inner</div>
        </PopupWrapper>
        <div>outer</div>
      </>
    );

    const innerBox = screen.getByText('inner');
    await userEvent.click(innerBox);
    expect(handleClickOther).not.toHaveBeenCalled();
  });

  it('click outer and handleClickOther execute', async () => {
    render(
      <>
        <PopupWrapper isLeft handleClickOther={handleClickOther}>
          <div>inner</div>
        </PopupWrapper>
        <div>outer</div>
      </>
    );

    const outerBox = screen.getByText('outer');
    await userEvent.click(outerBox);
    expect(handleClickOther).toHaveBeenCalled();
  });
});
