import React, { ReactNode } from 'react';
type Props = {
  title: string;
  children: ReactNode;
};
const RowWithTitle = ({ title, children }: Props) => {
  return (
    <div className='relative flex flex-row items-center py-3 border-b border-gray-300 max-lg:flex-col'>
      <h2 className='w-48 font-sans text-2xl font-normal text-black max-lg:w-full max-lg:text-xl max-lg:text-center'>
        {title}
      </h2>
      {children}
    </div>
  );
};

export default RowWithTitle;
