import React from 'react';

import SongResult from './SongResult';
import { iconName } from '../../assets/icon/constants';
import Icon from '../../assets/icon/icon';
import { PlaylistSongData } from '../../store/type/playlist';
type Props = {
  index: number;
  result: PlaylistSongData;
  handleSongClick: (sid: string) => void;
  icon: iconName;
};
const PrimarySongResult = ({ index, result, handleSongClick, icon }: Props) => {
  const handleBtnClick = () => {
    handleSongClick(result.id);
  };
  return (
    <SongResult index={index} title={result.title} artist={result.artist}>
      <button onClick={handleBtnClick} className='basis-1/12 hover:scale-110'>
        <Icon size={20} color='white' icon={icon} />
      </button>
    </SongResult>
  );
};

export default PrimarySongResult;
