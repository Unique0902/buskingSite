import React from 'react';

import NameResult from './NameResult';
import { UserDataEntries, UserDataObj } from '../store/type/userData';

type Props = {
  userDataEntries: UserDataEntries<UserDataObj>;
};

const NameResults: React.FC<Props> = ({ userDataEntries }: Props) => {
  return (
    <>
      {userDataEntries.map(([key, value]) => (
        <NameResult key={key} userId={key} result={value} />
      ))}
    </>
  );
};

export default NameResults;
