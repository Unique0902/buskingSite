import { screen, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import { expect, describe, it } from '@jest/globals';
import ModalIconBtn from '../Modal/ModalIconBtn';

describe('modalIconBtn component test', () => {
  it('modalIconBtn renders correctly', () => {
    const component = renderer.create(
      <ModalIconBtn icon='ArrowDown'>
        <ModalIconBtn.Inner>
          <div>inner</div>
        </ModalIconBtn.Inner>
      </ModalIconBtn>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('click modalIconBtn and show inner box correctly', async () => {
    render(
      <ModalIconBtn icon='ArrowDown'>
        <ModalIconBtn.Inner>
          <div>inner</div>
        </ModalIconBtn.Inner>
      </ModalIconBtn>
    );

    expect(screen.queryByText('inner')).toBeNull();
    const btn = screen.getByRole('button');
    await userEvent.click(btn);
    expect(screen.getByText('inner')).toBeInTheDocument();
  });
});
