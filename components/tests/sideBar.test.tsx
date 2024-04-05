import { screen, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import { expect, describe, it, jest } from '@jest/globals';
import SideBar from '../Layout/SideBar/SideBar';
import { testSideBarMenuSectionDataArr } from '../../tests/testData';

describe('SideBar component test', () => {
  const setIsShowSideBar = jest.fn();
  it('renders correctly', () => {
    const component = renderer.create(
      <SideBar
        setIsShowSideBar={setIsShowSideBar}
        sideBarMenuSectionDataArr={testSideBarMenuSectionDataArr}
        isSmScreen={false}
        routerPathName={'/app/testMenu1'}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('check sidebar to be miniMode when click toggle btn', async () => {
    render(
      <SideBar
        setIsShowSideBar={setIsShowSideBar}
        sideBarMenuSectionDataArr={testSideBarMenuSectionDataArr}
        isSmScreen={false}
        routerPathName={'/app/testMenu1'}
      />
    );
    expect(screen.queryByText('노래책')).not.toBeNull();

    const toggleBtn = screen.getByTestId('toggleBtn');
    await userEvent.click(toggleBtn);
    expect(screen.queryByText('노래책')).toBeNull();
  });

  //   it('check sidebar to hide when screen is small', async () => {
  //     render(
  //       <SideBar
  //         setIsShowSideBar={setIsShowSideBar}
  //         sideBarMenuSectionDataArr={testSideBarMenuSectionDataArr}
  //         isSmScreen={true}
  //         routerPathName={'/app/testMenu1'}
  //       />
  //     );

  //     const outerBox = screen.getByText('outer');
  //     await userEvent.click(outerBox);
  //     expect(handleClickOther).toHaveBeenCalled();
  //   });

  it('check sidebar to hide when screen is small and click outside', async () => {
    render(
      <>
        <SideBar
          setIsShowSideBar={setIsShowSideBar}
          sideBarMenuSectionDataArr={testSideBarMenuSectionDataArr}
          isSmScreen={true}
          routerPathName={'/app/testMenu1'}
        />
        <div>outer</div>
      </>
    );

    const outerBox = screen.getByText('outer');
    await userEvent.click(outerBox);
    expect(setIsShowSideBar).toHaveBeenCalledWith(false);
  });

  it('check sidebarMenuBtn testMenu1 to activate when testMenu1 is selected', async () => {
    render(
      <SideBar
        setIsShowSideBar={setIsShowSideBar}
        sideBarMenuSectionDataArr={testSideBarMenuSectionDataArr}
        isSmScreen={false}
        routerPathName={'/app/testMenu1'}
      />
    );

    const selectedMenu = screen.getByTestId('selectedMenu');
    const testMenu1 = screen.getByText('testMenu1');

    expect(selectedMenu).toBe(testMenu1);
  });

  //   it('check sidebarMenuBtn testMenu2 to activate and testMenu1 to deactivate when click testmenu2', async () => {
  //     render(
  //       <SideBar
  //         setIsShowSideBar={setIsShowSideBar}
  //         sideBarMenuSectionDataArr={testSideBarMenuSectionDataArr}
  //         isSmScreen={false}
  //         routerPathName={'/app/testMenu1'}
  //       />
  //     );

  //     expect(screen.getByTestId('selectedMenu').innerText).toBe('testMenu1');
  //     const testMenu2 = screen.getByText('testMenu2');
  //     await userEvent.click(testMenu2);
  //     expect(screen.getByTestId('selectedMenu').innerText).toBe('testMenu2');
  //   });

  it('check sidebarMenuBtn with various name (testMenu3,testMenu4) to activate when routerPathName is testmenu4', async () => {
    render(
      <SideBar
        setIsShowSideBar={setIsShowSideBar}
        sideBarMenuSectionDataArr={testSideBarMenuSectionDataArr}
        isSmScreen={false}
        routerPathName={'/app/testMenu4'}
      />
    );

    const selectedMenu = screen.getByTestId('selectedMenu');
    const testMenu = screen.getByText('testMenu3,testMenu4');
    expect(selectedMenu).toBe(testMenu);
  });
});
