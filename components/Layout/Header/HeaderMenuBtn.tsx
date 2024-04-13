import React from 'react';
import Icon from '../../../assets/icon/icon';

interface Props {
  onClick: () => void;
}

const HeaderMenuBtn: React.FC<Props> = ({ onClick }: Props) => {
  return (
    <button onClick={onClick} className='flex'>
      <div className='mr-6'>
        <Icon size={24} color='white' icon='Menu' />
      </div>
    </button>
  );
};

export default HeaderMenuBtn;
