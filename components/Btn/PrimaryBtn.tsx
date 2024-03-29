import React, { ReactNode } from 'react';

import { borderRadius, color, xyPadding } from '../../styles/theme';
type Props = {
  children: ReactNode;
  handleClick: () => void;
  bgColor?: string;
  textColor?: string;
  fontSize?: string;
  btnPadding?: string;
  radius?: string;
  isActivated?: boolean;
  isSubmit?: boolean;
};
const PrimaryBtn = ({
  children,
  handleClick,
  bgColor = '#0055ff',
  textColor = color.white,
  fontSize = '12px',
  btnPadding = xyPadding.base,
  radius = borderRadius.lg,
  isActivated = true,
  isSubmit = false,
}: Props) => {
  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      style={{
        backgroundColor: isActivated ? bgColor : color.gray_400,
        fontSize: fontSize,
        color: textColor,
        padding: btnPadding,
      }}
      onClick={handleClick}
      className={`${
        isActivated ? 'hover:opacity-70 cursor-pointer' : 'cursor-default'
      } ${radius}`}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
