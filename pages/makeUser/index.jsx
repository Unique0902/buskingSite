import React, { useState } from 'react';
import PrimaryBtn from '../../components/Btn/PrimaryBtn';
import TitleBar from '../../components/TitleBar';
import { useAuthContext } from '../../context/AuthContext';
import { useUserDataContext } from '../../context/UserDataContext';
import { borderRadius, fontSize, xyPadding } from '../../styles/theme';
import { useRouter } from 'next/router';

const MakeUser = () => {
  const [name, setName] = useState('');
  const { uid } = useAuthContext();
  const { userData, makeUserData } = useUserDataContext();
  const router = useRouter();
  if (userData) {
    router.push('app/home');
    return <div>move to app..</div>;
  }
  const handleHandleChangeNameInput = (e) => {
    setName(e.target.value);
  };
  const handleClickMakeUserBtn = async () => {
    if (name.length > 1 && name.length < 9) {
      await makeUserData(uid, name);
    }
  };
  const isCanApply = name.length > 1 && name.length < 9;

  return (
    <section className='flex flex-col items-center h-screen gap-12 p-8 pt-24 bg-gradient-to-b from-blue-500 to-white'>
      <TitleBar text={'노래책에서 사용할 닉네임을 정해주세요.'} />
      <input
        value={name}
        onChange={handleHandleChangeNameInput}
        className='px-5 py-4 mt-12 font-sans text-3xl font-normal text-black border border-black rounded-2xl'
      />
      <PrimaryBtn
        handleClick={handleClickMakeUserBtn}
        fontSize={fontSize.base}
        btnPadding={xyPadding.lg}
        isActivated={isCanApply}
        radius={borderRadius.xl3}
      >
        노래책 시작하기
      </PrimaryBtn>
      {!isCanApply && (
        <p className='font-sans text-lg font-semibold text-red-500'>
          2자 이상, 8자 이하의 닉네임을 입력해주세요!
        </p>
      )}
    </section>
  );
};

export default MakeUser;
