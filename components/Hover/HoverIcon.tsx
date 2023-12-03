import React, { ReactNode, useState } from 'react';
type Props = {
  children: ReactNode;
  text: string;
};
const HoverIcon = ({ children, text }: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <div
      className='relative'
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      {children}
      {isHovering && (
        <div className='absolute right-0 w-48 p-2 text-xs text-gray-600 bg-white border border-gray-500 rounded-lg'>
          {text}
        </div>
      )}
    </div>
  );
};

export default HoverIcon;
