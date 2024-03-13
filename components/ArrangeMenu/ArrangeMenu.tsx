import React from 'react';

import ArrangeBtn from './ArrangeBtn';
import PopupWrapper from '../PopUp/PopupWrapper';
import { ArrangeOption } from '../../store/data/ArrangeOptions';

//TODO: 나중에 정렬한 결과가 서버에 반영될수있게 그리고 정렬한 결과가 musicbar에서 잘되는지 근데 그건 서버에서 처리해야될듯
//TODO: 드래그해서 노래 순서 바꿀수있게 하기 아니면 위아래 버튼클릭

type Props<T> = {
  setIsShowArrangeMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setResults: React.Dispatch<React.SetStateAction<T[]>>;
  arrangeOptionArr: ArrangeOption<T>[];
};

const ArrangeMenu = <T,>({
  setIsShowArrangeMenu,
  setResults,
  arrangeOptionArr,
}: Props<T>) => {
  const arrangeResults = (compareFunc: (a: T, b: T) => number) => {
    setResults((prevData) => [...prevData].sort(compareFunc));
  };

  return (
    <PopupWrapper
      handleClickOther={() => setIsShowArrangeMenu(false)}
      isLeft={false}
    >
      <section className='flex flex-col pt-2 pb-2 border-b border-gray-600 border-solid '>
        {arrangeOptionArr.map((data) => (
          <ArrangeBtn
            key={data.name}
            handleClick={() => {
              arrangeResults(data.arrangeFunc);
              setIsShowArrangeMenu(false);
            }}
          >
            {data.name}
          </ArrangeBtn>
        ))}
      </section>
    </PopupWrapper>
  );
};

export default ArrangeMenu;
