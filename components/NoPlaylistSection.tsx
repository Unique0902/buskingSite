import React from 'react';

import PrimaryBtn from './Btn/PrimaryBtn';
import MainSec from './MainSec';
import { usePlaylistContext } from '../context/PlaylistContext';

const NoPlaylistSection = () => {
  const { addBasicPlaylist } = usePlaylistContext();
  const handleClickAddBasicPlaylist = () => {
    addBasicPlaylist();
  };
  return (
    <MainSec isAlignCenter={true}>
      <h3 className='text-xl font-semibold'>
        플레이리스트가 존재하지 않습니다. 플레이 리스트를 추가해주세요.
      </h3>
      <PrimaryBtn handleClick={handleClickAddBasicPlaylist}>
        추가하기
      </PrimaryBtn>
    </MainSec>
  );
};

export default NoPlaylistSection;
