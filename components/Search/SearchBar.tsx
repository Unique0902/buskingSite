import React, { createContext, ReactNode } from 'react';
import { SearchIcn } from '../../assets/icon/icon';
import { color, xyPadding } from '../../styles/theme';
import PrimaryBtn from '../Btn/PrimaryBtn';
import RenderedWhenFullScreen from '../Responsive/RenderedWhenFullScreen';

// const SearchBarContext = createContext(null);
interface Props {
  children: ReactNode;
}

const SearchBar = ({ children }: Props) => {
  return (
    <form
      className='relative flex flex-row items-center justify-center flex-1 gap-2 max-lg:flex-col max-lg:w-full'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className='relative flex flex-row items-center justify-center flex-1 gap-2 max-lg:w-full max-lg:mx-2'>
        {children}
      </div>
    </form>
  );
};

type SearchWord = {
  name: string;
  category: '제목' | '가수';
};
type SelectProps = {
  searchWord: SearchWord;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
};
const Select = ({ searchWord, handleSelectChange, children }: SelectProps) => {
  return (
    <select
      className='p-2 text-lg border-2 border-black rounded-xl max-lg:mr-0 max-lg:text-base dark:bg-slate-500 '
      value={searchWord.category}
      onChange={handleSelectChange}
    >
      {children}
    </select>
  );
};

const Option = ({ value }: { value: string }) => {
  return <option value={value}>{value}</option>;
};

type InputProps = {
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickBtn: () => void;
};

// input 스타일링은 responsive 일정 브라우저 너비까지는 px로 유지하다가 그 px보다 작은 너비에서 그에 맞게 너비가 브라우
//저 너비대비퍼센트로 줄어드는 로직으로 짜면 좋을듯 일정 너비 이하로 줄면 검색어 input이 사라지고 클릭시 input 보여주는 버
//튼만 남기는것도 좋은 로직인듯
const Input = ({
  inputValue,
  handleInputChange,
  handleClickBtn,
}: InputProps) => {
  return (
    <div className='relative flex flex-row items-center flex-1'>
      <input
        type='search'
        className='w-full p-2 text-lg border-2 border-black rounded-xl max-lg:text-base dark:bg-slate-500'
        placeholder='검색어를 입력하세요..'
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        className='absolute right-4 lg:hidden'
        onClick={handleClickBtn}
        type='submit'
      >
        <SearchIcn width={18} height={18} color={color.gray_600} />
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

SearchBar.Select = Select;
SearchBar.Option = Option;
SearchBar.Input = Input;
SearchBar.Button = Button;

export default SearchBar;
