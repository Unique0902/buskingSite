import React, { ReactNode } from 'react';

import { iconName } from '../../assets/icon/constants';
import Icon from '../../assets/icon/icon';
import SlicedHoverText from '../Hover/SlicedHoverText';
type Props = {
  children: ReactNode;
};
const SongResultRow = ({ children }: Props) => {
  return (
    <li className='flex flex-row items-center justify-between w-full gap-2 px-2 py-2 mb-1 text-base font-light text-center text-white rounded-xl'>
      {children}
    </li>
  );
};

const Text = ({ text }: { text: string }) => {
  return <p className='basis-1/12'>{text}</p>;
};

const Inform = ({ title, artist }: { title: string; artist: string }) => {
  return (
    <div className='text-left basis-5/6'>
      <SlicedHoverText text={title} />
      <SlicedHoverText text={artist} />
    </div>
  );
};

const IconButton = ({
  icon,
  size,
  color,
  onClick,
}: {
  icon: iconName;
  size: number;
  color: string;
  onClick: () => void;
}) => {
  const handleClickBtn = onClick;
  return (
    <button className='basis-1/12 hover:scale-110' onClick={handleClickBtn}>
      <Icon icon={icon} size={size} color={color} />
    </button>
  );
};

SongResultRow.Text = Text;
SongResultRow.Inform = Inform;
SongResultRow.IconButton = IconButton;

export default SongResultRow;
