import React from 'react';

const MainSec = ({ children }) => {
  return (
    <section
      className={` w-3/4 max-lg:w-full bg-white flex flex-col items-center rounded-2xl m-auto mt-12 max-lg:mt-8 p-10 max-lg:px-2 
      max-lg:py-4 relative`}
    >
      <div className='w-full'>{children}</div>
    </section>
  );
};

export default MainSec;
