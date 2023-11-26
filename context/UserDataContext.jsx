import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';

const UserDataContext = createContext();

export function UserDataContextProvider({ userRepository, children }) {
  const [userData, setUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const { uid } = useAuthContext();
  useEffect(() => {
    setUserDataLoading(true);
    if (!uid) {
      return;
    }
    userRepository.getUserData(uid).then((data) => {
      data && setUserData(data);
      setUserDataLoading(false);
    });
  }, [uid]);

  const syncUserData = (userId, onUpdate) => {
    userRepository.syncUserData(userId, onUpdate);
  };
  const getUserData = async (userId) => {
    return userRepository.getUserData(userId);
  };
  const removeUserData = async (userId) => {
    setUserData(null);
    return userRepository.removeUser(userId);
  };
  const makeUserData = async (userId, name) => {
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
