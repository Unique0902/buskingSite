import React from 'react';
import { CopyIcn } from '../assets/icon/icon';

const SectionCopyText = ({ text }) => {
  const handleClickCopyBtn = () => {
    window.navigator.clipboard.writeText(text);
  };
  return (
    <div className='absolute flex flex-row gap-3 items-center right-0 bg-white rounded-lg border border-gray-500 p-3 w-auto'>
      <p className=' font-sans text-lg max-lg:text-sm text-black'>{text}</p>
      <button className='hover:opacity-70' onClick={handleClickCopyBtn}>
        <CopyIcn width={20} height={20} color={'gray'} />
      </button>
    </div>
  );
};

export default SectionCopyText;
