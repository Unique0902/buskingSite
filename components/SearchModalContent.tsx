import React, { useState } from 'react';

import { useModalContext } from './Modal/ModalIconBtn';
import NameResult from './NameResult';
import NameResults from './NameResults';
import SearchBar from './Search/SearchBar';
import Icon from '../assets/icon/icon';
import { nameSearchWordCategories } from '../store/data/CategoryTypes';
import { NameSearchWord } from '../store/type/searchword';
import { color } from '../styles/theme';

const SearchModalContent: React.FC = () => {
  const [searchWord, setSearchWord] = useState<NameSearchWord>({
    name: '',
    category: '이름',
  });
  const { setIsOpenModal } = useModalContext();
  return (
    <div>
      <div className='px-4 pt-4'>
        <SearchBar
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          isLgRow={true}
        >
          <SearchBar.MainSec>
            <SearchBar.MainSec.Select
              optionValueArr={nameSearchWordCategories}
            />
            <SearchBar.MainSec.InputWithButton handleClickBtn={() => {}} />
          </SearchBar.MainSec>
          <SearchBar.SubSec>
            <button
              onClick={() => {
                setIsOpenModal(false);
              }}
              className='hover:opacity-70'
            >
              <Icon size={25} color={color.warning} icon='Home' />
            </button>
          </SearchBar.SubSec>
        </SearchBar>
      </div>
      <NameResults
        results={[
          { name: '홍길동', date: 'ss' },
          { name: '홍길동2', date: 'ss2' },
        ]}
      />
    </div>
  );
};

export default SearchModalContent;
