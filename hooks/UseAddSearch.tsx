import useAddPagingBar from './UseAddPagingBar';
import useAddSearchBar from './UseAddSearchBar';

const useAddSearch = () => {
  //searchResults까지 그냥 넣어버림 ㅎㅎ

  const {
    searchWord,
    setSearchWord,
    searchResults,
    resultNum,
    searchBySearchBtn,
    searchByPageChange,
    isLoading,
  } = useAddSearchBar();

  const { nowPageNum, setNowPageNum, handlePlus, handleMinus } =
    useAddPagingBar(resultNum, searchByPageChange);

  //어차피 여기서 pageNum 초기화함
  const handleSearchBtnClick = () => {
    if (searchWord.category) {
      setNowPageNum(1);
      searchBySearchBtn();
    }
  };

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

  return {
    searchResults,
    searchWord,
    setSearchWord,
    isLoading,
    nowPageNum,
    resultNum,
    handlePlus,
    handleMinus,
    handleSearchBtnClick,
  };
};

export default useAddSearch;
