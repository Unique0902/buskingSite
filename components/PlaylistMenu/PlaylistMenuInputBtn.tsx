import React, { ReactNode, useState } from 'react';
import PlaylistMenuBtn from './PlaylistMenuBtn';
type Props = {
  playlistName: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickOkBtn: () => void;
  children: ReactNode;
};
const PlaylistMenuInputBtn = ({
  playlistName,
  handleInputChange,
  handleClickOkBtn,
  children,
}: Props) => {
  const [isShowInput, setIsShowInput] = useState(false);
  const handleClickShowBtn = () => {
    setIsShowInput(true);
  };
  const handleClickCancelBtn = () => {
    setIsShowInput(false);
  };
  const handleClickOkBtnByPlaylistName = () => {
    if (playlistName && playlistName.length <= 20) {
      handleClickOkBtn();
    }
  };
  if (!isShowInput) {
    return (
      <PlaylistMenuBtn handleClick={handleClickShowBtn}>
        {children}
      </PlaylistMenuBtn>
    );
  } else {
    return (
      <>
        <input
          type='text'
          placeholder='Playlist Name'
          autoFocus
          className='px-4 py-3 text-lg font-normal border-gray-800 border-solid border-1 rounded-xl'
          value={playlistName}
          onChange={handleInputChange}
        />
        <div className='flex flex-row'>
          <button
            className={`w-1/2 py-2 ${
              playlistName && playlistName.length <= 20
                ? 'text-black'
                : 'text-gray-300'
            } hover:bg-gray-200 text-lg font-medium`}
            onClick={handleClickOkBtnByPlaylistName}
          >
            추가
          </button>
          <button
            className='w-1/2 py-2 text-lg font-medium hover:bg-gray-200'
            onClick={handleClickCancelBtn}
          >
            취소
          </button>
        </div>
      </>
    );
  }
};

export default PlaylistMenuInputBtn;
