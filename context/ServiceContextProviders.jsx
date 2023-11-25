import React from 'react';
import axios from 'axios';
import Lastfm from '../service/lastfm';
import AuthService from '../service/auth_service';
import UserRepository from '../service/userRepository';
import PlaylistRepository from '../service/playlist_repository';
import BuskingRepository from '../service/buskingRepository';
import IpService from '../service/ipService';
import { AuthContextProvider } from './AuthContext';
import { UserDataContextProvider } from './UserDataContext';
import { PlaylistContextProvider } from './PlaylistContext';
import { BuskingContextProvider } from './BuskingContext';
import { LastFmContextProvider } from './LastFmContext';
import { IpContextProvider } from './IpContext';

const ServiceContextProviders = ({ children }) => {
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
  return (
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
  );
};

export default ServiceContextProviders;
