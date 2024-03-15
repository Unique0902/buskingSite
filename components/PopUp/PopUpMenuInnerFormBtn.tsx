import React, { ReactNode, useState } from 'react';
import PopUpMenuInnerBtn from './PopUpMenuInnerBtn';
import PopUpMenuInnerForm from './PopUpMenuInnerForm';

type Props = {
  inputValue: string;
  handleSubmit: (inputText: string) => void;
  children: ReactNode;
};
const PopUpMenuInnerFormBtn = ({
  inputValue,
  handleSubmit,
  children,
}: Props) => {
  const [isShowInput, setIsShowInput] = useState(false);

  if (!isShowInput) {
    return (
      <PopUpMenuInnerBtn handleClick={() => setIsShowInput(true)}>
        {children}
      </PopUpMenuInnerBtn>
    );
  }

  return (
    <PopUpMenuInnerForm
      handleCancel={() => setIsShowInput(false)}
      handleSubmit={(inputText) => {
        handleSubmit(inputText);
        setIsShowInput(false);
      }}
      inputValue={inputValue}
    />
  );
};

export default PopUpMenuInnerFormBtn;
