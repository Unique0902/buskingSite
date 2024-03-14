import React from 'react';

import Icon from '../assets/icon/icon';

type Props = {
  text: string;
};

const SectionCopyText = ({ text }: Props) => {
  const handleClickCopyBtn = () => {
    window.navigator.clipboard.writeText(text);
  };
  return (
    <div className='absolute right-0 flex flex-row items-center w-auto gap-3 p-3 bg-white border border-gray-500 rounded-lg'>
      <p className='text-lg text-black max-lg:text-sm'>{text}</p>
      <button className='hover:opacity-70' onClick={handleClickCopyBtn}>
        <Icon size={20} color='gray' icon='Copy' />
      </button>
    </div>
  );
};

export default SectionCopyText;
