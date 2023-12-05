import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
type Props = {
  text: string;
};
const SlicedHoverText = ({ text }: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const maxLeng = isPc ? 30 : 20;
  const slicedText =
    text.length > maxLeng ? text.slice(0, maxLeng) + '..' : text;
  return (
    <div
      className={`relative font-medium text-lg`}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      {slicedText}
      {isHovering && (
        <p className='absolute z-10 p-2 bg-gray-900 border border-gray-500 rounded-lg'>
          {text}
        </p>
      )}
    </div>
  );
};

export default SlicedHoverText;
