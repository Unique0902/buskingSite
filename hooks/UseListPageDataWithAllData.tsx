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
  // TODO: 오류를 장담할수없으니, 이 로직과 관련해서 테스트코드 작성할수없는지 생각해보기
  // TODO: MusicBar 관련 처리
  // TODO: 이전에 존재했던 반응형 기능 다시 넣어보기
  // TODO: 데이터 로딩 화면 넣기
  // TODO: SearchModalContent 리팩토링하기
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

  const searchSong = (allDataArr: T[], { name, category }: NewSearchWord) => {
    if (category === '제목')
      return allDataArr.filter((song) =>
        song.title.toLowerCase().includes(name)
      );
    else if (category === '가수')
      return allDataArr.filter((song) =>
        song.artist.toLowerCase().includes(name)
      );
    else throw new Error('not exist song searchWord category!');
  };

  const handleSearch = (searchWord: NewSearchWord) => {
    searchSong(allDataArr, searchWord);
    setSavedSearchWord({ ...searchWord });
  };

  const sliceSongArrByNumPerPage = (
    songArr: T[],
    numPerPage: number,
    pageNum: number
  ) => songArr.slice((pageNum - 1) * numPerPage, pageNum * numPerPage);

  const handleChangePage = (pageNum: number) =>
    setViewedSongArr(
      sliceSongArrByNumPerPage([...searchedSongArr], songNumPerPage, pageNum)
    );

  return {
    viewedSongArr,
    handleChangePage,
    handleSearch,
    searchedSongArr,
    setSearchedSongArr,
    savedSearchWord,
  };
};
