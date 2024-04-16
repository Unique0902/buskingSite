import React, { createContext, ReactNode, useContext, useState } from 'react';
import { NewSearchWord } from '../../store/type/searchword';
import { xyPadding } from '../../styles/theme';
import PrimaryBtn from '../Btn/PrimaryBtn';

interface SearchBarProps {
  children: ReactNode;
  categories: string[];
}
type SearchBarContextProps = {
  searchWord: NewSearchWord;
  categories: string[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SearchBarContext = createContext<SearchBarContextProps>(
  {} as SearchBarContextProps
);

const NewSearchBar = ({ children, categories }: SearchBarProps) => {
  const [searchWord, setSearchWord] = useState<NewSearchWord>({
    name: '',
    category: categories[0],
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord({ ...searchWord, name: e.target.value });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchWord({
      ...searchWord,
      category: e.target.value,
    });
  };

  return (
    <SearchBarContext.Provider
      value={{ searchWord, categories, handleInputChange, handleSelectChange }}
    >
      <form
        className={`relative flex flex-row items-center justify-center flex-1 gap-2 mb-6 max-lg:w-full`}
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

const Select = () => {
  const { searchWord, categories, handleSelectChange } =
    useContext(SearchBarContext);
  return (
    <select
      className='p-2 text-lg border-2 border-black rounded-xl max-lg:mr-0 max-lg:text-base dark:bg-slate-500 '
      value={searchWord.category}
      onChange={handleSelectChange}
    >
      {categories.map((val) => (
        <option key={'selectOption' + val} value={val}>
          {val}
        </option>
      ))}
    </select>
  );
};

const Option = ({ value }: { value: string }) => {
  return <option value={value}>{value}</option>;
};

type InputProps = {
  placeholder?: string;
};

const Input = ({ placeholder = '검색어를 입력하세요..' }: InputProps) => {
  const { searchWord, handleInputChange } = useContext(SearchBarContext);
  return (
    <div className='relative flex flex-row items-center flex-1'>
      <input
        type='search'
        className='w-full p-2 text-lg border-2 border-black rounded-xl max-lg:text-base dark:bg-slate-500'
        placeholder={placeholder}
        value={searchWord.name}
        onChange={handleInputChange}
      />
    </div>
  );
};

type ButtonProps = {
  handleClickBtn: (searchWord: NewSearchWord) => void;
  text: string;
};

const Button = ({ handleClickBtn, text }: ButtonProps) => {
  const { searchWord } = useContext(SearchBarContext);
  return (
    <PrimaryBtn
      handleClick={() => handleClickBtn(searchWord)}
      btnPadding={xyPadding.base}
      isSubmit={true}
    >
      {text}
    </PrimaryBtn>
  );
};

NewSearchBar.MainSec = MainSec;
NewSearchBar.SubSec = SubSec;

MainSec.Select = Select;
MainSec.Option = Option;
MainSec.Input = Input;
MainSec.Button = Button;

export default NewSearchBar;
