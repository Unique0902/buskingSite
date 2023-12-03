import React, { ReactNode } from 'react';
type ArrangeSongType = 'title' | 'artist' | 'time' | 'cnt';
type Props = {
  type: ArrangeSongType;
  handleClick: (tp: ArrangeSongType) => void;
  children: ReactNode;
};
export default function ArrangeBtn({ type, handleClick, children }: Props) {
  const handleBtnClick = () => {
    handleClick(type);
  };
  return (
    <button
      className={' text-black text-lg text-left py-1 px-4 hover:bg-gray-200'}
      onClick={handleBtnClick}
    >
      {children}
    </button>
  );
}
