import React, { useState } from 'react';
const HoverIcon = ({ children, text }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className='relative'
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      {children}
      {isHovering && (
        <div className='absolute right-0 w-48 p-2 font-sans text-xs text-gray-600 bg-white border border-gray-500 rounded-lg'>
          {text}
        </div>
      )}
    </div>
  );
};

export default HoverIcon;
