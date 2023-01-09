import React, { useEffect } from 'react';

const SongSearchBar = ({
  searchWord,
  setSearchWord,
  onSearchBarChange,
  children,
}) => {
  useEffect(() => {
    if (searchWord.category) {
      onSearchBarChange();
    }
  }, [searchWord]);

  return (
    <form className='relative flex flex-row justify-center items-center mb-6'>
      <div className='relative flex flex-row justify-center max-lg:flex-col items-center'>
        <select
          className=' border-black border-2 rounded-xl p-2 font-sans max-lg:w-full max-lg:mr-0 max-lg:mb-2 max-lg:text-base text-lg mr-4'
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
          className='border-black border-2 p-2 rounded-xl w-96 max-lg:text-base max-lg:w-full font-sans text-lg'
          placeholder='검색어를 입력하세요..'
          value={searchWord.name}
          onChange={(e) => {
            setSearchWord({ ...searchWord, name: e.target.value });
          }}
        />
      </div>
      {children}
    </form>
  );
};

export default SongSearchBar;
