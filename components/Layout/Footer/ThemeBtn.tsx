import React, { useState } from 'react';
import { MoonIcn, SunIcn } from '../../../assets/icon/icon';
import { color } from '../../../styles/theme';

interface Props {}

const ThemeBtn: React.FC<Props> = ({}: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    // html 태그를 가지고 옴
    const htmlEl = document.querySelector('html');
    if (!htmlEl) return;

    const enabledDarkMode = htmlEl.classList.contains('dark');
    if (enabledDarkMode) {
      // 다크모드인 경우(html 태그의 className에 dark가 있을때)
      // -> className에서 dark를 제거
      htmlEl.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      // 다크모드가 아닌 경우, className에서 dark를 추가
      htmlEl.classList.add('dark');
      setIsDarkMode(true);
    }
  };
  return (
    <button
      onClick={toggleTheme}
      className='p-2 bg-white border border-black rounded-full'
    >
      {isDarkMode ? (
        <MoonIcn width={25} height={25} color={color.gray_900} />
      ) : (
        <SunIcn width={25} height={25} color={color.gray_900} />
      )}
    </button>
  );
};

export default ThemeBtn;
