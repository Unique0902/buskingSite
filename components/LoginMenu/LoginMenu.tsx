import React from 'react';

import { useRouter } from 'next/router';

import LoginMenuFooterBtn from './LoginMenuFooterBtn';
import { useAuthContext } from '../../context/AuthContext';
import { UserData } from '../../store/type/userData';
import PopUpMenuInnerBtn from '../PopUp/PopUpMenuInnerBtn';

type Props = {
  userData: UserData | null | undefined;
};
const LoginMenu = ({ userData }: Props) => {
  const { logout } = useAuthContext();
  const router = useRouter();
  const handleClickUserInformBtn = () => {
    router.push('/app/inform');
  };
  const handleClickLogoutBtn = () => {
    logout();
  };

  return (
    <>
      <section className='flex flex-col pt-2 pb-2 border-b border-gray-400 border-solid '>
        <p className='px-4 py-3 text-xl text-center text-blue-600 '>
          {userData && userData.name}
        </p>
        <PopUpMenuInnerBtn handleClick={handleClickUserInformBtn} isCenter>
          회원정보
        </PopUpMenuInnerBtn>
        <PopUpMenuInnerBtn handleClick={handleClickLogoutBtn} isCenter>
          로그아웃
        </PopUpMenuInnerBtn>
      </section>
      <section className='flex flex-row justify-around px-4 py-4'>
        <LoginMenuFooterBtn>개인정보 처리 방침</LoginMenuFooterBtn>
        <LoginMenuFooterBtn>서비스 약관</LoginMenuFooterBtn>
      </section>
    </>
  );
};

export default LoginMenu;
