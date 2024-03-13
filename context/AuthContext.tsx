import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { UserInfo } from 'firebase/auth';

import AuthService from '../service/auth_service';
type ContextProps = {
  user: UserInfo | null;
  userLoading: boolean;
  uid: string | undefined;
  login: (providerName: string) => void;
  logout: () => void;
};

// 아래에서 provider에서 초기화해주는게 확실히하면 이런식으로 cheating해도 상관없다.
// 하지만 코드를 이렇게 쓰게만든다는거에서는 context가 typescript를 쓰기에는 좀 불완전하다 싶네요.
const AuthContext = createContext<ContextProps>({} as ContextProps);

type Props = {
  children: ReactNode;
};

const authService = new AuthService();

export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const logout = () => {
    authService.logout();
  };
  const login = (providerName: string) => {
    authService.login(providerName);
  };
  useEffect(() => {
    setUserLoading(true);
    return authService.onAuthChange((user) => {
      setUser(user);
      setUserLoading(false);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        userLoading,
        uid: user ? user.uid : undefined,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
