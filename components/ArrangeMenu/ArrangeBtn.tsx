import React, { ReactNode } from 'react';
type Props = {
  handleClick: () => void;
  children: ReactNode;
};
export default function ArrangeBtn({ handleClick, children }: Props) {
  return (
    <button
      className={' text-lg text-left py-1 px-4 hover:bg-gray-200'}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
