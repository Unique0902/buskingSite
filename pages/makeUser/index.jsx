import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useUserDataContext } from '../../context/UserDataContext';

const MakeUser = () => {
  const [name, setName] = useState('');
  const { uid } = useAuthContext();
  const { makeUserData } = useUserDataContext();

  const handleHandleChangeNameInput = (e) => {
    setName(e.target.value);
  };
  const handleClickMakeUserBtn = async () => {
    if (name.length > 1 && name.length < 9) {
      await makeUserData(uid, name);
      navigate('/app/home');
    }
  };
  return (
    <section className='flex flex-col items-center h-screen p-16 bg-gradient-to-b from-blue-500 to-blue-900'>
      <h2 className='font-sans text-3xl font-semibold '>
        노래책에서 사용할 닉네임을 정해주세요.
      </h2>
      <input
        value={name}
        onChange={handleHandleChangeNameInput}
        className='px-5 py-4 font-sans text-3xl font-normal text-black border border-black mt-36 rounded-2xl'
      />
      {!(name.length > 1 && name.length < 9) && (
        <p className='mt-4 font-sans text-lg font-normal text-red-500'>
          2자 이상, 8자 이하의 닉네임을 입력해주세요!
        </p>
      )}
      <button
        className={`w-1/4 ${
          name.length > 1 && name.length < 9
            ? 'bg-black hover:bg-gray-400'
            : 'bg-none border border-gray-300'
        } py-4 rounded-xl mt-24`}
        onClick={handleClickMakeUserBtn}
      >
        노래책 시작하기
      </button>
    </section>
  );
};

export default MakeUser;
