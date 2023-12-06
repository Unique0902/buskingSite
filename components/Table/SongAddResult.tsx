import React from 'react';
import { iconName } from '../../assets/icon/constants';
import Icon from '../../assets/icon/icon';
import { FmEditedTopTrackData, FmTrackData } from '../../store/type/fm';
import SongResult from './SongResult';
type Props = {
  index: number;
  result: FmTrackData | FmEditedTopTrackData;
  handleSongClick: (title: string, artist: string) => Promise<void>;
  icon: iconName;
};
const SongAddResult = ({ index, result, handleSongClick, icon }: Props) => {
  const handleBtnClick = () => {
    handleSongClick(result.name, result.artist);
  };
  return (
    <SongResult index={index} title={result.name} artist={result.artist}>
      <button onClick={handleBtnClick} className='basis-1/12 hover:scale-110'>
        <Icon size={24} color='white' icon={icon} />
      </button>
    </SongResult>
  );
};

export default SongAddResult;
