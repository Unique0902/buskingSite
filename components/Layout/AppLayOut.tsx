import React, { ReactNode, useEffect, useState } from 'react';

import ThemeBtn from './Footer/ThemeBtn';
import AppHeader from './Header/AppHeader';
import SideBar from './SideBar/SideBar';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserDataProtectedRoute from '../ProtectedRoute/UserDataProtectedRoute';
import { sideBarMenuSectionDataArr } from '../../store/data/SideBarMenus';
import { useMediaQueryContext } from '../../context/MediaQueryContext';
type Props = {
  children: ReactNode;
};
export default function AppLayOut({ children }: Props) {
  const [isShowSideBar, setIsShowSideBar] = useState<boolean>(true);
  const { isSmScreen } = useMediaQueryContext();

  useEffect(() => {
    if (isSmScreen) {
      setIsShowSideBar(false);
    } else {
      setIsShowSideBar(true);
    }
  }, [isSmScreen]);

  return (
    <ProtectedRoute>
      <UserDataProtectedRoute>
        {
          <section className='flex h-screen bg-gradient-to-b from-blue-500 to-white dark:from-slate-900 dark:to-slate-700 '>
            {isShowSideBar && (
              <SideBar
                setIsShowSideBar={setIsShowSideBar}
                sideBarMenuSectionDataArr={sideBarMenuSectionDataArr}
                isSmScreen={isSmScreen}
              />
            )}
            <main className='relative px-8 py-6 overflow-y-auto grow max-lg:px-4'>
              <AppHeader
                isShowSideBar={isShowSideBar}
                setIsShowSideBar={setIsShowSideBar}
              />
              {children}
            </main>
            <footer className='fixed flex flex-col gap-4 right-6 bottom-6'>
              <ThemeBtn />
            </footer>
          </section>
        }
      </UserDataProtectedRoute>
    </ProtectedRoute>
  );
}
