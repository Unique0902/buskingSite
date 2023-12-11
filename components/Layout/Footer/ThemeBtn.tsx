import React, { useLayoutEffect, useState } from 'react';

import Icon from '../../../assets/icon/icon';
import { useDarkModeContext } from '../../../context/DarkModeContext';
import { color } from '../../../styles/theme';
//useLayoutEffect 공부해보고 성능 얼마나 떨어지는지 알아보고 개선가능할지 생각해보기
const LOCAL_STORAGE_KEY = {
  THEME: 'theme',
} as const;

const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;
const ThemeBtn = () => {
  const { isDarkMode, setIsDarkMode } = useDarkModeContext();
  useLayoutEffect(() => {
    const theme = localStorage.getItem(LOCAL_STORAGE_KEY.THEME) || THEME.LIGHT;
    if (theme === THEME.DARK) {
      document.querySelector('html')?.classList.add(THEME.DARK);
      setIsDarkMode(true);
    }
  }, []);

  //useLayoutEffect는 성능에 위해가 될수있으니 나중에 개선해보기

  const toggleTheme = () => {
    // html 태그를 가지고 옴
    const htmlEl = document.querySelector('html');
    if (!htmlEl) return;

    const enabledDarkMode = htmlEl.classList.contains('dark');
    if (enabledDarkMode) {
      // 다크모드인 경우(html 태그의 className에 dark가 있을때)
      // -> className에서 dark를 제거
      htmlEl.classList.remove('dark');
      localStorage.removeItem(LOCAL_STORAGE_KEY.THEME);
      setIsDarkMode(false);
    } else {
      // 다크모드가 아닌 경우, className에서 dark를 추가
      htmlEl.classList.add('dark');
      localStorage.setItem(LOCAL_STORAGE_KEY.THEME, THEME.DARK);
      setIsDarkMode(true);
    }
  };
  return (
    <button
      onClick={toggleTheme}
      className='p-2 bg-white border border-black rounded-full dark:bg-slate-800 hover:opacity-70 dark:border-white'
    >
      {isDarkMode ? (
        <Icon size={25} color={color.gray_200} icon='Moon' />
      ) : (
        <Icon size={25} color={color.gray_900} icon='Sun' />
      )}
    </button>
  );
};

export default ThemeBtn;
