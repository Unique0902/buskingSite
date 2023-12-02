import React, { ReactNode } from 'react';
import { ApplianceData } from '../../store/type/busking';
import SongResult from './SongResult';
type Props = {
  index: number;
  result: ApplianceData;
  handleSongClick: (sid: string) => void;
  children: ReactNode;
};
const RequestSongResult = ({
  index,
  result,
  handleSongClick,
  children,
}: Props) => {
  const handleBtnClick = () => {
    handleSongClick(result.sid);
  };
  return (
    <SongResult index={index} title={result.title} artist={result.artist}>
      <p className='basis-1/12'>{result.cnt + '명'}</p>
      <button onClick={handleBtnClick} className='basis-1/12 hover:scale-110'>
        {children}
      </button>
    </SongResult>
  );
};

export default RequestSongResult;
