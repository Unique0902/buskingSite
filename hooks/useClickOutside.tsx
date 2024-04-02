import { useEffect } from 'react';

export const useClickOutside = (
  insideBlockRef: React.RefObject<HTMLDivElement>,
  onClickOutside: () => void,
  isObserveClick: boolean = true
) => {
  useEffect(() => {
    if (isObserveClick) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          insideBlockRef.current &&
          !insideBlockRef.current.contains(event.target as Node)
        ) {
          onClickOutside();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [insideBlockRef, isObserveClick, onClickOutside]);
  return {};
};
