import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthContextProvider({ authService, children }) {
  const [user, setUser] = useState();
  const [userLoading, setUserLoading] = useState(true);
  const logout = () => {
    authService.logout();
  };
  const login = (providerName) => {
    authService.login(providerName);
  };
  useEffect(() => {
    setUserLoading(true);
    authService.onAuthChange((user) => {
      setUser(user);
      setUserLoading(false);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, userLoading, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
