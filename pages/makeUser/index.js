import React, { useRef, useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useUserDataContext } from '../../context/UserDataContext';

const MakeUser = ({ userRepository }) => {
  const nameRef = useRef();
  const { userData } = useUserDataContext();
  const [name, setName] = useState('');
  const [isCanApply, setIsCanApply] = useState(false);
  const { uid } = useAuthContext();
  useEffect(() => {
    if (name.length > 1 && name.length < 9) {
      setIsCanApply(true);
    } else {
      setIsCanApply(false);
    }
  }, [name]);
  return (
    <section className=' h-screen flex flex-col p-16 items-center bg-gradient-to-b from-blue-500 to-blue-900'>
      <h2 className=' font-sans text-3xl font-semibold'>
        노래책에서 사용할 닉네임을 정해주세요.
      </h2>
      <input
        ref={nameRef}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        className='mt-36 px-5 py-4 border border-black rounded-2xl font-normal font-sans text-3xl text-black'
      />
      {!isCanApply && (
        <p className='font-sans text-lg text-red-500 font-normal mt-4'>
          2자 이상, 8자 이하의 닉네임을 입력해주세요!
        </p>
      )}
      <button
        className={`w-1/4 ${
          isCanApply
            ? 'bg-black hover:bg-gray-400'
            : 'bg-none border border-gray-300'
        } py-4 rounded-xl mt-24`}
        onClick={() => {
          if (isCanApply) {
            const name = nameRef.current.value;
            userRepository.makeUser(uid, name, () => {
              navigate('/app/home');
            });
          }
        }}
      >
        노래책 시작하기
      </button>
    </section>
  );
};

export default MakeUser;
