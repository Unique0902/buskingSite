import { createContext, ReactNode, useContext, useState } from 'react';
type ContextProps = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};
const DarkModeContext = createContext<ContextProps>({} as ContextProps);
type Props = {
  children: ReactNode;
};
export function DarkModeContextProvider({ children }: Props) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkModeContext() {
  return useContext(DarkModeContext);
}
