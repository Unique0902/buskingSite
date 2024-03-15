import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  handleClick: () => void;
  isCenter?: boolean;
}

const PopUpMenuInnerBtn: React.FC<Props> = ({
  children,
  handleClick,
  isCenter = false,
}: Props) => {
  return (
    <button
      className={`text-lg ${
        isCenter ? 'text-center' : 'text-left'
      } py-1 px-4 hover:bg-gray-200 dark:hover:bg-gray-900`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default PopUpMenuInnerBtn;
