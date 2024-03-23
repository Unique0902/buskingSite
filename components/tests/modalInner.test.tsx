import { screen, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import { expect, describe, it, jest, afterEach } from '@jest/globals';
import ModalInner from '../Modal/ModalInner';

describe('ModalInner component test', () => {
  const handleClickOther = jest.fn();

  afterEach(() => handleClickOther.mockReset());

  it('renders correctly', () => {
    const component = renderer.create(
      <ModalInner handleClickOther={handleClickOther}>
        <div>inner</div>
      </ModalInner>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('click inner and handleClickOther not execute', async () => {
    render(
      <>
        <ModalInner handleClickOther={handleClickOther}>
          <div>inner</div>
        </ModalInner>
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
        <ModalInner handleClickOther={handleClickOther}>
          <div>inner</div>
        </ModalInner>
        <div>outer</div>
      </>
    );

    const outerBox = screen.getByText('outer');
    await userEvent.click(outerBox);
    expect(handleClickOther).toHaveBeenCalled();
  });
});
