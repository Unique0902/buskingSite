import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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

// 이게 자꾸 리렌더링이 나서 QueryClient가 새로 만들어졌던거구나...
// 나는 굳이 밖의 context까지 리렌더링이 될줄 몰랐는데..
//TODO:왜 자꾸 리렌더링이 발생하는거지?? Next Js의 _app의 동작원리가 뭐지? 페이지 바꿀때마다 리렌더링이 되네? < nextjs 공부하기

const queryClient = new QueryClient();
const authService = new AuthService();
const userRepository = new UserRepository();
const playlistRepository = new PlaylistRepository();
const buskingRepository = new BuskingRepository();

const ServiceContextProviders = ({ children }: Props) => {
  //TODO: 네트워크탭에서 api키 그대로 보여지는거 좀 킹받는데 해결방법 없는지 이게 정말 나쁜건지 생각해보기.. <이게 불만이면
  // nextJs 사용하여 서버에서 데이터 주입받고 보여줘야되는데.. 근데 또 새로 검색해버리면 다시 보이네..
  // Redriect server 이용하면 해결된다. 근데 아마 학습할필요가있음.

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider authService={authService}>
        <UserDataContextProvider userRepository={userRepository}>
          <PlaylistContextProvider playlistRepository={playlistRepository}>
            <BuskingContextProvider buskingRepository={buskingRepository}>
              {children}
              <ReactQueryDevtools initialIsOpen={true} />
            </BuskingContextProvider>
          </PlaylistContextProvider>
        </UserDataContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default ServiceContextProviders;
