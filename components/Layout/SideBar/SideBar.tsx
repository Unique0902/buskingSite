import React, { useState, useRef } from 'react';

import { useRouter } from 'next/router';

import SideBarMenuBtn from './SideBarMenuBtn';
import { SideBarMenuSectionData } from '../../../store/data/SideBarMenus';
import SideBarTitle from './SideBarTitle';
import SideBarToggleBtn from './SideBarToggleBtn';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useSideBarMenu } from '../../../hooks/useSideBarMenu';

interface Props {
  setIsShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  sideBarMenuSectionDataArr: SideBarMenuSectionData[];
  isSmScreen: boolean;
}

const SideBar = ({
  setIsShowSideBar,
  sideBarMenuSectionDataArr,
  isSmScreen,
}: Props) => {
  const [isHide, setIsHide] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { sideBarMenuSectionArr } = useSideBarMenu(
    sideBarMenuSectionDataArr,
    router.pathname
  );

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
                  key={menuData.nameArr[0]}
                  name={menuData.nameArr[0]}
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
