import React from 'react';
import SongResult from './SongResult';

const RequestSongResult = ({ index, result, handleSongClick, children }) => {
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
