import React from 'react';
import { ArrowLeftIcn, ArrowRightIcn } from '../assets/icon/icon';

export default function PageNumScreen({
  resultNum,
  pageNum,
  onPagePlus,
  onPageMinus,
}) {
  const btnStyle = 'mx-2 rounded-full hover:scale-110 w-8 h-8';
  return (
    <div className='flex justify-center mt-3'>
      <button className={btnStyle} onClick={() => onPageMinus()}>
        <ArrowLeftIcn width={18} height={18} color={'white'} />
      </button>
      <p className='ml-2 text-white font-sans font-normal text-xl'>
        {pageNum} /
      </p>
      <p className='ml-2 text-white font-sans font-normal text-xl'>
        {parseInt((resultNum - 1) / 6) + 1}
      </p>
      <button className={btnStyle} onClick={() => onPagePlus()}>
        <ArrowRightIcn width={18} height={18} color={'white'} />
      </button>
    </div>
  );
}
