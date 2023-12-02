import React, { ReactNode } from 'react';
type Props = {
  children: ReactNode;
  handleClick?: () => void;
};
const LoginMenuFooterBtn = ({ children, handleClick = () => {} }: Props) => {
  return (
    <button
      className='font-sans text-sm text-gray-500 hover:bg-gray-200'
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default LoginMenuFooterBtn;
