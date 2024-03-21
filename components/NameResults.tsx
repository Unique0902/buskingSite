import React from 'react';

import NameResult from './NameResult';
import { UserData } from '../store/type/userData';

type Props = {
  userDataArr: UserData[];
};

const NameResults: React.FC<Props> = ({ userDataArr }: Props) => {
  return (
    <>
      {userDataArr.map((value) => (
        <NameResult key={value.id} userId={value.id} result={value} />
      ))}
    </>
  );
};

export default NameResults;
