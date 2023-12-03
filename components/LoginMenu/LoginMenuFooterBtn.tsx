import React, { ReactNode } from 'react';
type Props = {
  children: ReactNode;
  handleClick?: () => void;
};
const LoginMenuFooterBtn = ({ children, handleClick = () => {} }: Props) => {
  return (
    <button
      className='text-sm text-gray-500 hover:bg-gray-200 dark:text-gray-300'
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default LoginMenuFooterBtn;
