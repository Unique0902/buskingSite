import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { lastFmClient } from '../service/lastfm';
import {
  FmEditedTopTrackData,
  FmTopTrackData,
  FmTopTracksSearchData,
  FmTrackData,
  FmTrackSearchData,
} from '../store/type/fm';
type SearchWord = {
  name: string;
  category: '제목' | '가수';
};

type QueryFunctionType = {
  func: () => Promise<FmTopTracksSearchData | FmTrackSearchData>;
};

const useAddSearchBar = () => {
  const fmService = lastFmClient;
  const [queryFunctionObj, setQueryFunctionObj] = useState<QueryFunctionType>({
    func: () => fmService.getTopTracks(1),
  });
  //사실 콜백한번더 감싸줘서 state에 함수 저장해도 되지만 그냥 객체에다 저장하면 좀더 가독성이 좋긴한듯
  // 콜백으로 하려면 setState할때마다 ()=>()=>callback() 이거 해주는데 ^^ 화살쏘는 큐피트도 아니고 이건좀 아닌듯 ^^
  //이런식으로 작성한 이유는 블로그에도 쓸건데 setState를 저장할때 callback으로 진행할수있다는 사실때문에
  //state로 콜백함수를 저장할때 코드의 가독성이 떨어져서 그냥 따로 새로운 객체만들어서 전달하는게 더 나을것같다고 생각함!
  //그래서 이런식으로 코드 작성한것

  // react query 사용하면서 얻은것중 하나는 캐싱기능(strict mode에서도 fetch 한번만됨 개꿀 ^^) + 페이지 focus시 리패치
  // 부가기능중에 추가할것들은 추가할예정

  const [queryKey, setQueryKey] = useState<string[]>(['getTopTracks', '1']);

  const { data, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: () => queryFunctionObj.func(),
    staleTime: 1000 * 20,
  });

  let searchResults: FmTrackData[] | FmEditedTopTrackData[] = data
    ? (data as FmTrackSearchData).trackmatches
      ? (data as FmTrackSearchData).trackmatches.track
      : (data as FmTopTracksSearchData).track.map(
          (trackData: FmTopTrackData): FmEditedTopTrackData => {
            return { ...trackData, artist: trackData.artist.name };
          }
        )
    : [];

  if (searchResults.length > 6) {
    searchResults = searchResults.slice(-6);
  }
  const resultNum: number = data
    ? parseInt((data as FmTrackSearchData)['opensearch:totalResults']) ||
      parseInt((data as FmTopTracksSearchData)['@attr'].total)
    : 0;
  const [searchWord, setSearchWord] = useState<SearchWord>({
    name: '',
    category: '제목',
  });
  const [isTopTrackTime, setIsTopTrackTime] = useState<boolean>(true);
  const [savedSearchWord, setSavedSearchWord] = useState<SearchWord | null>(
    null
  );

  const searchBySearchBtn = async () => {
    setIsTopTrackTime(false);
    if (searchWord.name) {
      if (searchWord.category === '제목') {
        setQueryFunctionObj({
          func: () => fmService.searchSongByName(searchWord.name, 1),
        });
        setQueryKey(['searchSongByName', searchWord.name, '1']);
      } else if (searchWord.category === '가수') {
        setQueryFunctionObj({
          func: () => fmService.searchSongByArtist(searchWord.name, 1),
        });
        setQueryKey(['searchSongByArtist', searchWord.name, '1']);
      }
      setSavedSearchWord({ ...searchWord });
    }
  };

  const searchByPageChange = async (pageNum: number) => {
    if (isTopTrackTime) {
      searchTopTrack(pageNum);
      return;
    }
    if (savedSearchWord) {
      if (savedSearchWord.category === '제목') {
        setQueryFunctionObj({
          func: () => fmService.searchSongByName(savedSearchWord.name, pageNum),
        });
        setQueryKey([
          'searchSongByName',
          savedSearchWord.name,
          pageNum.toString(),
        ]);
      } else if (savedSearchWord.category === '가수') {
        setQueryFunctionObj({
          func: () =>
            fmService.searchSongByArtist(savedSearchWord.name, pageNum),
        });
        setQueryKey([
          'searchSongByArtist',
          savedSearchWord.name,
          pageNum.toString(),
        ]);
      }
    }
  };

  const searchTopTrack = async (pageNum: number) => {
    setQueryFunctionObj({ func: () => fmService.getTopTracks(pageNum) });
    setQueryKey(['getTopTracks', pageNum.toString()]);
  };

  // 얘는 지혼자 데이터 변할일 없어서 필요없음
  // useEffect(() => {
  //   setNowPageNum(1);
  // }, [searchResults]);

  return {
    searchWord,
    setSearchWord,
    searchResults,
    resultNum,
    searchBySearchBtn,
    searchByPageChange,
    isLoading,
  };
};

export default useAddSearchBar;
