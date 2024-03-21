import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useModalContext } from './Modal/ModalIconBtn';
import NameResults from './NameResults';
import SearchBar from './Search/SearchBar';
import Icon from '../assets/icon/icon';
import UserDataRepository from '../service/userDataRepository';
import { nameSearchWordCategories } from '../store/data/CategoryTypes';
import { NameSearchWord } from '../store/type/searchword';
import { UserData } from '../store/type/userData';
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
    gcTime: Infinity,
    //TODO: 일단 캐싱 무한으로 해놓고 나중에 백엔드 교체하면 수정하기
  });
  const userDataArr: UserData[] = data
    ? Object.entries(data).map(([key, value]) => {
        return { id: key, ...value };
      })
    : [];

  const [searchedDataArr, setSearchedDataArr] = useState(userDataArr);

  useEffect(() => {
    setSearchedDataArr(userDataArr);
  }, [data]);

  const showedUserDataArr = searchedDataArr.slice(0, 5);

  const handleSearchName = () => {
    setSearchedDataArr(
      userDataArr.filter((val) =>
        val.name.toLowerCase().includes(searchWord.name)
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
              type='button'
            >
              <Icon size={24} color={color.warning} icon='Cancel' />
            </button>
          </SearchBar.SubSec>
        </SearchBar>
      </div>
      <NameResults userDataArr={showedUserDataArr} />
    </div>
  );
};

export default SearchModalContent;
