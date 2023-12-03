import React, { ReactNode, useEffect, useState } from 'react';
import AppHeader from './Header/AppHeader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserDataProtectedRoute from '../ProtectedRoute/UserDataProtectedRoute';
import { useMediaQuery } from 'react-responsive';
import SideBar from './SideBar/SideBar';
import ThemeBtn from './Footer/ThemeBtn';
type Props = {
  children: ReactNode;
};
export default function AppLayOut({ children }: Props) {
  const [isShowSideBar, setIsShowSideBar] = useState<boolean>(true);
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
  return (
    <ProtectedRoute>
      <UserDataProtectedRoute>
        <section className='flex h-screen bg-gradient-to-b from-blue-500 to-white dark:from-slate-900 dark:to-slate-700 '>
          {isShowSideBar && <SideBar setIsShowSideBar={setIsShowSideBar} />}
          <main className='relative px-8 py-6 overflow-y-auto grow max-lg:px-4'>
            <AppHeader
              isShowSideBar={isShowSideBar}
              setIsShowSideBar={setIsShowSideBar}
            />
            {children}
          </main>
          <footer className='fixed right-6 bottom-6'>
            <ThemeBtn />
          </footer>
        </section>
      </UserDataProtectedRoute>
    </ProtectedRoute>
  );
}
