import React, { ReactNode, useEffect, useState } from 'react';

import { useMediaQuery } from 'react-responsive';

import ThemeBtn from './Footer/ThemeBtn';
import AppHeader from './Header/AppHeader';
import SideBar from './SideBar/SideBar';
import { BuskingContextProvider } from '../../context/BuskingContext';
import { DarkModeContextProvider } from '../../context/DarkModeContext';
import { PlaylistContextProvider } from '../../context/PlaylistContext';
import { UserDataContextProvider } from '../../context/UserDataContext';
import BuskingRepository from '../../service/buskingRepository';
import PlaylistRepository from '../../service/playlist_repository';
import UserRepository from '../../service/userRepository';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserDataProtectedRoute from '../ProtectedRoute/UserDataProtectedRoute';
type Props = {
  children: ReactNode;
};
const userRepository = new UserRepository();
const playlistRepository = new PlaylistRepository();
const buskingRepository = new BuskingRepository();
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
      <UserDataContextProvider userRepository={userRepository}>
        <UserDataProtectedRoute>
          <PlaylistContextProvider playlistRepository={playlistRepository}>
            <BuskingContextProvider buskingRepository={buskingRepository}>
              {
                <section className='flex h-screen bg-gradient-to-b from-blue-500 to-white dark:from-slate-900 dark:to-slate-700 '>
                  {isShowSideBar && (
                    <SideBar setIsShowSideBar={setIsShowSideBar} />
                  )}
                  <main className='relative px-8 py-6 overflow-y-auto grow max-lg:px-4'>
                    <AppHeader
                      isShowSideBar={isShowSideBar}
                      setIsShowSideBar={setIsShowSideBar}
                    />
                    {children}
                  </main>
                  <footer className='fixed flex flex-col gap-4 right-6 bottom-6'>
                    <DarkModeContextProvider>
                      <ThemeBtn />
                    </DarkModeContextProvider>
                  </footer>
                </section>
              }
            </BuskingContextProvider>
          </PlaylistContextProvider>
        </UserDataProtectedRoute>
      </UserDataContextProvider>
    </ProtectedRoute>
  );
}
