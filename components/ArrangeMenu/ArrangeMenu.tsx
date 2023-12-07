import React from 'react';

import ArrangeBtn from './ArrangeBtn';
import { ApplianceData } from '../../store/type/busking';
import { PlaylistSongData } from '../../store/type/playlist';
import PopupWrapper from '../PopUp/PopupWrapper';
//TODO: 나중에 정렬한 결과가 서버에 반영될수있게 그리고 정렬한 결과가 musicbar에서 잘되는지 근데 그건 서버에서 처리해야될듯
//TODO: 드래그해서 노래 순서 바꿀수있게 하기 아니면 위아래 버튼클릭
type Props = {
  setIsShowArrangeMenu: React.Dispatch<React.SetStateAction<boolean>>;
  results: PlaylistSongData[] | ApplianceData[];
  setResults: React.Dispatch<
    React.SetStateAction<PlaylistSongData[] | ApplianceData[]>
  >;
  isBusking: boolean;
};
type ArrangeSongTypes = 'title' | 'artist' | 'time' | 'cnt';
const ArrangeMenu = ({
  setIsShowArrangeMenu,
  results,
  setResults,
  isBusking,
}: Props) => {
  const arrangeResults = (type: ArrangeSongTypes) => {
    const copiedResults = [...results];
    switch (type) {
      case 'title':
        copiedResults.sort((a, b) => {
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          else if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          else return 0;
        });
        break;
      case 'artist':
        copiedResults.sort((a, b) => {
          if (a.artist.toLowerCase() > b.artist.toLowerCase()) return 1;
          else if (a.artist.toLowerCase() < b.artist.toLowerCase()) return -1;
          else return 0;
        });
        break;
      case 'time':
        copiedResults.sort((a, b) => {
          return parseInt(a.id) - parseInt(b.id);
        });
        break;
      case 'cnt':
        (copiedResults as ApplianceData[]).sort((a, b) => {
          return b.cnt - a.cnt;
        });
        break;
    }
    setResults(copiedResults);
  };
  const handleClickArrangeBtn = (type: ArrangeSongTypes) => {
    arrangeResults(type);
    setIsShowArrangeMenu(false);
  };
  const handleClickOtherInPopupWrapper = () => {
    setIsShowArrangeMenu(false);
  };
  return (
    <PopupWrapper
      handleClickOther={handleClickOtherInPopupWrapper}
      isLeft={false}
    >
      <section className='flex flex-col pt-2 pb-2 border-b border-gray-600 border-solid '>
        <ArrangeBtn handleClick={handleClickArrangeBtn} type={'title'}>
          제목 문자순 정렬
        </ArrangeBtn>
        <ArrangeBtn handleClick={handleClickArrangeBtn} type={'artist'}>
          가수 문자순 정렬
        </ArrangeBtn>
        <ArrangeBtn handleClick={handleClickArrangeBtn} type={'time'}>
          시간순 정렬
        </ArrangeBtn>
        {isBusking && (
          <ArrangeBtn handleClick={handleClickArrangeBtn} type={'cnt'}>
            신청자순 정렬
          </ArrangeBtn>
        )}
      </section>
    </PopupWrapper>
  );
};

export default ArrangeMenu;
