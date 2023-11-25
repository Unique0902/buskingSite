import React, { useEffect, useRef } from 'react';

export default function PopupWrapper({ handleClickOther, isLeft, children }) {
  const wrapperRef = useRef();
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
  }, [wrapperRef]);
  return (
    <div
      ref={wrapperRef}
      className={`w-80 border-gray-600 border bg-white text-black absolute rounded-xl z-50 top-0 ${
        isLeft ? 'left-0' : 'right-0'
      } `}
    >
      {children}
    </div>
  );
}
