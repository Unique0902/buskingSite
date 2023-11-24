import React from 'react';
import SongResult from './SongResult';

const SongAddResult = ({ index, result, handleSongClick, children }) => {
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
