import React from 'react';
import ArrangeBtn from './ArrangeBtn';
import PopupWrapper from '../PopupWrapper';

const ArrangeMenu = ({
  setIsShowArrangeMenu,
  results,
  setResults,
  isBusking,
}) => {
  const arrangeTypes = {
    title: 'title',
    artist: 'artist',
    time: 'time',
    cnt: 'cnt',
  };
  const arrangeResults = (type) => {
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
          return a.id - b.id;
        });
        break;
      case 'cnt':
        copiedResults.sort((a, b) => {
          return b.cnt - a.cnt;
        });
        break;
    }
    setResults(copiedResults);
  };
  const handleClickArrangeBtn = (type) => {
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
        <ArrangeBtn
          handleClick={handleClickArrangeBtn}
          type={arrangeTypes.title}
        >
          제목 문자순 정렬
        </ArrangeBtn>
        <ArrangeBtn
          handleClick={handleClickArrangeBtn}
          type={arrangeTypes.artist}
        >
          가수 문자순 정렬
        </ArrangeBtn>
        <ArrangeBtn
          handleClick={handleClickArrangeBtn}
          type={arrangeTypes.time}
        >
          시간순 정렬
        </ArrangeBtn>
        {isBusking && (
          <ArrangeBtn
            handleClick={handleClickArrangeBtn}
            type={arrangeTypes.cnt}
          >
            신청자순 정렬
          </ArrangeBtn>
        )}
      </section>
    </PopupWrapper>
  );
};

export default ArrangeMenu;
