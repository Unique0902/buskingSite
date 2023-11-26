import { createContext, useContext } from 'react';

const IpContext = createContext();

export function IpContextProvider({ ipService, children }) {
  const getIp = async () => {
    return ipService.getIp();
  };
  // const logIp = () => {
  //   return ipService.logIp();
  // };

  return (
    <IpContext.Provider
      value={{
        getIp,
      }}
    >
      {children}
    </IpContext.Provider>
  );
}

export function useIpContext() {
  return useContext(IpContext);
}
