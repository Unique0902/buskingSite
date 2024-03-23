import React, { ReactNode } from 'react';

import { createPortal } from 'react-dom';
import ModalInner from './ModalInner';

type Props = {
  children: ReactNode;
  handleClickOther: () => void;
};

const Modal = ({ children, handleClickOther }: Props) => {
  return (
    <>
      {createPortal(
        <ModalInner handleClickOther={handleClickOther}>{children}</ModalInner>,
        document.body
      )}
    </>
  );
};

export default Modal;
