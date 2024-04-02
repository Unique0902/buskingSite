import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import PrimaryBtn from './Btn/PrimaryBtn';
import { borderRadius, fontSize } from '../styles/theme';

type Props = {
  scrollToTutorial: () => void;
  isSmScreen: boolean;
};
export default function LoginNav({ scrollToTutorial, isSmScreen }: Props) {
  const handleClickTutorialBtn = () => {
    scrollToTutorial();
  };
  const [isShowSideBar, setIsShowSideBar] = useState<boolean>(false);

  useEffect(() => {
    if (isSmScreen) {
      setIsShowSideBar(false);
    } else {
      setIsShowSideBar(true);
    }
  }, [isSmScreen]);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <nav className='flex items-center justify-between'>
      <Link href={'/'} className='flex items-center gap-3 max-lg:gap-2'>
        <Image
          src={'/img/bookLogo.png'}
          alt=''
          width={500}
          height={500}
          className='w-12 h-12 '
        />
        <h1 className='text-3xl font-semibold '>노래책</h1>
      </Link>

      <div className='flex flex-row items-center gap-6 '>
        <PrimaryBtn
          handleClick={handleClickTutorialBtn}
          fontSize={fontSize.xm}
          radius={borderRadius.xl2}
        >
          튜토리얼
        </PrimaryBtn>
      </div>
    </nav>
  );
}
