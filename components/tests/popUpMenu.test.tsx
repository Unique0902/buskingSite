import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import PopUpMenu from '../PopUp/PopUpMenu';
import userEvent from '@testing-library/user-event';

describe('popUpMenu component test', () => {
  it('render correctly', () => {
    const component = renderer.create(
      <PopUpMenu>
        <PopUpMenu.OuterBtn>
          <div>outer btn</div>
        </PopUpMenu.OuterBtn>
        <PopUpMenu.Inner isPopUpInnerLeft>
          <div>inner</div>
        </PopUpMenu.Inner>
      </PopUpMenu>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('show inner when outerBtn is clicked', async () => {
    render(
      <PopUpMenu>
        <PopUpMenu.OuterBtn>
          <div>outer btn</div>
        </PopUpMenu.OuterBtn>
        <PopUpMenu.Inner isPopUpInnerLeft>
          <div>inner</div>
        </PopUpMenu.Inner>
      </PopUpMenu>
    );
    expect(screen.queryByText('inner')).toBeNull();
    const outerBtn = screen.getByText('outer btn');
    await userEvent.click(outerBtn);
    expect(screen.queryByText('inner')).not.toBeNull();
  });
});
