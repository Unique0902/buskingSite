import { SearchWord } from '../store/type/searchword';
import useAddPagingBar from './UseAddPagingBar';
import useAddSearchBar from './UseAddSearchBar';

const useAddSearch = () => {
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
    useAddPagingBar(resultNum, searchByPageChange, searchWord);

  const handleSearchBtnClick = (searchWord: SearchWord) => {
    if (searchWord.category) {
      setNowPageNum(1);
      searchBySearchBtn(searchWord);
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
