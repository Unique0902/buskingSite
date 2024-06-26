import React, { ReactNode, useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';

type Props = {
  children: ReactNode;
  handleClickOther: () => void;
};

const ModalInner = ({ children, handleClickOther }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, handleClickOther);

  return (
    <section className='fixed top-0 left-0 flex flex-row items-center justify-center w-screen h-screen gap-4'>
      <div
        ref={modalRef}
        className='z-20 w-1/2 text-black bg-white opacity-100 rounded-2xl max-lg:rounded-none dark:bg-slate-500 h-5/6 max-lg:w-full max-lg:h-full'
      >
        {children}
      </div>
      <div className='absolute z-10 w-screen h-screen bg-black opacity-50'></div>
    </section>
  );
};

export default ModalInner;
