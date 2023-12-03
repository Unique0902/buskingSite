import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  isRow?: boolean;
  isAlignCenter?: boolean;
};

const MainSec = ({ children, isRow = false, isAlignCenter = false }: Props) => {
  return (
    <main
      className={` w-3/4 max-lg:w-full bg-white flex dark:bg-slate-600
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
