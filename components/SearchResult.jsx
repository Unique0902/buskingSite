import React, { useRef, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { MinusIcn, PlusIcn, SendIcn, SmileIcn } from '../assets/icon/icon';
const SearchResult = ({ index, result, onSongClick, btnText }) => {
  const nameRef = useRef();
  const artistRef = useRef();
  const [sid, getSid] = useState('');
  const [isHovering1, setIsHovering1] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);
  const [maxLeng, setMaxLeng] = useState(30);
  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  useEffect(() => {
    if (isPc) {
      setMaxLeng(30);
    } else {
      setMaxLeng(20);
    }
  }, [isPc]);
  useEffect(() => {
    result.sid ? getSid(result.sid) : getSid(result.id);
  }, [result]);
  return (
    <li className='flex flex-row w-full text-white font-sans items-center font-light  rounded-xl mb-1 text-base justify-between px-2 py-2 text-center'>
      <p className='basis-1/12'>{index}</p>
      <div className='basis-5/6 text-left pl-2'>
        <div
          ref={nameRef}
          className={`relative text-white font-sans font-medium text-lg`}
          onMouseOver={() => setIsHovering1(true)}
          onMouseOut={() => setIsHovering1(false)}
        >
          {(btnText === '제거' ||
            btnText === '신청가능' ||
            btnText === '신청') &&
          result.title.length > maxLeng
            ? result.title.slice(0, maxLeng) + '..'
            : result.title}
          {btnText === '추가' && result.name.length > maxLeng
            ? result.name.slice(0, maxLeng) + '..'
            : result.name}
          {(btnText === '제거' ||
            btnText === '신청가능' ||
            btnText === '신청') &&
            isHovering1 && (
              <p className='absolute bg-white rounded-lg border border-gray-500 p-2 text-black'>
                {result.title}
              </p>
            )}
          {btnText === '추가' && isHovering1 && (
            <p className='absolute bg-white rounded-lg border border-gray-500 p-2 text-black'>
              {result.name}
            </p>
          )}
        </div>
        <div
          ref={artistRef}
          className='relative text-gray-200 font-sans'
          onMouseOver={() => setIsHovering2(true)}
          onMouseOut={() => setIsHovering2(false)}
        >
          {result.artist.name
            ? result.artist.name.length > 15
              ? result.artist.name.slice(0, 15) + '..'
              : result.artist.name
            : result.artist.length > 15
            ? result.artist.slice(0, 15) + '..'
            : result.artist}
          {isHovering2 && (
            <p className='absolute rounded-lg border border-gray-500 p-2 bg-white text-black'>
              {result.artist.name || result.artist}
            </p>
          )}
        </div>
      </div>

      {result.cnt && <p className='basis-1/12'>{result.cnt + '명'}</p>}
      <button
        onClick={() => {
          btnText === '추가'
            ? onSongClick(result.name, result.artist)
            : onSongClick && onSongClick(sid);
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

export default SearchResult;
