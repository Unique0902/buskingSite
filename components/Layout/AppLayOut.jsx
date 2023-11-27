import React, { useEffect, useState } from 'react';
import AppHeader from './Header/AppHeader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserDataProtectedRoute from '../ProtectedRoute/UserDataProtectedRoute';
import { useMediaQuery } from 'react-responsive';
import SideBar from './SideBar/SideBar.jsx';

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
          {isShowSideBar && <SideBar setIsShowSideBar={setIsShowSideBar} />}
          <main className='px-8 py-6 overflow-y-auto grow max-lg:px-4'>
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
