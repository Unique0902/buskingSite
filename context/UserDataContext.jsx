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
  return (
    <UserDataContext.Provider value={{ userData, userDataLoading }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserDataContext() {
  return useContext(UserDataContext);
}
