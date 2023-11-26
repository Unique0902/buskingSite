import React from 'react';
import { borderRadius, xyPadding } from '../../styles/theme';
import PrimaryBtn from '../Btn/PrimaryBtn';

const SongSearchBar = ({
  searchWord,
  setSearchWord,
  handleSearchBtnClick,
  children,
}) => {
  // useEffect(() => {
  //   if (searchWord.category) {
  //     onSearchBarChange();
  //   }
  // }, [searchWord]);
  const handleClickBtn = () => {
    if (searchWord.category) {
      handleSearchBtnClick();
    }
  };
  return (
    <form
      className='relative flex flex-row items-center justify-center gap-2 mb-6'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className='relative flex flex-row items-center justify-center gap-2 max-lg:flex-col'>
        <select
          className='p-2 font-sans text-lg border-2 border-black rounded-xl max-lg:w-full max-lg:mr-0 max-lg:mb-2 max-lg:text-base'
          value={searchWord.category}
          onChange={(e) => {
            setSearchWord({ ...searchWord, category: e.target.value });
          }}
        >
          <option value='제목'>제목</option>
          <option value='가수'>가수</option>
        </select>
        <input
          type='search'
          className='p-2 font-sans text-lg border-2 border-black rounded-xl w-80 max-lg:text-base max-lg:w-full'
          placeholder='검색어를 입력하세요..'
          value={searchWord.name}
          onChange={(e) => {
            setSearchWord({ ...searchWord, name: e.target.value });
          }}
        />
        <PrimaryBtn
          handleClick={handleClickBtn}
          btnPadding={xyPadding.base}
          radius={borderRadius.xm}
        >
          검색
        </PrimaryBtn>
      </div>
      {children}
    </form>
  );
};

export default SongSearchBar;
