import React from 'react';

import { useRouter } from 'next/router';

import Icon from '../../../assets/icon/icon';
import { useDarkModeContext } from '../../../context/DarkModeContext';
import { color } from '../../../styles/theme';

const HomeBtn: React.FC = () => {
  const { isDarkMode } = useDarkModeContext();
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push('/app/home');
      }}
      className='p-2 bg-white border border-black rounded-full dark:bg-slate-800 hover:opacity-70 dark:border-white'
    >
      <Icon
        icon='Home'
        size={25}
        color={isDarkMode ? color.gray_200 : color.gray_900}
      />
    </button>
  );
};

export default HomeBtn;
