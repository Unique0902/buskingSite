import React, { createContext, ReactNode, useContext, useState } from 'react';

import Modal from './Modal';
import { iconName } from '../../assets/icon/constants';
import Icon from '../../assets/icon/icon';
import { useDarkMode } from '../../hooks/UseDarkMode';
import { color } from '../../styles/theme';

type Props = {
  icon: iconName;
  children: ReactNode;
};

type ContextProps = {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContext = createContext<ContextProps>({} as ContextProps);

const ModalIconBtn = ({ icon, children }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { isDarkMode } = useDarkMode();

  return (
    <ModalContext.Provider value={{ isOpenModal, setIsOpenModal }}>
      <button
        onClick={() => {
          setIsOpenModal(true);
        }}
        className='p-2 bg-white border border-black rounded-full dark:bg-slate-800 hover:opacity-70 dark:border-white'
      >
        <Icon
          size={25}
          icon={icon}
          color={isDarkMode ? color.gray_200 : color.gray_900}
        />
      </button>
      {children}
    </ModalContext.Provider>
  );
};

const Inner = ({ children }: { children: ReactNode }) => {
  const { isOpenModal, setIsOpenModal } = useContext(ModalContext);
  if (isOpenModal)
    return (
      <Modal handleClickOther={() => setIsOpenModal(false)}>{children}</Modal>
    );
  return <></>;
};

ModalIconBtn.Inner = Inner;

export default ModalIconBtn;

export function useModalContext() {
  return useContext(ModalContext);
}
