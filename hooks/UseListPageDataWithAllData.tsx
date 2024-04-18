import { useEffect, useState } from 'react';
import { ApplianceData } from '../store/type/busking';
import { PlaylistSongData } from '../store/type/playlist';
import { NewSearchWord } from '../store/type/searchword';

export const UseListPageDataWithAllData = <
  T extends PlaylistSongData | ApplianceData
>(
  allDataArr: T[],
  songNumPerPage: number
) => {
  //TODO: 요거 다른페이지에도 적용하기
  //TODO: add 페이지에서 사용할수있는 이거랑 비슷한 별도의 custom hook 만들기
  //TODO: 오류를 장담할수없으니, 이 로직과 관련해서 테스트코드 작성할수없는지 생각해보기
  //searchSongArr를 사용안하는 ListPage는 그냥 기존 searchedArr 사용하던 부분을 allDataArr로 사용하면될듯
  const [searchedSongArr, setSearchedSongArr] = useState<T[]>([]);
  // 요건 add 관련 data처리에서 힘쓸거임
  const [savedSearchWord, setSavedSearchWord] = useState<NewSearchWord>({
    name: '',
    category: '',
  });
  const [viewedSongArr, setViewedSongArr] = useState<T[]>([]);

  useEffect(() => {
    searchedSongArr.length > songNumPerPage
      ? setViewedSongArr([...searchedSongArr].slice(0, songNumPerPage))
      : setViewedSongArr([...searchedSongArr]);
  }, [searchedSongArr]);

  useEffect(() => {
    setSearchedSongArr([...allDataArr]);
  }, [allDataArr]);

  const handleSearch = (searchWord: NewSearchWord) => {
    if (searchWord.name) {
      if (searchWord.category === '제목') {
        const filterdDataArr = allDataArr.filter((song) =>
          song.title.toLowerCase().includes(searchWord.name)
        );
        setSearchedSongArr([...filterdDataArr]);
      } else if (searchWord.category === '가수') {
        const filterdDataArr = allDataArr.filter((song) =>
          song.artist.toLowerCase().includes(searchWord.name)
        );
        setSearchedSongArr([...filterdDataArr]);
      } else {
        throw new Error('not exist song searchWord category!');
      }
    } else {
      setSearchedSongArr([...allDataArr]);
    }
    setSavedSearchWord({ ...searchWord });
  };

  const handleViewedSongArrByPageNum = (pageNum: number) =>
    setViewedSongArr(
      [...searchedSongArr].slice(
        (pageNum - 1) * songNumPerPage,
        pageNum * songNumPerPage
      )
    );

  return {
    viewedSongArr,
    handleViewedSongArrByPageNum,
    handleSearch,
    searchedSongArr,
    setSearchedSongArr,
  };
};
