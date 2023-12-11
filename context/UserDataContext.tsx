import { createContext, ReactNode, useContext } from 'react';

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
  isLoading: boolean;
  syncUserData: (
    userId: string,
    onUpdate: (value: UserData | null) => void
  ) => Unsubscribe;
  removeUserData: (userId: string) => void;
  makeUserData: (userId: string, name: string) => void;
};

const UserDataContext = createContext<ContextProps>({} as ContextProps);

export function UserDataContextProvider({ userRepository, children }: Props) {
  const queryClient = useQueryClient();

  const { uid } = useAuthContext();
  const { data, isLoading } = useQuery({
    queryKey: [uid, 'userData'],
    queryFn: () => {
      return userRepository.getUserData(uid as string);
    },
    staleTime: 60 * 1000 * 2,
    enabled: !!uid,
  });

  const userDataMutation = useMutation({
    mutationFn: ({
      mutationFunction,
    }: {
      mutationFunction: () => Promise<void>;
    }) => mutationFunction(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [uid, 'userData'],
      });
    },
  });

  //TODO: react query 변경
  const syncUserData = (
    userId: string,
    onUpdate: (value: UserData | null) => void
  ) => {
    return userRepository.syncUserData(userId, onUpdate);
  };

  const removeUserData = (userId: string) => {
    userDataMutation.mutate({
      mutationFunction: () => userRepository.removeUser(userId),
    });
  };
  const makeUserData = (userId: string, name: string) => {
    userDataMutation.mutate({
      mutationFunction: () => userRepository.makeUser(userId, name),
    });
  };
  // 유저 데이터가 서버에 만들어졌을때 응답 받을수있게, setUserData할수있게
  return (
    <UserDataContext.Provider
      value={{
        userData: data,
        isLoading,
        syncUserData,
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
