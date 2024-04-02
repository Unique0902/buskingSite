import React, { ReactNode, useEffect, useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, handleClickOther);
  return (
    <div
      ref={wrapperRef}
      className={`w-80 border-gray-600 border bg-white dark:bg-slate-800 absolute rounded-xl z-50 top-0 ${
        isLeft ? 'left-0' : 'right-0'
      } `}
    >
      {children}
    </div>
  );
}
