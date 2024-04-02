import React from 'react';
import Icon from '../../../assets/icon/icon';

interface Props {
  isMiniMode: boolean;
}

const SideBarTitle: React.FC<Props> = ({ isMiniMode }: Props) => {
  if (isMiniMode) {
    return (
      <div className='flex items-center justify-center w-full py-4 text-2xl text-center text-blue-600 border-b border-gray-600 border-solid'>
        <Icon size={32} color='#60a5fa' icon='Book' />
      </div>
    );
  }
  return (
    <div className='flex items-center gap-3 px-5 py-3 text-white border-b border-gray-600 border-solid'>
      <Icon size={32} color='#60a5fa' icon='Book' />
      <p className='text-2xl font-semibold '>노래책</p>
    </div>
  );
};

export default SideBarTitle;
