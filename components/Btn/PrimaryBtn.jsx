import React from 'react';
import { borderRadius, color, xyPadding } from '../../styles/theme';

const PrimaryBtn = ({
  children,
  handleClick,
  bgColor = color.primary_500,
  textColor = color.white,
  fontSize = '12px',
  btnPadding = xyPadding.base,
  radius = borderRadius.lg,
  isActivated = true,
  isSubmit = false,
}) => {
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
