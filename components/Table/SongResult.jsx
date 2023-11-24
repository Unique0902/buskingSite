import React from 'react';
import SlicedHoverText from '../Hover/SlicedHoverText';
const SongResult = ({ index, title, artist, children }) => {
  return (
    <li className='flex flex-row items-center justify-between w-full px-2 py-2 mb-1 font-sans text-base font-light text-center text-white rounded-xl'>
      <p className='basis-1/12'>{index}</p>
      <div className='pl-2 text-left basis-5/6'>
        <SlicedHoverText text={title} />
        <SlicedHoverText text={artist} />
      </div>
      {children}
    </li>
  );
};

export default SongResult;
