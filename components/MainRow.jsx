import React from 'react';

const MainRow = ({ title, children }) => {
  return (
    <div className='flex flex-row items-center max-lg:flex-col py-3 border-gray-300 border-b relative'>
      <h2 className='font-sans text-2xl max-lg:w-full max-lg:text-xl max-lg:text-center font-normal text-black w-64'>
        {title}
      </h2>
      {children}
    </div>
  );
};

export default MainRow;
