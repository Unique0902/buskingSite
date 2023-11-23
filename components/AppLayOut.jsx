import React, { useEffect, useState } from 'react';
import AppHeader from './AppHeader';
import ProtectedRoute from './ProtectedRoute';
import SideBar from './SideBar';
import UserDataProtectedRoute from './UserDataProtectedRoute';
import { useMediaQuery } from 'react-responsive';

export default function AppLayOut({ children }) {
  const [isShowSideBar, setIsShowSideBar] = useState(true);
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
        <section className='flex h-screen text-black bg-gradient-to-b from-blue-500 to-white '>
          {isShowSideBar && (
            <SideBar
              isShowSideBar={isShowSideBar}
              setIsShowSideBar={setIsShowSideBar}
            />
          )}
          <main className=' grow py-6 px-8 max-lg:px-4 overflow-y-auto'>
            <AppHeader
              isShowSideBar={isShowSideBar}
              setIsShowSideBar={setIsShowSideBar}
            />
            {children}
          </main>
        </section>
      </UserDataProtectedRoute>
    </ProtectedRoute>
  );
}
