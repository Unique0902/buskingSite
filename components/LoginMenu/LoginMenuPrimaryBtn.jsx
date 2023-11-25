import React from 'react';

const LoginMenuPrimaryBtn = ({ children, handleClick }) => {
  return (
    <button
      className={
        'font-sans text-black text-lg text-center py-1 px-4 hover:bg-gray-200'
      }
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default LoginMenuPrimaryBtn;
