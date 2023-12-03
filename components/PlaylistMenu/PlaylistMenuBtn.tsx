import React, { ReactNode } from 'react';
type Props = {
  children: ReactNode;
  handleClick: () => void;
};
const PlaylistMenuBtn = ({ children, handleClick }: Props) => {
  const btnStyle = 'text-black text-lg text-left py-1 px-4 hover:bg-gray-200';
  return (
    <button className={btnStyle} onClick={handleClick}>
      {children}
    </button>
  );
};

export default PlaylistMenuBtn;
