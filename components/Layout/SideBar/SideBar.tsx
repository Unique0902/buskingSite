import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import SideBarBtn from './SideBarBtn';
import Icon from '../../../assets/icon/icon';
type Props = {
  setIsShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};
type SideBarBtnType =
  | 'home'
  | 'add'
  | 'playlist'
  | 'inform'
  | 'makebusking'
  | 'busking';
const SideBar = ({ setIsShowSideBar }: Props) => {
  const [isHide, setIsHide] = useState<boolean>(false);
  const [selectedBtn, setSelectedBtn] = useState<SideBarBtnType>('home');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const checkSelectedBtn = useCallback(() => {
    const pathArr = router.pathname.split('/');
    if (pathArr[2] === 'busking') {
      setSelectedBtn('makebusking');
    } else {
      setSelectedBtn(pathArr[2] as SideBarBtnType);
    }
  }, [router]);

  useEffect(() => {
    checkSelectedBtn();
  }, [router]);
  const isLgMediaQuery = useMediaQuery({
    query: '(max-width:1024px)',
  });
  // const handelClick = (name) => {
  //   if (isLgMediaQuery) {
  //     setIsShowSideBar(false);
  //   }
  // };
  useEffect(() => {
    if (isLgMediaQuery) {
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
    }
  }, [wrapperRef, isLgMediaQuery, setIsShowSideBar]);
  return (
    <>
      <aside
        ref={wrapperRef}
        className={` bg-zinc-800 dark:border-r dark:border-r-gray-600 relative max-lg:absolute max-lg:h-full max-lg:z-40 ${
          isHide ? 'w-16' : 'w-64'
        }`}
      >
        {!isHide && (
          <div className='flex items-center gap-3 px-5 py-3 text-white border-b border-gray-600 border-solid'>
            <Icon size={32} color='#60a5fa' icon='Book' />
            <p className='text-2xl font-semibold '>노래책</p>
          </div>
        )}
        {isHide && (
          <div className='flex items-center justify-center w-full py-4 text-2xl text-center text-blue-600 border-b border-gray-600 border-solid'>
            <Icon size={32} color='#60a5fa' icon='Book' />
          </div>
        )}

        <ul className='flex flex-col'>
          <SideBarBtn
            name={'home'}
            selectedBtn={selectedBtn}
            isHide={isHide}
            text={'Home'}
            icon='Home'
          />
          {!isHide && (
            <li>
              <p className='pt-3 pb-3 pl-5 text-sm text-gray-400 border-t border-gray-600 border-solid'>
                기능 카테고리
              </p>
            </li>
          )}
          <SideBarBtn
            name={'add'}
            selectedBtn={selectedBtn}
            isHide={isHide}
            text={'노래 추가'}
            icon='Plus'
          />
          <SideBarBtn
            name={'playlist'}
            selectedBtn={selectedBtn}
            isHide={isHide}
            text={'Playlist 관리'}
            icon='Song'
          />

          <SideBarBtn
            name={'inform'}
            selectedBtn={selectedBtn}
            isHide={isHide}
            text={'내 정보'}
            icon='User'
          />

          <SideBarBtn
            name={'makebusking'}
            selectedBtn={selectedBtn}
            isHide={isHide}
            text={'버스킹하기'}
            icon='Guitar'
          />

          <li>
            {isHide ? (
              <button
                className='absolute bottom-0 flex justify-center w-full text-white border-t border-gray-600 border-solid hover:opacity-70 py-7'
                onClick={() => {
                  setIsHide(false);
                }}
              >
                <Icon size={20} color='white' icon='ArrowRight' />
              </button>
            ) : (
              <button
                className='absolute bottom-0 flex justify-end w-full pr-5 text-right text-white border-t border-gray-600 border-solid hover:opacity-70 py-7'
                onClick={() => {
                  if (isLgMediaQuery) {
                    setIsShowSideBar(false);
                  } else {
                    setIsHide(true);
                  }
                }}
              >
                <Icon size={20} color='white' icon='ArrowLeft' />
              </button>
            )}
          </li>
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
