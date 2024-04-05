import React from 'react';

import Link from 'next/link';

import { iconName } from '../../../assets/icon/constants';
import Icon from '../../../assets/icon/icon';
type Props = {
  name: string;
  isSelected: boolean;
  isMiniMode: boolean;
  text: string;
  icon: iconName;
};
export default function SideBarMenuBtn({
  name,
  isSelected,
  isMiniMode,
  text,
  icon,
}: Props) {
  const btnStyle =
    'text-white flex items-center pl-5 py-4 w-full text-left cursor-pointer font-medium text-lg hover:bg-zinc-600 ';
  const hideBtnStyle =
    'text-white flex items-center py-4 w-full cursor-pointer font-medium text-lg hover:bg-zinc-600 justify-center';

  return (
    <Link
      href={`/app/${name}`}
      className={`${isMiniMode ? hideBtnStyle : btnStyle} ${
        isSelected ? 'text-blue-400' : 'text-white'
      } `}
      data-testid={isSelected ? 'selectedMenu' : ''}
    >
      <div className={`${!isMiniMode && 'mr-4'}`}>
        <Icon
          size={24}
          color={`${isSelected ? '#60a5fa' : '#FFFFFF'}`}
          icon={icon}
        />
      </div>

      {!isMiniMode && text}
    </Link>
  );
}
