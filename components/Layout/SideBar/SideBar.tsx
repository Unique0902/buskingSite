import React, { useState, useEffect, useRef, useCallback } from 'react';

import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

import SideBarMenuBtn from './SideBarMenuBtn';
import { SideBarMenuSectionData } from '../../../store/data/SideBarMenus';
import { produce } from 'immer';
import SideBarTitle from './SideBarTitle';
import SideBarToggleBtn from './SideBarToggleBtn';
import { useClickOutside } from '../../../hooks/useClickOutside';

interface Props {
  setIsShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  sideBarMenuSectionDataArr: SideBarMenuSectionData[];
}

const SideBar = ({ setIsShowSideBar, sideBarMenuSectionDataArr }: Props) => {
  const [isHide, setIsHide] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [sideBarMenuSectionArr, setSideBarMenuSectionArr] = useState(
    sideBarMenuSectionDataArr
  );

  const checkSelectedBtn = useCallback(
    (pathArr: string[]) => {
      if (pathArr[2] === 'busking') {
        setSideBarMenuSectionArr(
          produce((prevArr) => {
            const selectedData =
              prevArr[0].data.find((menuData) => menuData.isSelected) ||
              prevArr[1].data.find((menuData) => menuData.isSelected);
            selectedData && (selectedData.isSelected = false);
            const data = prevArr[1].data.find(
              (menuData) => menuData.name === 'makebusking'
            );
            data && (data.isSelected = true);
          })
        );
      } else {
        setSideBarMenuSectionArr(
          produce((prevArr) => {
            const selectedData =
              prevArr[0].data.find((menuData) => menuData.isSelected) ||
              prevArr[1].data.find((menuData) => menuData.isSelected);
            selectedData && (selectedData.isSelected = false);
            const data =
              prevArr[0].data.find(
                (menuData) => menuData.name === pathArr[2]
              ) ||
              prevArr[1].data.find((menuData) => menuData.name === pathArr[2]);
            data && (data.isSelected = true);
          })
        );
      }
    },
    [router]
  );

  useEffect(() => {
    checkSelectedBtn(router.pathname.split('/'));
  }, [router]);
  const isSmScreen = useMediaQuery({
    query: '(max-width:1024px)',
  });

  useClickOutside(wrapperRef, () => setIsShowSideBar(false), isSmScreen);

  return (
    <>
      <aside
        ref={wrapperRef}
        className={` bg-zinc-800 dark:border-r dark:border-r-gray-600 relative max-lg:absolute max-lg:h-full max-lg:z-40 ${
          isHide ? 'w-16' : 'w-64'
        }`}
      >
        <SideBarTitle isMiniMode={isHide} />

        <ul className='flex flex-col'>
          {sideBarMenuSectionArr.map((secData, secIdx) => (
            <React.Fragment key={'sideBarMenuSec' + secIdx}>
              {secData.title && !isHide && (
                <li>
                  <p className='pt-3 pb-3 pl-5 text-sm text-gray-400 border-t border-gray-600 border-solid'>
                    {secData.title}
                  </p>
                </li>
              )}
              {secData.data.map((menuData) => (
                <SideBarMenuBtn
                  key={menuData.name}
                  name={menuData.name}
                  isSelected={menuData.isSelected}
                  isHide={isHide}
                  text={menuData.text}
                  icon={menuData.icon}
                />
              ))}
            </React.Fragment>
          ))}
        </ul>
        <SideBarToggleBtn
          isHide={isHide}
          isSmScreen={isSmScreen}
          setIsHide={setIsHide}
          setIsShowSideBar={setIsShowSideBar}
        />
      </aside>
    </>
  );
};

export default SideBar;
