import React, { useEffect, useState } from 'react';

import { useMediaQuery } from 'react-responsive';
type Props = {
  text: string;
};
const SlicedHoverText = ({ text }: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isShowElement, setIsShowElement] = useState<boolean>(false);
  useEffect(() => {
    !isHovering && setIsShowElement(false);
    const timer = isHovering
      ? setTimeout(() => setIsShowElement(true), 500)
      : undefined;
    return () => clearTimeout(timer);
  }, [isHovering]); // hovered가 변할 때만 작동하도록
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
      {isShowElement && (
        <p className='absolute z-10 p-2 bg-gray-900 border border-gray-500 rounded-lg'>
          {text}
        </p>
      )}
    </div>
  );
};

export default SlicedHoverText;
