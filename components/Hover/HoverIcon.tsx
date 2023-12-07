import React, { useEffect, useState } from 'react';

import { iconName } from '../../assets/icon/constants';
import Icon from '../../assets/icon/icon';
type Props = {
  text: string;
  icon: iconName;
};
const HoverIcon = ({ text, icon }: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isShowElement, setIsShowElement] = useState<boolean>(false);
  useEffect(() => {
    !isHovering && setIsShowElement(false);
    const timer = isHovering
      ? setTimeout(() => setIsShowElement(true), 100)
      : undefined;
    return () => clearTimeout(timer);
  }, [isHovering]); // hovered가 변할 때만 작동하도록
  return (
    <div
      className='relative'
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <Icon size={24} color='blue' icon={icon} />
      {isShowElement && (
        <div className='absolute right-0 w-48 p-2 text-xs text-gray-600 bg-white border border-gray-500 rounded-lg'>
          {text}
        </div>
      )}
    </div>
  );
};

export default HoverIcon;
