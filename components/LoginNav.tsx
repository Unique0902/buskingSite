import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import PrimaryBtn from './Btn/PrimaryBtn';
import { borderRadius, color, fontSize } from '../styles/theme';
import { MenuIcn } from '../assets/icon/icon';
import { useMediaQuery } from 'react-responsive';
import HomeSideBar from './Layout/SideBar/HomeSideBar';
import RenderedWhenMobile from './Responsive/RenderedWhenMobile';
import Link from 'next/link';
type Props = {
  scrollToTutorial: () => void;
};
export default function LoginNav({ scrollToTutorial }: Props) {
  const handleClickTutorialBtn = () => {
    scrollToTutorial();
  };
  const [isShowSideBar, setIsShowSideBar] = useState<boolean>(false);
  const isLgMediaQuery = useMediaQuery({
    query: '(min-width:1024px)',
  });
  useEffect(() => {
    if (!isLgMediaQuery) {
      setIsShowSideBar(false);
    } else {
      setIsShowSideBar(true);
    }
  }, [isLgMediaQuery]);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <nav className='flex items-center justify-around max-lg:justify-between'>
      <Link href={'/'} className='flex items-center gap-3 max-lg:gap-2'>
        <Image
          src={'/img/bookLogo.png'}
          alt=''
          width={500}
          height={500}
          className='w-12 h-12 '
        />
        <h1 className='font-sans text-3xl font-semibold text-black '>노래책</h1>
      </Link>
      <ul className='justify-around hidden w-2/5 font-sans text-xl font-semibold text-black lg:flex'>
        <li>
          <button className='hover:scale-110'>소개</button>
        </li>
        <li>
          <button className='hover:scale-110'>찾기</button>
        </li>
        <li>
          <button className='hover:scale-110'>지원</button>
        </li>
        <li>
          <button className='hover:scale-110'>다운로드</button>
        </li>
      </ul>

      <div className='flex flex-row items-center gap-6 '>
        <PrimaryBtn
          handleClick={handleClickTutorialBtn}
          fontSize={fontSize.xm}
          radius={borderRadius.xl2}
        >
          튜토리얼
        </PrimaryBtn>
        <button
          type='button'
          aria-label='menu'
          onClick={() => {
            setIsShowSideBar(!isShowSideBar);
          }}
        >
          <MenuIcn
            width={25}
            height={25}
            color={color.gray_600}
            className='lg:hidden'
          />
        </button>
      </div>
      {mounted && isShowSideBar && (
        <RenderedWhenMobile>
          <HomeSideBar setIsShowSideBar={setIsShowSideBar} />
        </RenderedWhenMobile>
      )}
    </nav>
  );
}
