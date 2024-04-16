import { screen, render, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import HoverBox from '../Hover/HoverBox';
import { expect, describe, it, jest } from '@jest/globals';

describe('arrangeMenu component test', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <HoverBox>
        <HoverBox.OutElement>
          <div>outer</div>
        </HoverBox.OutElement>
        <HoverBox.InnerElement>
          <div>inner</div>
        </HoverBox.InnerElement>
      </HoverBox>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('hover outer box and show inner box correctly', async () => {
    render(
      <HoverBox hoverWaitSecond={0}>
        <HoverBox.OutElement>
          <div>outer</div>
        </HoverBox.OutElement>
        <HoverBox.InnerElement>
          <div>inner</div>
        </HoverBox.InnerElement>
      </HoverBox>
    );

    const outerBox = screen.getByText('outer');
    await userEvent.hover(outerBox);
    await waitFor(() => {
      expect(screen.getByText('inner')).toBeInTheDocument();
    });
  });

  it('hover outer box and show inner box correctly with time after 0.5sec', async () => {
    render(
      <HoverBox hoverWaitSecond={0.5}>
        <HoverBox.OutElement>
          <div>outer</div>
        </HoverBox.OutElement>
        <HoverBox.InnerElement>
          <div>inner</div>
        </HoverBox.InnerElement>
      </HoverBox>
    );

    const outerBox = screen.getByText('outer');
    await userEvent.hover(outerBox);
    await waitFor(() => {
      expect(screen.getByText('inner')).toBeInTheDocument();
    });
  });
});
