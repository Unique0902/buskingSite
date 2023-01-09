import React from 'react';

const SongTableTitles = ({ isApply }) => {
  return (
    <li className='justify-between hidden lg:flex lg:flex-row text-center px-2 py-1'>
      <div className=' basis-1/12'>index</div>
      {isApply ? (
        <div className='basis-1/2 '>이름</div>
      ) : (
        <div className='basis-7/12 '>이름</div>
      )}
      <div className='basis-1/4 '>아티스트</div>
      {isApply && <div className='basis-1/12 '>신청자수</div>}
      <div className='basis-1/12'></div>
    </li>
  );
};

export default SongTableTitles;
