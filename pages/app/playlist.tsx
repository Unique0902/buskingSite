import React, { useState } from 'react';
import { useEffect } from 'react';
import TitleBar from '../../components/TitleBar';
import MainSec from '../../components/MainSec';
import ArrangeMenuBtn from '../../components/ArrangeMenu/ArrangeMenuBtn';
import { usePlaylistContext } from '../../context/PlaylistContext';
import { getAppLayOut } from '../../layouts/appLayout';
import PrimarySongTable from '../../components/Table/PrimarySongTable';
import { MinusIcn } from '../../assets/icon/icon';
import NoPlaylistCheckWrapper from '../../components/NoPlaylistCheckWrapper';
import useSearchBar from '../../hooks/UseSearchBar';
import { PlaylistSongData } from '../../store/type/playlist';
import SearchBar from '../../components/Search/SearchBar';

export default function AppPlaylist() {
  const [songArr, setSongArr] = useState<PlaylistSongData[]>([]);
  const { nowPlaylist, removeSongInPlaylist } = usePlaylistContext();
  useEffect(() => {
    if (nowPlaylist) {
      nowPlaylist.songs
        ? setSongArr(Object.values(nowPlaylist.songs))
        : setSongArr([]);
    } else {
      setSongArr([]);
    }
  }, [nowPlaylist]);

  const [searchWord, setSearchWord, search] = useSearchBar(
    (nowPlaylist && nowPlaylist.songs) || null,
    setSongArr
  );

  const handleClickResult = (sid: string) => {
    removeSongInPlaylist(sid);
  };

  // TODO:이름 좀더 명확하게 변경 필요2
  const handleClickBtn = () => {
    if (searchWord.category) {
      search();
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord({ ...searchWord, name: e.target.value });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchWord({
      ...searchWord,
      category: e.target.value as '제목' | '가수',
    });
  };

  return (
    <>
      <TitleBar text={'플레이리스트 관리'} />
      <NoPlaylistCheckWrapper isExistWrapper={!!nowPlaylist}>
        <MainSec>
          {/* <SongSearchBar
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            onSearch={search}
          >
            <ArrangeMenuBtn
              results={songArr}
              setResults={setSongArr}
              isBusking={false}
            />
          </SongSearchBar> */}

          <div className='relative flex flex-row items-center gap-4 mb-6 max-lg:flex-col'>
            <SearchBar>
              <SearchBar.MainSec>
                <SearchBar.MainSec.Select
                  searchWord={searchWord}
                  handleSelectChange={handleSelectChange}
                >
                  <SearchBar.MainSec.Option value='제목' />
                  <SearchBar.MainSec.Option value='가수' />
                </SearchBar.MainSec.Select>
                <SearchBar.MainSec.Input
                  inputValue={searchWord.name}
                  handleClickBtn={handleClickBtn}
                  handleInputChange={handleInputChange}
                />
                <SearchBar.MainSec.Button
                  handleClickBtn={handleClickBtn}
                  text='검색'
                />
              </SearchBar.MainSec>
              <SearchBar.SubSec
                render={() => (
                  <ArrangeMenuBtn
                    results={songArr}
                    setResults={setSongArr}
                    isBusking={false}
                  />
                )}
              ></SearchBar.SubSec>
            </SearchBar>
            {/* <ArrangeMenuBtn
              results={songArr}
              setResults={setSongArr}
              isBusking={false}
            /> */}
          </div>

          <h2 className='mb-2 text-xl font-semibold '>
            총 노래 수 {songArr && songArr.length}
          </h2>

          <PrimarySongTable
            results={songArr}
            handleClickResult={handleClickResult}
          >
            <MinusIcn width={24} height={24} color={'red'} />
          </PrimarySongTable>
        </MainSec>
      </NoPlaylistCheckWrapper>
    </>
  );
}
getAppLayOut(AppPlaylist);
