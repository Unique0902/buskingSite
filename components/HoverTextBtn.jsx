import React, { useState } from 'react';
import { CopyIcn } from '../assets/icon/icon';
const HoverTextBtn = ({ btnText, text }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className='relative font-sans text-lg text-black bg-white rounded-lg px-3 py-2'
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      {btnText}
      {isHovering && (
        <div className='absolute flex flex-row items-center right-0 bg-white rounded-lg border border-gray-500 p-3 w-auto'>
          <p className=' font-sans text-lg max-lg:text-sm text-black'>{text}</p>
          <button
            className='ml-3 hover:opacity-70'
            onClick={() => {
              window.navigator.clipboard.writeText(text);
            }}
          >
            {/* <FaCopy /> */}
            <CopyIcn width={20} height={20} color={'gray'} />
          </button>
        </div>
      )}
    </div>
  );
};

export default HoverTextBtn;
