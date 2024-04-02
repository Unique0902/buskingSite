import { createContext, ReactNode, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

type ContextProps = {
  isSmScreen: boolean;
};

const MediaQueryContext = createContext<ContextProps>({} as ContextProps);

type Props = {
  children: ReactNode;
};

export function MediaQueryContextProvider({ children }: Props) {
  const isSmScreen = useMediaQuery({
    query: '(max-width:1024px)',
  });

  return (
    <MediaQueryContext.Provider
      value={{
        isSmScreen,
      }}
    >
      {children}
    </MediaQueryContext.Provider>
  );
}

export function useMediaQueryContext() {
  return useContext(MediaQueryContext);
}
