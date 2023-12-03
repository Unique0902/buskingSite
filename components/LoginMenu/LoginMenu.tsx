import { useRouter } from 'next/router';
import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { UserData } from '../../store/type/userData';
import PopupWrapper from '../PopUp/PopupWrapper';
import LoginMenuFooterBtn from './LoginMenuFooterBtn';
import LoginMenuPrimaryBtn from './LoginMenuPrimaryBtn';

type Props = {
  userData: UserData;
  setIsShowLoginMenu: React.Dispatch<React.SetStateAction<boolean>>;
};
const LoginMenu = ({ userData, setIsShowLoginMenu }: Props) => {
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
        <p className='px-4 py-3 text-xl text-center text-blue-600 '>
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
