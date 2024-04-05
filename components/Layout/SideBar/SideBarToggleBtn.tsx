import React from 'react';
import Icon from '../../../assets/icon/icon';

interface Props {
  isMiniMode: boolean;
  isSmScreen: boolean;
  setIsMiniMode: (value: React.SetStateAction<boolean>) => void;
  setIsShowSideBar: (value: React.SetStateAction<boolean>) => void;
}

const SideBarToggleBtn: React.FC<Props> = ({
  isMiniMode,
  isSmScreen,
  setIsMiniMode,
  setIsShowSideBar,
}: Props) => {
  return (
    <button
      className={`absolute bottom-0 flex ${
        isMiniMode ? 'justify-center' : 'justify-end text-right pr-5'
      }  w-full text-white border-t border-gray-600 border-solid hover:opacity-70 py-7`}
      onClick={() =>
        isMiniMode
          ? setIsMiniMode(false)
          : isSmScreen
          ? setIsShowSideBar(false)
          : setIsMiniMode(true)
      }
      data-testid='toggleBtn'
    >
      <Icon
        size={20}
        color='white'
        icon={isMiniMode ? 'ArrowRight' : 'ArrowLeft'}
      />
    </button>
  );
};

export default SideBarToggleBtn;
