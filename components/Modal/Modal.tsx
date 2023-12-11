import React, { ReactNode } from 'react';

import { createPortal } from 'react-dom';

type Props = {
  modalRef: React.RefObject<HTMLDivElement>;
  children: ReactNode;
};

const Modal = ({ modalRef, children }: Props) => {
  return (
    <>
      {createPortal(
        <section className='fixed top-0 left-0 flex flex-row items-center justify-center w-screen h-screen gap-4'>
          <div
            ref={modalRef}
            className='z-20 w-1/2 text-black bg-white opacity-100 rounded-2xl max-lg:rounded-none dark:bg-slate-500 h-5/6 max-lg:w-full max-lg:h-full'
          >
            {children}
          </div>
          <div className='absolute z-10 w-screen h-screen bg-black opacity-50'></div>
        </section>,
        document.body
      )}
    </>
  );
};

export default Modal;
