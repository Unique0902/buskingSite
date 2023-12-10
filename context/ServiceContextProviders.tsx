import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthContextProvider } from './AuthContext';
import { BuskingContextProvider } from './BuskingContext';
import { PlaylistContextProvider } from './PlaylistContext';
import { UserDataContextProvider } from './UserDataContext';
import AuthService from '../service/auth_service';
import BuskingRepository from '../service/buskingRepository';
import PlaylistRepository from '../service/playlist_repository';
import UserRepository from '../service/userRepository';
type Props = {
  children: ReactNode;
};

const ServiceContextProviders = ({ children }: Props) => {
  //TODO: 네트워크탭에서 api키 그대로 보여지는거 좀 킹받는데 해결방법 없는지 이게 정말 나쁜건지 생각해보기..

  const authService = new AuthService();
  const userRepository = new UserRepository();
  const playlistRepository = new PlaylistRepository();
  const buskingRepository = new BuskingRepository();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider authService={authService}>
        <UserDataContextProvider userRepository={userRepository}>
          <PlaylistContextProvider playlistRepository={playlistRepository}>
            <BuskingContextProvider buskingRepository={buskingRepository}>
              {children}
            </BuskingContextProvider>
          </PlaylistContextProvider>
        </UserDataContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default ServiceContextProviders;
