import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useModalContext } from './Modal/ModalIconBtn';
import NameResults from './NameResults';
import SearchBar from './Search/SearchBar';
import Icon from '../assets/icon/icon';
import UserDataRepository from '../service/userDataRepository';
import { nameSearchWordCategories } from '../store/data/CategoryTypes';
import { NameSearchWord } from '../store/type/searchword';
import { UserDataEntries, UserDataObj } from '../store/type/userData';
import { color } from '../styles/theme';
const userDataRepository = new UserDataRepository();
const SearchModalContent: React.FC = () => {
  const [searchWord, setSearchWord] = useState<NameSearchWord>({
    name: '',
    category: '이름',
  });
  const { data } = useQuery({
    queryKey: ['userDatas'],
    queryFn: () => userDataRepository.getAllUserDatas(),
    staleTime: Infinity,
  });
  const userDataEntries: UserDataEntries<UserDataObj> = data
    ? Object.entries(data)
    : [];

  const [searchedEntries, setSearchedEntries] =
    useState<UserDataEntries<UserDataObj>>(userDataEntries);

  useEffect(() => {
    setSearchedEntries(userDataEntries);
  }, [data]);

  const showedEntries = searchedEntries.slice(0, 5);

  const handleSearchName = () => {
    setSearchedEntries(
      userDataEntries.filter((val) =>
        val[1].name.toLowerCase().includes(searchWord.name)
      )
    );
  };

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
            <SearchBar.MainSec.InputWithButton
              handleClickBtn={() => handleSearchName()}
            />
          </SearchBar.MainSec>
          <SearchBar.SubSec>
            <button
              onClick={() => {
                setIsOpenModal(false);
              }}
              className='hover:opacity-70'
            >
              <Icon size={24} color={color.warning} icon='Cancel' />
            </button>
          </SearchBar.SubSec>
        </SearchBar>
      </div>
      <NameResults userDataEntries={showedEntries} />
    </div>
  );
};

export default SearchModalContent;
