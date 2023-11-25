import React from 'react';

const PlaylistMenuBtn = ({ children, handleClick }) => {
  const btnStyle =
    'font-sans text-black text-lg text-left py-1 px-4 hover:bg-gray-200';
  return (
    <button className={btnStyle} onClick={handleClick}>
      {children}
    </button>
  );
};

export default PlaylistMenuBtn;
