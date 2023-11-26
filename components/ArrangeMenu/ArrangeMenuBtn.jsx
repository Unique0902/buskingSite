import React, { useState } from 'react';
import { borderRadius, color, xyPadding } from '../../styles/theme';
import ArrangeMenu from './ArrangeMenu';
import PrimaryBtn from '../Btn/PrimaryBtn';

const ArrangeMenuBtn = ({ results, setResults, isBusking }) => {
  const [isShowArrangeMenu, setIsShowArrangeMenu] = useState(false);
  const handleClick = () => {
    setIsShowArrangeMenu(true);
  };
  return (
    <div className='relative'>
      <PrimaryBtn
        handleClick={handleClick}
        bgColor={color.gray_400}
        radius={borderRadius.xm}
        btnPadding={xyPadding.base}
      >
        정렬
      </PrimaryBtn>
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
