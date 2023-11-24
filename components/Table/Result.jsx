import React from 'react';
import { MinusIcn, PlusIcn, SendIcn, SmileIcn } from '../../assets/icon/icon';
import SlicedHoverText from '../Hover/SlicedHoverText';
const Result = ({ index, result, onSongClick, btnText }) => {
  console.log(result);
  return (
    <li className='flex flex-row items-center justify-between w-full px-2 py-2 mb-1 font-sans text-base font-light text-center text-white rounded-xl'>
      <p className='basis-1/12'>{index}</p>
      <div className='pl-2 text-left basis-5/6'>
        {(btnText === '제거' ||
          btnText === '신청가능' ||
          btnText === '신청') && <SlicedHoverText text={result.title} />}
        {btnText === '추가' && <SlicedHoverText text={result.name} />}
        <SlicedHoverText text={result.artist.name || result.artist} />
      </div>

      {result.cnt && <p className='basis-1/12'>{result.cnt + '명'}</p>}
      <button
        onClick={() => {
          btnText === '추가'
            ? onSongClick(result.name, result.artist)
            : onSongClick && onSongClick(result.sid || result.id);
        }}
        className='basis-1/12 hover:scale-110'
      >
        {btnText === '추가' && (
          <PlusIcn width={24} height={24} color={'white'} />
        )}
        {btnText === '제거' && (
          <MinusIcn width={24} height={24} color={'red'} />
        )}
        {btnText === '신청가능' && (
          <SmileIcn width={24} height={24} color={'white'} />
        )}
        {btnText === '신청' && (
          <SendIcn width={24} height={24} color={'white'} />
        )}
      </button>
    </li>
  );
};

export default Result;
