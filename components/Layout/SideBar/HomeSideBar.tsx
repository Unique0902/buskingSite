import React, { useEffect, useRef } from 'react';

import HomeSideBarBtn from './HomeSideBarBtn';
import Icon from '../../../assets/icon/icon';
import { useClickOutside } from '../../../hooks/useClickOutside';
type Props = {
  setIsShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};
const HomeSideBar = ({ setIsShowSideBar }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, () => setIsShowSideBar(false));

  return (
    <>
      <aside
        ref={wrapperRef}
        className={` bg-gray-100 relative max-lg:absolute right-0 top-0 max-lg:h-full max-lg:z-40 w-64`}
      >
        <div className='flex items-center px-6 py-6 border-b border-gray-600 border-solid'>
          <div className='mr-4'>
            <Icon size={32} color='#60a5fa' icon='Book' />
          </div>

          <h1 className='text-2xl font-semibold '>노래책</h1>
        </div>

        <ul className='flex flex-col'>
          <HomeSideBarBtn url={'/'}>소개</HomeSideBarBtn>
          <HomeSideBarBtn url={'/'}>찾기</HomeSideBarBtn>
          <HomeSideBarBtn url={'/'}>지원</HomeSideBarBtn>
          <HomeSideBarBtn url={'/'}>다운로드</HomeSideBarBtn>

          <li>
            <button
              className='absolute bottom-0 flex justify-end w-full pr-5 text-right border-t border-gray-600 border-solid hover:opacity-70 py-7'
              onClick={() => {
                setIsShowSideBar(false);
              }}
            >
              <Icon size={20} color='black' icon='ArrowRight' />
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default HomeSideBar;
