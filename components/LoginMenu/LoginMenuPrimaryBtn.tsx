import React, { ReactNode } from 'react';
type Props = {
  children: ReactNode;
  handleClick: () => void;
};
const LoginMenuPrimaryBtn = ({ children, handleClick }: Props) => {
  return (
    <button
      className={' text-lg text-center py-1 px-4 hover:bg-gray-200'}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default LoginMenuPrimaryBtn;
