import React, { useState } from 'react';
import { InformIcn } from '../assets/icon/icon';
const InfoBtn = ({ text }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className='relative'
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <InformIcn
        color={'blue'}
        width={24}
        height={24}
        className='text-blue-500 text-2xl max-lg:w-5 max-lg:h-5 ml-3'
      />
      {isHovering && (
        <div className='absolute rounded-lg border right-0 border-gray-500 p-2 bg-white w-48 font-sans text-xs text-gray-600'>
          {text}
        </div>
      )}
    </div>
  );
};

export default InfoBtn;
