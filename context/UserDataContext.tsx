import { createContext, ReactNode, useContext, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Unsubscribe } from 'firebase/auth';

import { useAuthContext } from './AuthContext';
import UserRepository from '../service/userRepository';
import { UserData } from '../store/type/userData';

type Props = {
  userRepository: UserRepository;
  children: ReactNode;
};

type ContextProps = {
  userData: UserData | undefined | null;
  buskingApplyUserData: UserData | null | undefined;
  isLoading: boolean;
  syncUserData: (
    userId: string,
    onUpdate: (value: UserData | null) => void
  ) => Unsubscribe;
  getBuskingApplyUserData: (userId: string) => void;
  removeUserData: (userId: string) => void;
  makeUserData: (userId: string, name: string) => void;
};

const UserDataContext = createContext<ContextProps>({} as ContextProps);

export function UserDataContextProvider({ userRepository, children }: Props) {
  const queryClient = useQueryClient();
  const [buskingApplyUserId, setBuskingApplyUserId] = useState<string | null>(
    null
  );
  const { uid } = useAuthContext();
  const { data, isLoading } = useQuery({
    queryKey: ['userData'],
    queryFn: () => userRepository.getUserData(uid as string),
    enabled: !!uid,
  });
  const buskingApplyUserDataQuery = useQuery({
    queryKey: ['buskingApplyUserData'],
    queryFn: () => userRepository.getUserData(buskingApplyUserId as string),
    enabled: !!buskingApplyUserId,
  });
  const makeMutation = useMutation({
    mutationFn: ({ userId, name }: { userId: string; name: string }) => {
      return userRepository.makeUser(userId, name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
  });
  const removeMutation = useMutation({
    mutationFn: (userId: string) => {
      return userRepository.removeUser(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
  });

  //TODO: react query 변경
  const syncUserData = (
    userId: string,
    onUpdate: (value: UserData | null) => void
  ) => {
    return userRepository.syncUserData(userId, onUpdate);
  };

  const getBuskingApplyUserData = (userId: string) => {
    setBuskingApplyUserId(userId);
  };
  const removeUserData = (userId: string) => {
    removeMutation.mutate(userId);
  };
  const makeUserData = (userId: string, name: string) => {
    makeMutation.mutate({ userId, name });
  };
  // 유저 데이터가 서버에 만들어졌을때 응답 받을수있게, setUserData할수있게
  return (
    <UserDataContext.Provider
      value={{
        userData: data,
        buskingApplyUserData: buskingApplyUserDataQuery.data,
        isLoading,
        syncUserData,
        getBuskingApplyUserData,
        removeUserData,
        makeUserData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserDataContext() {
  return useContext(UserDataContext);
}
