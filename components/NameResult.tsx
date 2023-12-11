import React from 'react';

import { useRouter } from 'next/router';

import Icon from '../assets/icon/icon';
import { UserData } from '../store/type/userData';
import { color } from '../styles/theme';

interface Props {
  userId: string;
  result: UserData;
}

const NameResult: React.FC<Props> = ({ userId, result }: Props) => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        userId && router.push(`/buskingApply/${userId}`);
      }}
      className='flex flex-row items-center w-full gap-4 px-3 py-3 dark:hover:bg-slate-600 hover:bg-gray-200'
    >
      <div className='bg-gray-100 rounded-full'>
        <Icon size={40} icon='User' color={color.gray_900} />
      </div>
      <p className='dark:text-white'>{result.name}</p>
    </button>
  );
};

export default NameResult;
