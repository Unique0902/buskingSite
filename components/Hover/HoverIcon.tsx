import React from 'react';

import { iconName } from '../../assets/icon/constants';
import Icon from '../../assets/icon/icon';
import HoverBox from './HoverBox';
type Props = {
  text: string;
  icon: iconName;
};
const HoverIcon = ({ text, icon }: Props) => {
  return (
    <HoverBox>
      <HoverBox.OutElement>
        <Icon size={24} color='blue' icon={icon} />
      </HoverBox.OutElement>
      <HoverBox.InnerElement>
        <div className='absolute right-0 w-48 p-2 text-xs text-gray-600 bg-white border border-gray-500 rounded-lg'>
          {text}
        </div>
      </HoverBox.InnerElement>
    </HoverBox>
  );
};

export default HoverIcon;
