import React, { ReactNode } from 'react';

import { borderRadius, color, xyPadding } from '../../styles/theme';
import HoverBox from './HoverBox';
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
  return (
    <HoverBox>
      <HoverBox.OutElement>
        <div
          style={{
            backgroundColor: bgColor,
            fontSize: fontSize,
            color: textColor,
            padding: secPadding,
          }}
          className={`relative ${radius}`}
        >
          {text}
        </div>
      </HoverBox.OutElement>
      <HoverBox.InnerElement>{children}</HoverBox.InnerElement>
    </HoverBox>
  );
};

export default HoverTextSection;
