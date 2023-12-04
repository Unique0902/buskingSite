import { UserInfo } from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import AuthService from '../service/auth_service';
type ContextProps = {
  user: UserInfo | undefined;
  userLoading: boolean;
  uid: string | undefined;
  login: (providerName: string) => void;
  logout: () => void;
};

const initailValue: ContextProps = {
  user: undefined,
  userLoading: true,
  uid: undefined,
  login: (providerName: string) => {},
  logout: () => {},
};

const AuthContext = createContext<ContextProps>(initailValue);

type Props = {
  authService: AuthService;
  children: ReactNode;
};

export function AuthContextProvider({ authService, children }: Props) {
  const [user, setUser] = useState<UserInfo | undefined>();
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
