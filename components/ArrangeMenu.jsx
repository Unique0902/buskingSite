import React from 'react';
import ArrangeBtn from './ArrangeBtn';
import PopupWrapper from './PopupWrapper';

const ArrangeMenu = ({
  setIsShowArrangeMenu,
  results,
  setResults,
  isBusking,
}) => {
  const arrangeResults = (type) => {
    switch (type) {
      case 'title':
        results.sort(function (a, b) {
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          else if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          else return 0;
        });
        break;
      case 'artist':
        results.sort(function (a, b) {
          if (a.artist.toLowerCase() > b.artist.toLowerCase()) return 1;
          else if (a.artist.toLowerCase() < b.artist.toLowerCase()) return -1;
          else return 0;
        });
        break;
      case 'time':
        results.sort(function (a, b) {
          return a.id - b.id;
        });
        break;
      case 'cnt':
        results.sort(function (a, b) {
          return b.cnt - a.cnt;
        });
        break;
    }
    setResults([...results]);
  };
  const handleClick = (type) => {
    arrangeResults(type);
    setIsShowArrangeMenu(false);
  };
  return (
    <PopupWrapper
      handleClickOther={() => {
        setIsShowArrangeMenu(false);
      }}
      isLeft={false}
    >
      <section className=' border-b border-gray-600 border-solid flex flex-col pt-2 pb-2'>
        <ArrangeBtn
          onClick={handleClick}
          type={'title'}
          text={'제목 문자순 정렬'}
        />
        <ArrangeBtn
          onClick={handleClick}
          type={'artist'}
          text={'가수 문자순 정렬'}
        />
        <ArrangeBtn onClick={handleClick} type={'time'} text={'시간순 정렬'} />
        {isBusking && (
          <ArrangeBtn
            onClick={handleClick}
            type={'cnt'}
            text={'신청자순 정렬'}
          />
        )}
      </section>
    </PopupWrapper>
  );
};

export default ArrangeMenu;
