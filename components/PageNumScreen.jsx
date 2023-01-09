import React from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

export default function PageNumScreen({
  resultNum,
  pageNum,
  onPagePlus,
  onPageMinus,
}) {
  const btnStyle =
    'mx-2 text-white rounded-full hover:scale-110 text-center text-lg w-8 h-8';
  return (
    <div className='flex justify-center mt-3'>
      <button className={btnStyle} onClick={() => onPageMinus()}>
        <FaChevronLeft />
      </button>
      <p className='ml-2 text-white font-sans font-normal text-xl'>
        {pageNum} /
      </p>
      <p className='ml-2 text-white font-sans font-normal text-xl'>
        {parseInt((resultNum - 1) / 6) + 1}
      </p>
      <button className={btnStyle} onClick={() => onPagePlus()}>
        <FaChevronRight />
      </button>
    </div>
  );
}
