import React from 'react';
import { CopyIcn } from '../assets/icon/icon';

type Props = {
  text: string;
};

const SectionCopyText = ({ text }: Props) => {
  const handleClickCopyBtn = () => {
    window.navigator.clipboard.writeText(text);
  };
  return (
    <div className='absolute right-0 flex flex-row items-center w-auto gap-3 p-3 bg-white border border-gray-500 rounded-lg'>
      <p className='text-lg max-lg:text-sm'>{text}</p>
      <button className='hover:opacity-70' onClick={handleClickCopyBtn}>
        <CopyIcn width={20} height={20} color={'gray'} />
      </button>
    </div>
  );
};

export default SectionCopyText;
