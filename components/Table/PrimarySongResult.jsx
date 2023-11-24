import React from 'react';
import SongResult from './SongResult';

const PrimarySongResult = ({ index, result, handleSongClick, children }) => {
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
