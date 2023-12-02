import { createContext, ReactNode, useContext } from 'react';
import IpService from '../service/ipService';
type ContextProps = {
  getIp: () => Promise<string>;
  logIp: () => Promise<void>;
};
type Props = {
  ipService: IpService;
  children: ReactNode;
};

const IpContext = createContext<ContextProps>(undefined);

export function IpContextProvider({ ipService, children }: Props) {
  const getIp = async () => {
    return ipService.getIp();
  };
  const logIp = () => {
    return ipService.logIp();
  };

  return (
    <IpContext.Provider
      value={{
        getIp,
        logIp,
      }}
    >
      {children}
    </IpContext.Provider>
  );
}

export function useIpContext() {
  return useContext(IpContext);
}