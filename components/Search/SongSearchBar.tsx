import React, { ReactNode } from 'react';
import { SearchIcn } from '../../assets/icon/icon';
import { borderRadius, color, xyPadding } from '../../styles/theme';
import PrimaryBtn from '../Btn/PrimaryBtn';
import RenderedWhenFullScreen from '../Responsive/RenderedWhenFullScreen';
type SearchWord = {
  name: string;
  category: '제목' | '가수';
};

type Props = {
  searchWord: SearchWord;
  setSearchWord: React.Dispatch<React.SetStateAction<SearchWord>>;
  onSearch: () => void;
  children: ReactNode;
};

const SongSearchBar = ({
  searchWord,
  setSearchWord,
  onSearch,
  children,
}: Props) => {
  // useEffect(() => {
  //   if (searchWord.category) {
  //     onSearchBarChange();
  //   }
  // }, [searchWord]);
  const handleClickBtn = () => {
    if (searchWord.category) {
      onSearch();
    }
  };
  return (
    <form
      className='relative flex flex-row items-center justify-center gap-2 mb-6 max-lg:flex-col'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className='relative flex flex-row items-center justify-center flex-1 gap-2 max-lg:w-full max-lg:mx-2'>
        <select
          className='p-2 text-lg border-2 border-black rounded-xl max-lg:mr-0 max-lg:text-base dark:bg-slate-500 '
          value={searchWord.category}
          onChange={(e) => {
            setSearchWord({
              ...searchWord,
              category: e.target.value as '제목' | '가수',
            });
          }}
        >
          <option value='제목'>제목</option>
          <option value='가수'>가수</option>
        </select>
        <div className='relative flex flex-row items-center flex-1'>
          <input
            type='search'
            className='w-full p-2 text-lg border-2 border-black rounded-xl max-lg:text-base dark:bg-slate-500'
            placeholder='검색어를 입력하세요..'
            value={searchWord.name}
            onChange={(e) => {
              setSearchWord({ ...searchWord, name: e.target.value });
            }}
          />
          <button
            className='absolute right-4 lg:hidden'
            onClick={handleClickBtn}
            type='submit'
          >
            <SearchIcn width={18} height={18} color={color.gray_600} />
          </button>
        </div>

        <RenderedWhenFullScreen>
          <PrimaryBtn
            handleClick={handleClickBtn}
            btnPadding={xyPadding.base}
            radius={borderRadius.xm}
            isSubmit={true}
          >
            검색
          </PrimaryBtn>
        </RenderedWhenFullScreen>
      </div>
      {children}
    </form>
  );
};

export default SongSearchBar;