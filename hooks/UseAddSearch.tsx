import { useState } from 'react';
import useAddPagingBar from './UseAddPagingBar';
import useAddSearchBar from './UseAddSearchBar';

const useAddSearch = () => {
  //searchResults까지 그냥 넣어버림 ㅎㅎ
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    searchWord,
    setSearchWord,
    searchResults,
    resultNum,
    searchBySearchBtn,
    searchByPageChange,
  } = useAddSearchBar(isLoading, setIsLoading);

  const { nowPageNum, setNowPageNum, handlePlus, handleMinus } =
    useAddPagingBar(resultNum, searchByPageChange);

  //어차피 여기서 pageNum 초기화함
  const handleSearchBtnClick = () => {
    if (searchWord.category) {
      setNowPageNum(1);
      searchBySearchBtn();
    }
  };

  //TODO: react 작동원리 이해하여 이거와 내부에서 컴포넌트 선언하는거의 차이 알기
  // 컴포넌트를 생성한거를 불러오는거와 그냥 return 함수 가져오는것의 차이?

  // const renderSearchBar = () => {
  //   return (
  //     <SearchBar searchWord={searchWord} setSearchWord={setSearchWord}>
  //       <SearchBar.MainSec>
  //         <SearchBar.MainSec.Select optionValueArr={['제목', '가수']} />

  //         <SearchBar.MainSec.InputWithButton
  //           handleClickBtn={handleSearchBtnClick}
  //         />
  //         <SearchBar.MainSec.Button
  //           handleClickBtn={handleSearchBtnClick}
  //           text='검색'
  //         />
  //       </SearchBar.MainSec>
  //       <SearchBar.SubSec
  //         render={() => (
  //           <RenderedWhenFullScreen>
  //             <HoverIcon
  //               text={
  //                 'Api 특성상 제목, 가수명을 영어로 입력하시면 더 잘나옵니다.'
  //               }
  //               icon='Inform'
  //             />
  //           </RenderedWhenFullScreen>
  //         )}
  //       ></SearchBar.SubSec>
  //     </SearchBar>
  //   );
  // };

  return [
    {
      searchResults,
      searchWord,
      setSearchWord,
      isLoading,
      nowPageNum,
      resultNum,
      handlePlus,
      handleMinus,
      handleSearchBtnClick,
    },
  ] as const;
};

export default useAddSearch;
