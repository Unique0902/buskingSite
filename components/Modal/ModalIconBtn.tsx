import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import Modal from './Modal';
import { iconName } from '../../assets/icon/constants';
import Icon from '../../assets/icon/icon';
import { useDarkModeContext } from '../../context/DarkModeContext';
import { color } from '../../styles/theme';

type Props = {
  icon: iconName;
  children: ReactNode;
};

type ContextProps = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContext = createContext<ContextProps>({} as ContextProps);

const ModalIconBtn = ({ icon, children }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { isDarkMode } = useDarkModeContext();
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpenModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef, setIsOpenModal]);

  return (
    <ModalContext.Provider value={{ setIsOpenModal }}>
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
      {isOpenModal && <Modal modalRef={modalRef}>{children}</Modal>}
    </ModalContext.Provider>
  );
};

export default ModalIconBtn;

export function useModalContext() {
  return useContext(ModalContext);
}
