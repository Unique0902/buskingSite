import React, { ReactNode, useEffect, useRef } from 'react';
type Props = {
  handleClickOther: () => void;
  isLeft: boolean;
  children: ReactNode;
};
export default function PopupWrapper({
  handleClickOther,
  isLeft,
  children,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>();
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        handleClickOther();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, handleClickOther]);
  return (
    <div
      ref={wrapperRef}
      className={`w-80 border-gray-600 border bg-white absolute rounded-xl z-50 top-0 ${
        isLeft ? 'left-0' : 'right-0'
      } `}
    >
      {children}
    </div>
  );
}
