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
  // TODO: add 페이지에서 사용할수있는 이거랑 비슷한 별도의 custom hook 만들기
  // TODO: 오류를 장담할수없으니, 이 로직과 관련해서 테스트코드 작성할수없는지 생각해보기
  // TODO: MusicBar 관련 처리
  // TODO: 자꾸 페이지넘바꿀때 생기는 오류 log 해결하기
  // TODO: SONG_NUM_PER_PAGE 로직
  // TODO: queryKey 관련해서 공부하고 굳이 searchWord, pageNum을 state로 사용해야하는지 생각해보기
  // TODO: buskingApply에서 사용하는 SearchBar 대안 찾기
  //  TODO: 이전에 존재했던 반응형 기능 다시 넣어보기

  const [searchedSongArr, setSearchedSongArr] = useState<T[]>([]);
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
    savedSearchWord,
  };
};
