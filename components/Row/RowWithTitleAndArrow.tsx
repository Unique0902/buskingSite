import React, { ReactNode } from 'react';

import RowWithTitle from './RowWithTitle';
import Icon from '../../assets/icon/icon';
import { color } from '../../styles/theme';

type Props = {
  title: string;
  children?: ReactNode;
};

const RowWithTitleAndArrow = ({ title, children }: Props) => {
  return (
    <RowWithTitle title={title}>
      {children}
      <div className={`absolute right-5`}>
        <Icon size={20} color={color.gray_900} icon='ArrowRight' />
      </div>
    </RowWithTitle>
  );
};

export default RowWithTitleAndArrow;
