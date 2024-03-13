import React, { useState } from 'react';

import ArrangeMenu from './ArrangeMenu';
import { color, xyPadding } from '../../styles/theme';
import PrimaryBtn from '../Btn/PrimaryBtn';
import { ArrangeOption } from '../../store/data/ArrangeOptions';

type Props<T> = {
  results: T[];
  setResults: React.Dispatch<React.SetStateAction<T[]>>;
  arrangeOptionArr: ArrangeOption<T>[];
};

const ArrangeMenuBtn = <T,>({
  results,
  setResults,
  arrangeOptionArr,
}: Props<T>) => {
  const [isShowArrangeMenu, setIsShowArrangeMenu] = useState<boolean>(false);
  const handleClick = () => {
    setIsShowArrangeMenu(true);
  };
  return (
    <div className='relative'>
      <PrimaryBtn
        handleClick={handleClick}
        bgColor={color.gray_400}
        btnPadding={xyPadding.base}
      >
        정렬
      </PrimaryBtn>
      {isShowArrangeMenu && (
        <ArrangeMenu<T>
          setIsShowArrangeMenu={setIsShowArrangeMenu}
          results={results}
          setResults={setResults}
          arrangeOptionArr={arrangeOptionArr}
        />
      )}
    </div>
  );
};

export default ArrangeMenuBtn;
