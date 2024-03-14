import React from 'react';

import HoverBox from './HoverBox';
type Props = {
  text: string;
};
const SlicedHoverText = ({ text }: Props) => {
  return (
    <HoverBox>
      <HoverBox.OutElement>
        <div
          className={`font-medium text-lg text-ellipsis w-48 max-lg:w-36 overflow-hidden whitespace-nowrap`}
        >
          {text}
        </div>
      </HoverBox.OutElement>
      <HoverBox.InnerElement>
        <p className='absolute z-10 p-2 bg-gray-900 border border-gray-500 rounded-lg'>
          {text}
        </p>
      </HoverBox.InnerElement>
    </HoverBox>
  );
};

export default SlicedHoverText;
