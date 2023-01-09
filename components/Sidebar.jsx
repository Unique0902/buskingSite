import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaGuitar,
  FaHome,
  FaMusic,
  FaPlus,
  FaUser,
  FaBookOpen,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import SideBarBtn from './SideBarBtn';

const Sidebar = ({ isShowSideBar, setIsShowSideBar }) => {
  const [isHide, setIsHide] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState('home');
  const wrapperRef = useRef();
  const router = useRouter();
  const checkSelectedBtn = () => {
    const pathArr = router.pathname.split('/');
    if (pathArr[2] === 'busking') {
      setSelectedBtn('makeBusking');
    } else {
      setSelectedBtn(pathArr[2]);
    }
  };

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
      function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setIsShowSideBar(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [wrapperRef]);
  const iconStyle = 'mr-4';
  return (
    <>
      <aside
        ref={wrapperRef}
        className={` bg-zinc-800 text-black relative max-lg:absolute max-lg:h-full max-lg:z-40 ${
          isHide ? 'w-16' : 'w-64'
        }`}
      >
        {!isHide && (
          <div className='flex items-center py-3 px-5  border-solid text-white border-gray-600 border-b'>
            <FaBookOpen className={`mr-4 text-2xl text-blue-400`} />
            <p className=' font-sans text-2xl font-semibold '>노래책</p>
          </div>
        )}
        {isHide && (
          <div className='flex items-center text-blue-600 justify-center text-2xl w-full text-center py-4 border-solid border-gray-600 border-b'>
            <FaBookOpen />
          </div>
        )}

        <ul className='flex flex-col'>
          <SideBarBtn
            name={'home'}
            selectedBtn={selectedBtn}
            isHide={isHide}
            text={'Home'}
          >
            <FaHome className={`${!isHide && iconStyle} text-center`} />
          </SideBarBtn>
          {!isHide && (
            <li>
              <p className='border-solid border-gray-600 border-t text-gray-400 text-sm pt-3 pb-3 pl-5'>
                기능 카테고리
              </p>
            </li>
          )}
          <SideBarBtn
            name={'add'}
            selectedBtn={selectedBtn}
            isHide={isHide}
            text={'노래 추가'}
          >
            <FaPlus className={`${!isHide && iconStyle}`} />
          </SideBarBtn>
          <SideBarBtn
            name={'playlist'}
            selectedBtn={selectedBtn}
            isHide={isHide}
            text={'Playlist 관리'}
          >
            <FaMusic className={`${!isHide && iconStyle}`} />
          </SideBarBtn>
          <SideBarBtn
            name={'inform'}
            selectedBtn={selectedBtn}
            isHide={isHide}
            text={'내 정보'}
          >
            <FaUser className={`${!isHide && iconStyle}`} />
          </SideBarBtn>
          <SideBarBtn
            name={'makebusking'}
            selectedBtn={selectedBtn}
            isHide={isHide}
            text={'버스킹하기'}
          >
            <FaGuitar className={`${!isHide && iconStyle}`} />
          </SideBarBtn>

          <li>
            {isHide ? (
              <button
                className='absolute border-solid flex justify-center hover:text-gray-400 border-gray-600 border-t bottom-0 py-7 w-full text-white'
                onClick={() => {
                  setIsHide(false);
                }}
              >
                <FaChevronRight />
              </button>
            ) : (
              <button
                className='absolute flex justify-end hover:text-gray-400 border-solid border-gray-600 border-t bottom-0 py-7 w-full text-right pr-5 text-white'
                onClick={() => {
                  if (isLgMediaQuery) {
                    setIsShowSideBar(false);
                  } else {
                    setIsHide(true);
                  }
                }}
              >
                <FaChevronLeft />
              </button>
            )}
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
