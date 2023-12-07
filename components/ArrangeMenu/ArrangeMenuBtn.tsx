import React, { useState } from 'react';

import ArrangeMenu from './ArrangeMenu';
import { ApplianceData } from '../../store/type/busking';
import { PlaylistSongData } from '../../store/type/playlist';
import { color, xyPadding } from '../../styles/theme';
import PrimaryBtn from '../Btn/PrimaryBtn';
type Props = {
  results: PlaylistSongData[] | ApplianceData[];
  setResults: React.Dispatch<
    React.SetStateAction<PlaylistSongData[] | ApplianceData[]>
  >;
  isBusking: boolean;
};
const ArrangeMenuBtn = ({ results, setResults, isBusking }: Props) => {
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
