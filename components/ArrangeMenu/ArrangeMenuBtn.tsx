import React, { useState } from 'react';
import { borderRadius, color, xyPadding } from '../../styles/theme';
import ArrangeMenu from './ArrangeMenu';
import PrimaryBtn from '../Btn/PrimaryBtn';
import { PlaylistSongData } from '../../store/type/playlist';
import { ApplianceData } from '../../store/type/busking';
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
