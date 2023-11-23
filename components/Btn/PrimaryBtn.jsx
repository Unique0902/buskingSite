import React from 'react';
import {
  bgColors,
  borderRadius,
  fontSizes,
  textColors,
  xyPadding,
} from '../../styles/theme';

const PrimaryBtn = ({
  children,
  handleClick,
  bgColor = bgColors.primary_500,
  textColor = textColors.white,
  fontSize = fontSizes.sm,
  btnPadding = xyPadding.base,
  radius = borderRadius.xl3,
}) => {
  return (
    <button
      type='button'
      onClick={handleClick}
      className={`hover:opacity-70 ${radius} ${fontSize} ${btnPadding} ${textColor} ${bgColor}`}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
