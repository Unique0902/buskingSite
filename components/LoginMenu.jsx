import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import PopupWrapper from './PopupWrapper';

const LoginMenu = ({ userData, setIsShowLoginMenu }) => {
  const { logout } = useAuthContext();
  // let navigate = useNavigate();
  const btnStyle =
    'font-sans text-black text-lg text-center py-1 px-4 hover:bg-gray-200';
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
        <button
          className={btnStyle}
          onClick={() => {
            setIsShowLoginMenu(false);
            // navigate('/app/inform');
          }}
        >
          회원정보
        </button>
        <button
          className={btnStyle}
          onClick={() => {
            logout();
          }}
        >
          로그아웃
        </button>
      </section>
      <section className='flex flex-row justify-around px-4 py-4'>
        <button className='font-sans text-sm text-gray-500 hover:bg-gray-200'>
          개인정보 처리 방침
        </button>
        <button className='font-sans text-sm text-gray-500 hover:bg-gray-200'>
          서비스 약관
        </button>
      </section>
    </PopupWrapper>
  );
};

export default LoginMenu;
