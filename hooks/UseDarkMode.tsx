import useStore from '../store/state/useStore';

export function useDarkMode() {
  const isDarkMode = useStore((state) => state.darkMode);
  const setIsDarkMode = useStore((state) => state.setDarkMode);

  return { isDarkMode, setIsDarkMode };
}
