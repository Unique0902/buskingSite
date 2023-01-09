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
      <section className=' border-b border-gray-400 border-solid flex flex-col pt-2 pb-2'>
        <p className=' text-center text-blue-600 font-sans text-xl py-3 px-4'>
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
      <section className='flex flex-row justify-around py-4 px-4'>
        <button className='text-gray-500 font-sans text-sm hover:bg-gray-200'>
          개인정보 처리 방침
        </button>
        <button className='text-gray-500 font-sans text-sm hover:bg-gray-200'>
          서비스 약관
        </button>
      </section>
    </PopupWrapper>
  );
};

export default LoginMenu;
