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

const ArrangeMenu = ({
  setIsShowArrangeMenu,
  results,
  setResults,
  isBusking,
}: Props) => {
  const arrangeResults = (
    compareFunc: (
      a: PlaylistSongData | ApplianceData,
      b: PlaylistSongData | ApplianceData
    ) => number
  ) => {
    const copiedResults = [...results];
    copiedResults.sort(compareFunc);
    setResults(copiedResults);
  };
  const compareByTextWhenSort = (
    a: string,
    b: string,
    isAscending: boolean
  ) => {
    if (a.toLowerCase() > b.toLowerCase()) return isAscending ? 1 : -1;
    else if (a.toLowerCase() < b.toLowerCase()) return isAscending ? -1 : 1;
    else return 0;
  };
  const compareByNumberWhenSort = (
    a: number,
    b: number,
    isAscending: boolean
  ) => (isAscending ? a - b : b - a);
  return (
    <PopupWrapper
      handleClickOther={() => setIsShowArrangeMenu(false)}
      isLeft={false}
    >
      <section className='flex flex-col pt-2 pb-2 border-b border-gray-600 border-solid '>
        <ArrangeBtn
          handleClick={() => {
            arrangeResults((a, b) =>
              compareByTextWhenSort(a.title, b.title, true)
            );
            setIsShowArrangeMenu(false);
          }}
        >
          제목 문자순 정렬
        </ArrangeBtn>
        <ArrangeBtn
          handleClick={() => {
            arrangeResults((a, b) =>
              compareByTextWhenSort(a.artist, b.artist, true)
            );
            setIsShowArrangeMenu(false);
          }}
        >
          가수 문자순 정렬
        </ArrangeBtn>
        <ArrangeBtn
          handleClick={() => {
            arrangeResults((a, b) =>
              compareByNumberWhenSort(parseInt(a.id), parseInt(b.id), true)
            );
            setIsShowArrangeMenu(false);
          }}
        >
          시간순 정렬
        </ArrangeBtn>
        {isBusking && (
          <ArrangeBtn
            handleClick={() => {
              arrangeResults((a: ApplianceData, b: ApplianceData) =>
                compareByNumberWhenSort(a.cnt, b.cnt, false)
              );
              setIsShowArrangeMenu(false);
            }}
          >
            신청자순 정렬
          </ArrangeBtn>
        )}
      </section>
    </PopupWrapper>
  );
};

export default ArrangeMenu;
