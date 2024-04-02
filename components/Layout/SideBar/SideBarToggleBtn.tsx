import React from 'react';
import Icon from '../../../assets/icon/icon';

interface Props {
  isHide: boolean;
  isSmScreen: boolean;
  setIsHide: (value: React.SetStateAction<boolean>) => void;
  setIsShowSideBar: (value: React.SetStateAction<boolean>) => void;
}

const SideBarToggleBtn: React.FC<Props> = ({
  isHide,
  setIsHide,
  isSmScreen,
  setIsShowSideBar,
}: Props) => {
  return (
    <button
      className={`absolute bottom-0 flex ${
        isHide ? 'justify-center' : 'justify-end text-right pr-5'
      }  w-full text-white border-t border-gray-600 border-solid hover:opacity-70 py-7`}
      onClick={() =>
        isHide
          ? setIsHide(false)
          : isSmScreen
          ? setIsShowSideBar(false)
          : setIsHide(true)
      }
    >
      <Icon
        size={20}
        color='white'
        icon={isHide ? 'ArrowRight' : 'ArrowLeft'}
      />
    </button>
  );
};

export default SideBarToggleBtn;
