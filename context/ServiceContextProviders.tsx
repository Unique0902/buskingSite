import React, { ReactNode } from 'react';

import axios from 'axios';

import { AuthContextProvider } from './AuthContext';
import { BuskingContextProvider } from './BuskingContext';
import { IpContextProvider } from './IpContext';
import { LastFmContextProvider } from './LastFmContext';
import { PlaylistContextProvider } from './PlaylistContext';
import { UserDataContextProvider } from './UserDataContext';
import AuthService from '../service/auth_service';
import BuskingRepository from '../service/buskingRepository';
import IpService from '../service/ipService';
import Lastfm from '../service/lastfm';
import PlaylistRepository from '../service/playlist_repository';
import UserRepository from '../service/userRepository';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
type Props = {
  children: ReactNode;
};

const ServiceContextProviders = ({ children }: Props) => {
  const httpClient = axios.create({
    baseURL: 'https://ws.audioscrobbler.com/2.0',
    params: { api_key: process.env.NEXT_PUBLIC_LASTFM_API_KEY },
  });
  const lastfm = new Lastfm(httpClient);
  const authService = new AuthService();
  const userRepository = new UserRepository();
  const playlistRepository = new PlaylistRepository();
  const buskingRepository = new BuskingRepository();
  const ipService = new IpService();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider authService={authService}>
        <UserDataContextProvider userRepository={userRepository}>
          <PlaylistContextProvider playlistRepository={playlistRepository}>
            <BuskingContextProvider buskingRepository={buskingRepository}>
              <LastFmContextProvider lastfm={lastfm}>
                <IpContextProvider ipService={ipService}>
                  {children}
                </IpContextProvider>
              </LastFmContextProvider>
            </BuskingContextProvider>
          </PlaylistContextProvider>
        </UserDataContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default ServiceContextProviders;
