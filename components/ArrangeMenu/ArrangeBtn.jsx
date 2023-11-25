import React from 'react';

export default function ArrangeBtn({ type, handleClick, children }) {
  const handleBtnClick = () => {
    handleClick(type);
  };
  return (
    <button
      className={
        'font-sans text-black text-lg text-left py-1 px-4 hover:bg-gray-200'
      }
      onClick={handleBtnClick}
    >
      {children}
    </button>
  );
}
