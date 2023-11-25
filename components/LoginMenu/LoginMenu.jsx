import { useRouter } from 'next/router';
import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import PopupWrapper from '../PopupWrapper';
import LoginMenuFooterBtn from './LoginMenuFooterBtn';
import LoginMenuPrimaryBtn from './LoginMenuPrimaryBtn';

const LoginMenu = ({ userData, setIsShowLoginMenu }) => {
  const { logout } = useAuthContext();
  const router = useRouter();
  const handleClickUserInformBtn = () => {
    setIsShowLoginMenu(false);
    router.push('/app/inform');
  };
  const handleClickLogoutBtn = () => {
    logout();
  };

  return (
    <PopupWrapper
      handleClickOther={() => {
        setIsShowLoginMenu(false);
      }}
      isLeft={false}
    >
      <section className='flex flex-col pt-2 pb-2 border-b border-gray-400 border-solid '>
        <p className='px-4 py-3 font-sans text-xl text-center text-blue-600 '>
          {userData && userData.name}
        </p>
        <LoginMenuPrimaryBtn handleClick={handleClickUserInformBtn}>
          회원정보
        </LoginMenuPrimaryBtn>
        <LoginMenuPrimaryBtn handleClick={handleClickLogoutBtn}>
          로그아웃
        </LoginMenuPrimaryBtn>
      </section>
      <section className='flex flex-row justify-around px-4 py-4'>
        <LoginMenuFooterBtn>개인정보 처리 방침</LoginMenuFooterBtn>
        <LoginMenuFooterBtn>서비스 약관</LoginMenuFooterBtn>
      </section>
    </PopupWrapper>
  );
};

export default LoginMenu;
