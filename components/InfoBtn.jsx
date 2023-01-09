import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
const InfoBtn = ({ text }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className='relative'
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <FaInfoCircle className='text-blue-500 text-2xl max-lg:text-xl ml-3' />
      {isHovering && (
        <div className='absolute rounded-lg border right-0 border-gray-500 p-2 bg-white w-48 font-sans text-xs text-gray-600'>
          {text}
        </div>
      )}
    </div>
  );
};

export default InfoBtn;
