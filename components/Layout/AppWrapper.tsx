import React, { ReactNode } from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserDataProtectedRoute from '../ProtectedRoute/UserDataProtectedRoute';

/* Context를 하나로 뭉치면 보기도 깔끔하고 Protected Route랑 파일을 따로 정리할수있어 가독성이 좋아짐
    but 성능에는 지장이 있긴함
    어느성능에 문제가있냐?
    애초에 데이터 호출코드는 uid가 없을때 실행이 안되니 괜찮음 물론 함수를 생성하니 메모리나 성능에 문제를 줄수는 있음
    그래도 모호한 수준이라 괜찮
    But userData가 없을때 buskingData, playlistData 받아오는건 좀 그렇지.. 예방 코드를 하나 넣어야겠네
    userData가 없으면 sync, get 요청하는 데이터가 없으니 큰 성능 저하는 없음

    이후 큰 성능 저하가 예상이 되면 따로 route랑 context provider 짝 맞춰서 구성할 예정

    그런데 context를 전달하는게 메모리 많이 먹으려나?? 문제가 생긴다면 수정해보자

    현재는 자잘한 성능보다는 가독성이 우선이지 않나싶음
*/
type Props = {
  children: ReactNode;
};
const AppWrapper = ({ children }: Props) => {
  return (
    <div>
      <ProtectedRoute>
        <UserDataProtectedRoute>{children}</UserDataProtectedRoute>
      </ProtectedRoute>
    </div>
  );
};

export default AppWrapper;
