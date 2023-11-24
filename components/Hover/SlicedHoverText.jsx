import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const SlicedHoverText = ({ text }) => {
  const [isHovering, setIsHovering] = useState(false);
  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const maxLeng = isPc ? 30 : 20;
  const slicedText =
    text.length > maxLeng ? text.slice(0, maxLeng) + '..' : text;
  return (
    <div
      className={`relative text-white font-medium text-lg`}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      {slicedText}
      {isHovering && (
        <p className='absolute p-2 text-black bg-white border border-gray-500 rounded-lg'>
          {text}
        </p>
      )}
    </div>
  );
};

export default SlicedHoverText;
