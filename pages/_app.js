import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import AuthService from '../service/auth_service';
import Lastfm from '../service/lastfm';
import PlaylistRepository from '../service/playlist_repository';
import UserRepository from '../service/userRepository';
import BuskingRepository from '../service/buskingRepository';
import '../styles/globals.css';
import { AuthContextProvider } from '../context/AuthContext';
import { UserDataContextProvider } from '../context/UserDataContext';
import { PlaylistContextProvider } from '../context/PlaylistContext';
import { BuskingContextProvider } from '../context/BuskingContext';
import { LastFmContextProvider } from '../context/LastFmContext';
import Head from 'next/head';
import { IpContextProvider } from '../context/IpContext';
import IpService from '../service/ipService';

const queryClient = new QueryClient();
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

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <>{page}</>);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider authService={authService}>
        <UserDataContextProvider userRepository={userRepository}>
          <PlaylistContextProvider playlistRepository={playlistRepository}>
            <BuskingContextProvider buskingRepository={buskingRepository}>
              <LastFmContextProvider lastfm={lastfm}>
                <IpContextProvider ipService={ipService}>
                  <Head>
                    <title>노래책</title>
                    <meta
                      name='desciption'
                      content='당신만의 온라인, 오프라인 버스킹을 여기서 시작하세요. 
                    당신만의 노래 리스트를 생성하여 애창곡을 검색하여 저장하세요.
                    버스킹을 시작하여 공유되는 링크를 이용하여 관객들로부터 노래를
                    신청받으세요.'
                    />
                  </Head>
                  {getLayout(<Component {...pageProps} />)}
                </IpContextProvider>
              </LastFmContextProvider>
            </BuskingContextProvider>
          </PlaylistContextProvider>
        </UserDataContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
