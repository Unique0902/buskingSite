import React from 'react';

import Icon from '../../assets/icon/icon';
type Props = {
  totalPageNum: number;
  pageNum: number;
  onPagePlus: () => void;
  onPageMinus: () => void;
};
export default function PagingBar({
  totalPageNum,
  pageNum,
  onPagePlus,
  onPageMinus,
}: Props) {
  const btnStyle = ' rounded-full hover:scale-110 px-4 py-2';
  const handlePagePlus = () => {
    if (pageNum < totalPageNum) {
      onPagePlus();
    }
  };
  const handlePageMinus = () => {
    if (pageNum > 1) {
      onPageMinus();
    }
  };

  return (
    <div className='flex flex-row items-center justify-center mt-3'>
      <button className={btnStyle} onClick={handlePageMinus}>
        <Icon size={18} color='white' icon='ArrowLeft' />
      </button>
      <div className='flex flex-row items-center gap-2 text-xl font-normal text-white'>
        <p>{pageNum}</p>
        <p>/</p>
        <p>{totalPageNum}</p>
      </div>

      <button className={btnStyle} onClick={handlePagePlus}>
        <Icon size={18} color='white' icon={'ArrowRight'} />
      </button>
    </div>
  );
}
