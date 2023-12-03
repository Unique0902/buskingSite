import React, { ReactNode } from 'react';

import { ArrowRightIcn } from '../../assets/icon/icon';
type Props = {
  title: string;
  titleColor: string;
  handleClick: () => void;
  children: ReactNode;
};
const InformRow = ({ title, titleColor, handleClick, children }: Props) => {
  return (
    <button
      onClick={handleClick}
      className={`flex w-full text-left flex-row ${
        titleColor == 'red' && 'hover:bg-gray-200'
      } items-center py-3 border-gray-300 border-b relative`}
    >
      <div className='flex flex-row items-center max-lg:flex-col max-lg:items-start'>
        <h2
          className={`text-2xl font-normal ${
            titleColor == 'red' ? 'text-red-500' : 'text-gray-500'
          }  w-36`}
        >
          {title}
        </h2>
        {children}
      </div>

      <ArrowRightIcn
        width={20}
        height={20}
        className={`absolute right-5 text-xl`}
        color={`${titleColor == 'red' ? 'red' : 'gray'}`}
      />
    </button>
  );
};

export default InformRow;
