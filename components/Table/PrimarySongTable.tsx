import React, { useEffect, useState } from 'react';
import { ApplianceData } from '../../store/type/busking';
import { PlaylistSongData } from '../../store/type/playlist';
import PagingBar from './PagingBar';

//TODO: SongAddTable도 합칠수없을지 생각해보기 add랑 데이터 처리하는 방법을 비슷하게 만들기
//TODO: PlaylistSongData와 ApplianceData합친 타입 만들어서 아래 prop type에서 사용하기
/*results를 한번에 받은다음에 처리하는것이 좋은것은 아니니, 
데이터수가 매우 많아질수도 있으니 이러한 부분적으로 받아서 보여주는거 생각해보기
<< 해결 문서형 데이터베이스는 아무리 데이터가 많더라도 json 형식이다 보니 용량이 굳이 크지않아서
오히려 나눠서 받아오려고 네트워크 통신을 많이하는게 손해인듯
*/
type Props = {
  results: PlaylistSongData[] | ApplianceData[];
  renderSongResult: (
    key: number,
    index: number,
    result: PlaylistSongData | ApplianceData
  ) => React.JSX.Element;
};
// 최종 목표는 songAddTable과 결합하기 위함
// 문제는 그러면 handlePlusPage, minusPage , pagenum 다 밖으로 빼야됨<<이거는 나중에 리팩토링진행하면됨
// 두번째 문제는 applianceData처리 (request song) 같은 경우에는 searchBar기능을 만들지 않았다 보니
// buskingApply 페이지에서 바꾸어주고
// searchBar를 추가를 해주어야함 BuskingApply에서 그러면 두개나 필요해짐 useSearch가 << useRequestSearch를 만들까? <아 custom hook은여러번 사용된다
// applianceData에 useSearch를 사용하는데 searchBySearchWord 사용안하는데 넣는게 효율적일까? << 추후에 추가할수도 있으니 나쁘지않을지도
// 결국 목표는 songTable을 의존성을 낮추고 개방폐쇄적으로 구성하는것인듯
// 근데 어디까지 커스텀 훅으로 묶을지 커스텀훅의 명칭을 뭐로 해야할지도 생각해봐야할듯 묶는 범위
export default function PrimarySongTable({ results, renderSongResult }: Props) {
  const [nowPageNum, setNowPageNum] = useState<number>(1);
  const handelPlusPage = () => {
    if (nowPageNum < results.length / 6) {
      setNowPageNum((num) => num + 1);
    }
  };
  const handelMinusPage = () => {
    if (nowPageNum !== 1) {
      setNowPageNum((num) => num - 1);
    }
  };
  useEffect(() => {
    if (results && results.length > 0) {
      setNowPageNum(1);
    }
  }, [results]);
  const resultsToView = results.slice((nowPageNum - 1) * 6, nowPageNum * 6);
  return (
    <section className='w-full'>
      <ul className='p-1 bg-gray-800 rounded-xl'>
        {resultsToView && resultsToView.length !== 0 && (
          <>
            {resultsToView.map(
              (result: PlaylistSongData | ApplianceData, index: number) =>
                renderSongResult(
                  index,
                  index + 1 + (nowPageNum - 1) * 6,
                  result
                )
            )}
            <PagingBar
              resultNum={results.length}
              pageNum={nowPageNum}
              onPagePlus={handelPlusPage}
              onPageMinus={handelMinusPage}
            />
          </>
        )}
        {(!results || results.length === 0) && (
          <>
            <h2 className='my-5 text-2xl font-normal text-center text-white'>
              노래가 존재하지 않습니다.
            </h2>
          </>
        )}
      </ul>
    </section>
  );
}
