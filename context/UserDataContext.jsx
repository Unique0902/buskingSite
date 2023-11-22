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
    userRepository.syncUserData(uid, (data) => {
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

  return (
    <UserDataContext.Provider
      value={{
        userData,
        userDataLoading,
        syncUserData,
        getUserData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserDataContext() {
  return useContext(UserDataContext);
}
