import React, { useState } from 'react';
import ArrangeMenu from './ArrangeMenu';

const ArrangeMenuBtn = ({ results, setResults, isBusking }) => {
  const [isShowArrangeMenu, setIsShowArrangeMenu] = useState(false);
  const handelClick = (e) => {
    e.preventDefault();
    setIsShowArrangeMenu(true);
  };
  return (
    <div className='relative'>
      <button
        className='ml-5 bg-blue-600 max-lg:ml-2 max-lg:px-2 py-2 px-3 text-lg rounded-lg text-white hover:scale-125'
        onClick={handelClick}
      >
        정렬
      </button>
      {isShowArrangeMenu && (
        <ArrangeMenu
          setIsShowArrangeMenu={setIsShowArrangeMenu}
          results={results}
          setResults={setResults}
          isBusking={isBusking}
        />
      )}
    </div>
  );
};

export default ArrangeMenuBtn;
