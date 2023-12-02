import React, { ReactNode } from 'react';
import { FmEditedTopTrackData, FmTrackData } from '../../store/type/fm';
import SongResult from './SongResult';
type Props = {
  index: number;
  result: FmTrackData | FmEditedTopTrackData;
  handleSongClick: (title: string, artist: string) => Promise<void>;
  children: ReactNode;
};
const SongAddResult = ({ index, result, handleSongClick, children }: Props) => {
  const handleBtnClick = () => {
    handleSongClick(result.name, result.artist);
  };
  return (
    <SongResult index={index} title={result.name} artist={result.artist}>
      <button onClick={handleBtnClick} className='basis-1/12 hover:scale-110'>
        {children}
      </button>
    </SongResult>
  );
};

export default SongAddResult;
