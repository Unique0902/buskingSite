import { Unsubscribe } from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import UserRepository from '../service/userRepository';
import { UserData } from '../store/type/userData';
import { useAuthContext } from './AuthContext';

type Props = {
  userRepository: UserRepository;
  children: ReactNode;
};

type ContextProps = {
  userData: UserData | null;
  userDataLoading: boolean;
  syncUserData: (
    userId: string,
    onUpdate: (value: UserData | null) => void
  ) => Unsubscribe;
  getUserData: (userId: string) => Promise<UserData | null>;
  removeUserData: (userId: string) => Promise<void>;
  makeUserData: (userId: string, name: string) => Promise<UserData>;
};

const UserDataContext = createContext<ContextProps>({} as ContextProps);

export function UserDataContextProvider({ userRepository, children }: Props) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userDataLoading, setUserDataLoading] = useState<boolean>(true);
  const { uid } = useAuthContext();
  useEffect(() => {
    setUserDataLoading(true);
    if (!uid) {
      setUserData(null);
      return;
    }
    userRepository.getUserData(uid).then((data) => {
      data && setUserData(data);
      setUserDataLoading(false);
    });
  }, [uid]);

  const syncUserData = (
    userId: string,
    onUpdate: (value: UserData | null) => void
  ) => {
    return userRepository.syncUserData(userId, onUpdate);
  };
  const getUserData = async (userId: string) => {
    return userRepository.getUserData(userId);
  };
  const removeUserData = async (userId: string) => {
    return userRepository.removeUser(userId);
  };
  const makeUserData = async (userId: string, name: string) => {
    const data = await userRepository.makeUser(userId, name);
    setUserData(data);
    return data;
  };
  // 유저 데이터가 서버에 만들어졌을때 응답 받을수있게, setUserData할수있게
  return (
    <UserDataContext.Provider
      value={{
        userData,
        userDataLoading,
        syncUserData,
        getUserData,
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
