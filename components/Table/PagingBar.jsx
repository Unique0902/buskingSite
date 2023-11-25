import React from 'react';
import { ArrowLeftIcn, ArrowRightIcn } from '../../assets/icon/icon';

export default function PagingBar({
  resultNum,
  pageNum,
  onPagePlus,
  onPageMinus,
}) {
  const btnStyle = ' rounded-full hover:scale-110 px-4 py-2';

  return (
    <div className='flex flex-row items-center justify-center mt-3'>
      <button className={btnStyle} onClick={onPageMinus}>
        <ArrowLeftIcn width={18} height={18} color={'white'} />
      </button>
      <p className='ml-2 font-sans text-xl font-normal text-white'>
        {pageNum} / {parseInt((resultNum - 1) / 6) + 1}
      </p>
      <button className={btnStyle} onClick={onPagePlus}>
        <ArrowRightIcn width={18} height={18} color={'white'} />
      </button>
    </div>
  );
}
