import React, { useState } from 'react';
import { borderRadius, color, xyPadding } from '../styles/theme';

const HoverTextSection = ({
  children,
  bgColor = color.primary_500,
  textColor = color.white,
  fontSize = '12px',
  secPadding = xyPadding.base,
  radius = borderRadius.lg,
  text,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      style={{ backgroundColor: bgColor, fontSize: fontSize, color: textColor }}
      className={`relative ${radius} ${secPadding}`}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      {text}
      {isHovering && children}
    </div>
  );
};

export default HoverTextSection;
