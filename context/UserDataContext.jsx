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
    return userRepository.removeUser(userId);
  };

  return (
    <UserDataContext.Provider
      value={{
        userData,
        userDataLoading,
        syncUserData,
        getUserData,
        removeUserData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserDataContext() {
  return useContext(UserDataContext);
}
