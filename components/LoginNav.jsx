import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PrimaryBtn from './Btn/PrimaryBtn';
import { fontSize } from '../styles/theme';

export default function LoginNav({ scrollToTutorial }) {
  const router = useRouter();
  const handleClickLogoBtn = () => {
    router.push('/');
  };
  const handleClickTutorialBtn = () => {
    scrollToTutorial();
  };
  return (
    <nav className='flex items-center justify-around'>
      <button className='flex items-center' onClick={handleClickLogoBtn}>
        <Image
          src={'/img/bookLogo.png'}
          alt=''
          width={500}
          height={500}
          className=' h-12 w-12 mr-3'
        />
        <p className='font-sans text-3xl font-semibold text-black '>노래책</p>
      </button>
      <ul className='w-2/5 justify-around font-sans  text-xl text-black font-semibold hidden lg:flex'>
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
      <PrimaryBtn handleClick={handleClickTutorialBtn} fontSize={fontSize.xm}>
        튜토리얼
      </PrimaryBtn>
    </nav>
  );
}
