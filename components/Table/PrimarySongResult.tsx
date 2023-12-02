import React, { ReactNode } from 'react';
import { PlaylistSongData } from '../../store/type/playlist';
import SongResult from './SongResult';
type Props = {
  index: number;
  result: PlaylistSongData;
  handleSongClick: (sid: string) => void;
  children: ReactNode;
};
const PrimarySongResult = ({
  index,
  result,
  handleSongClick,
  children,
}: Props) => {
  const handleBtnClick = () => {
    handleSongClick(result.id);
  };
  return (
    <SongResult index={index} title={result.title} artist={result.artist}>
      <button onClick={handleBtnClick} className='basis-1/12 hover:scale-110'>
        {children}
      </button>
    </SongResult>
  );
};

export default PrimarySongResult;
