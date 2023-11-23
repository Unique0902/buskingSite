import React from 'react';

const MainSec = ({ children, isRow = false, isAlignCenter = false }) => {
  return (
    <main
      className={` w-3/4 max-lg:w-full bg-white flex 
      ${isRow ? 'flex-row' : 'flex-col'} ${
        isAlignCenter && 'items-center'
      } rounded-2xl m-auto mt-12 max-lg:mt-8 p-10 max-lg:px-2 gap-4
      max-lg:py-4 relative`}
    >
      {children}
    </main>
  );
};

export default MainSec;
