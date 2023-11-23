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
}) => {
  return (
    <button
      type='button'
      style={{
        backgroundColor: bgColor,
        fontSize: fontSize,
        color: textColor,
        padding: btnPadding,
      }}
      onClick={handleClick}
      className={`hover:opacity-70 ${radius}`}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
