import React from 'react';

import { createPortal } from 'react-dom';

type Props = {
  modalRef: React.RefObject<HTMLDivElement>;
};

const Modal = ({ modalRef }: Props) => {
  return (
    <>
      {createPortal(
        <section className='fixed top-0 left-0 flex flex-row items-center justify-center w-screen h-screen gap-4'>
          <div
            ref={modalRef}
            className='z-20 p-10 text-black bg-white opacity-100'
          >
            안녕하세용
          </div>
          <div className='absolute z-10 w-screen h-screen bg-black opacity-50'></div>
        </section>,
        document.body
      )}
    </>
  );
};

export default Modal;
