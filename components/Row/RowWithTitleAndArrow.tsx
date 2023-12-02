import React, { ReactNode } from 'react';
import { ArrowRightIcn } from '../../assets/icon/icon';
import { color } from '../../styles/theme';
import RowWithTitle from './RowWithTitle';

type Props = {
  title: string;
  children?: ReactNode;
};

const RowWithTitleAndArrow = ({ title, children }: Props) => {
  return (
    <RowWithTitle title={title}>
      {children}
      <ArrowRightIcn
        width={20}
        height={20}
        color={color.gray_900}
        className={`absolute right-5`}
      />
    </RowWithTitle>
  );
};

export default RowWithTitleAndArrow;
