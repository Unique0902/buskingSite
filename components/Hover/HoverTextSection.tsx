import React, { ReactNode, useState } from 'react';

import { borderRadius, color, xyPadding } from '../../styles/theme';
type Props = {
  children: ReactNode;
  bgColor?: string;
  textColor?: string;
  fontSize?: string;
  secPadding?: string;
  radius?: string;
  text: string;
};
const HoverTextSection = ({
  children,
  bgColor = color.primary_500,
  textColor = color.white,
  fontSize = '12px',
  secPadding = xyPadding.base,
  radius = borderRadius.lg,
  text,
}: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        fontSize: fontSize,
        color: textColor,
        padding: secPadding,
      }}
      className={`relative ${radius}`}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      {text}
      {isHovering && children}
    </div>
  );
};

export default HoverTextSection;
