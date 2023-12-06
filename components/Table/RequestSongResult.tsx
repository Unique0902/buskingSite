import React, { ReactNode } from 'react';
import { iconName } from '../../assets/icon/constants';
import Icon from '../../assets/icon/icon';
import { ApplianceData } from '../../store/type/busking';
import SongResult from './SongResult';
type Props = {
  index: number;
  result: ApplianceData;
  handleSongClick: (sid: string) => void;
  icon: iconName;
};
const RequestSongResult = ({ index, result, handleSongClick, icon }: Props) => {
  const handleBtnClick = () => {
    handleSongClick(result.sid);
  };
  return (
    <SongResult index={index} title={result.title} artist={result.artist}>
      <p className='basis-1/12'>{result.cnt + '명'}</p>
      <button onClick={handleBtnClick} className='basis-1/12 hover:scale-110'>
        <Icon size={20} color='white' icon={icon} />
      </button>
    </SongResult>
  );
};

export default RequestSongResult;
