import React, { useEffect, useRef, useState } from 'react';

import Modal from './Modal';
import { iconName } from '../../assets/icon/constants';
import Icon from '../../assets/icon/icon';
import { color } from '../../styles/theme';

type Props = {
  icon: iconName;
};

const ModalIconBtn = ({ icon }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
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
    <button
      onClick={() => {
        setIsOpenModal(true);
      }}
      className='p-2 bg-white border border-black rounded-full dark:bg-slate-800 hover:opacity-70 dark:border-white'
    >
      <Icon size={25} icon={icon} color={color.gray_900} />
      {isOpenModal && <Modal modalRef={modalRef} />}
    </button>
  );
};

export default ModalIconBtn;
