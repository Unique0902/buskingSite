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
