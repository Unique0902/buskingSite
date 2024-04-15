import React from 'react';

const NoSongScreen: React.FC = () => {
  return (
    <ul className='p-1 bg-gray-800 rounded-xl'>
      <h2 className='my-5 text-2xl font-normal text-center text-white'>
        노래가 존재하지 않습니다.
      </h2>
    </ul>
  );
};

export default NoSongScreen;
