import React, { useEffect, useRef } from 'react';
import { ArrowRightIcn, BookIcn } from '../../../assets/icon/icon';
import HomeSideBarBtn from './HomeSideBarBtn';
type Props = {
  setIsShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};
const HomeSideBar = ({ setIsShowSideBar }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsShowSideBar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, setIsShowSideBar]);

  return (
    <>
      <aside
        ref={wrapperRef}
        className={` bg-gray-100 text-black relative max-lg:absolute right-0 top-0 max-lg:h-full max-lg:z-40 w-64`}
      >
        <div className='flex items-center px-6 py-6 text-black border-b border-gray-600 border-solid'>
          <BookIcn
            width={32}
            height={32}
            color={'#60a5fa'}
            className={`mr-4`}
          />
          <h1 className='font-sans text-2xl font-semibold '>노래책</h1>
        </div>

        <ul className='flex flex-col'>
          <HomeSideBarBtn url={'/'}>소개</HomeSideBarBtn>
          <HomeSideBarBtn url={'/'}>찾기</HomeSideBarBtn>
          <HomeSideBarBtn url={'/'}>지원</HomeSideBarBtn>
          <HomeSideBarBtn url={'/'}>다운로드</HomeSideBarBtn>

          <li>
            <button
              className='absolute bottom-0 flex justify-end w-full pr-5 text-right text-black border-t border-gray-600 border-solid hover:opacity-70 py-7'
              onClick={() => {
                setIsShowSideBar(false);
              }}
            >
              <ArrowRightIcn width={20} height={20} color={'black'} />
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default HomeSideBar;
