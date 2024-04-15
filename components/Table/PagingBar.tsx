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

  return (
    <div className='flex flex-row items-center justify-center mt-3'>
      <button className={btnStyle} onClick={onPageMinus}>
        <Icon size={18} color='white' icon='ArrowLeft' />
      </button>
      <p className='ml-2 text-xl font-normal text-white'>
        {pageNum} / {totalPageNum}
      </p>
      <button className={btnStyle} onClick={onPagePlus}>
        <Icon size={18} color='white' icon={'ArrowRight'} />
      </button>
    </div>
  );
}
