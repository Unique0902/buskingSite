import React from 'react';

const LoginMenuFooterBtn = ({ children, handleClick = () => {} }) => {
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
