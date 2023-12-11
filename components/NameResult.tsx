import React from 'react';

import Icon from '../assets/icon/icon';
import { UserData } from '../store/type/userData';
import { color } from '../styles/theme';

interface Props {
  result: UserData;
}

const NameResult: React.FC<Props> = ({ result }: Props) => {
  return (
    <button className='flex flex-row items-center w-full gap-4 px-3 py-3 dark:hover:bg-slate-600 hover:bg-gray-200'>
      <div className='bg-gray-100 rounded-full'>
        <Icon size={40} icon='User' color={color.gray_900} />
      </div>
      <p className='dark:text-white'>{result.name}</p>
    </button>
  );
};

export default NameResult;
