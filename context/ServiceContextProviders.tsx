import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

import { AuthContextProvider } from './AuthContext';
import { BuskingContextProvider } from './BuskingContext';
import { LastFmContextProvider } from './LastFmContext';
import { PlaylistContextProvider } from './PlaylistContext';
import { UserDataContextProvider } from './UserDataContext';
import AuthService from '../service/auth_service';
import BuskingRepository from '../service/buskingRepository';
import Lastfm from '../service/lastfm';
import PlaylistRepository from '../service/playlist_repository';
import UserRepository from '../service/userRepository';
type Props = {
  children: ReactNode;
};

const ServiceContextProviders = ({ children }: Props) => {
  //TODO: 네트워크탭에서 api키 그대로 보여지는거 좀 킹받는데 해결방법 없는지 이게 정말 나쁜건지 생각해보기..
  const httpClient = axios.create({
    baseURL: 'https://ws.audioscrobbler.com/2.0',
    params: { api_key: process.env.NEXT_PUBLIC_LASTFM_API_KEY },
  });
  const lastfm = new Lastfm(httpClient);
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
              <LastFmContextProvider lastfm={lastfm}>
                {children}
              </LastFmContextProvider>
            </BuskingContextProvider>
          </PlaylistContextProvider>
        </UserDataContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default ServiceContextProviders;
