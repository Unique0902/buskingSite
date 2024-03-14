import React from 'react';

import { useMediaQuery } from 'react-responsive';
import HoverBox from './HoverBox';
type Props = {
  text: string;
};
const SlicedHoverText = ({ text }: Props) => {
  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const maxLeng = isPc ? 30 : 20;
  const slicedText =
    text.length > maxLeng ? text.slice(0, maxLeng) + '..' : text;
  return (
    <HoverBox>
      <HoverBox.OutElement>
        <div className={`font-medium text-lg`}>{slicedText}</div>
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
