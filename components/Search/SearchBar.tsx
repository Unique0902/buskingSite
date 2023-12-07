import React, { createContext, ReactNode, useContext } from 'react';

import { v4 as uuidv4 } from 'uuid';

import Icon from '../../assets/icon/icon';
import { color, xyPadding } from '../../styles/theme';
import PrimaryBtn from '../Btn/PrimaryBtn';
import RenderedWhenFullScreen from '../Responsive/RenderedWhenFullScreen';

//TODO: SearchWord 타입 전역선언하기 할때 카테고리는 선택받을수있게 의존성 외부에서 주입받게 만들기
type SearchWord = {
  name: string;
  category: '제목' | '가수';
};
interface SearchBarProps {
  children: ReactNode;
  searchWord: SearchWord;
  setSearchWord: React.Dispatch<React.SetStateAction<SearchWord>>;
}
type SearchBarContextProps = {
  searchWord: SearchWord;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SearchBarContext = createContext<SearchBarContextProps>(
  {} as SearchBarContextProps
);

const SearchBar = ({ children, searchWord, setSearchWord }: SearchBarProps) => {
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
    <SearchBarContext.Provider
      value={{ searchWord, handleInputChange, handleSelectChange }}
    >
      <form
        className='relative flex flex-row items-center justify-center flex-1 gap-2 mb-6 max-lg:flex-col max-lg:w-full'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {children}
      </form>
    </SearchBarContext.Provider>
  );
};

type MainSecProps = {
  children: ReactNode;
};

const MainSec = ({ children }: MainSecProps) => {
  return (
    <div className='relative flex flex-row items-center justify-center flex-1 gap-2 max-lg:w-full max-lg:mx-2'>
      {children}
    </div>
  );
};

type SubSecProps = {
  children: ReactNode;
};
const SubSec = ({ children }: SubSecProps) => {
  return <>{children}</>;
};

type SelectProps = {
  optionValueArr: string[];
};
const Select = ({ optionValueArr }: SelectProps) => {
  const { searchWord, handleSelectChange } = useContext(SearchBarContext);
  return (
    <select
      className='p-2 text-lg border-2 border-black rounded-xl max-lg:mr-0 max-lg:text-base dark:bg-slate-500 '
      value={searchWord.category}
      onChange={handleSelectChange}
    >
      {optionValueArr.map((val) => (
        <option key={uuidv4()} value={val}>
          {val}
        </option>
      ))}
    </select>
  );
};

const Option = ({ value }: { value: string }) => {
  return <option value={value}>{value}</option>;
};

type InputWithButtonProps = {
  handleClickBtn: () => void;
};

// input 스타일링은 responsive 일정 브라우저 너비까지는 px로 유지하다가 그 px보다 작은 너비에서 그에 맞게 너비가 브라우
//저 너비대비퍼센트로 줄어드는 로직으로 짜면 좋을듯 일정 너비 이하로 줄면 검색어 input이 사라지고 클릭시 input 보여주는 버
//튼만 남기는것도 좋은 로직인듯
const InputWithButton = ({ handleClickBtn }: InputWithButtonProps) => {
  const { searchWord, handleInputChange } = useContext(SearchBarContext);
  return (
    <div className='relative flex flex-row items-center flex-1'>
      <input
        type='search'
        className='w-full p-2 text-lg border-2 border-black rounded-xl max-lg:text-base dark:bg-slate-500'
        placeholder='검색어를 입력하세요..'
        value={searchWord.name}
        onChange={handleInputChange}
      />
      <button
        className='absolute right-4 lg:hidden'
        onClick={handleClickBtn}
        type='submit'
      >
        <Icon size={18} color={color.gray_600} icon='Search' />
      </button>
    </div>
  );
};

type ButtonProps = {
  handleClickBtn: () => void;
  text: string;
};

const Button = ({ handleClickBtn, text }: ButtonProps) => {
  return (
    <RenderedWhenFullScreen>
      <PrimaryBtn
        handleClick={handleClickBtn}
        btnPadding={xyPadding.base}
        isSubmit={true}
      >
        {text}
      </PrimaryBtn>
    </RenderedWhenFullScreen>
  );
};
SearchBar.MainSec = MainSec;
SearchBar.SubSec = SubSec;

MainSec.Select = Select;
MainSec.Option = Option;
MainSec.InputWithButton = InputWithButton;
MainSec.Button = Button;
export default SearchBar;
