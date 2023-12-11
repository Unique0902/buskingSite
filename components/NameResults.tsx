import React from 'react';

import NameResult from './NameResult';
import { UserData } from '../store/type/userData';

type Props = {
  results: UserData[];
};

const NameResults: React.FC<Props> = ({ results }: Props) => {
  return (
    <>
      {results.map((val) => (
        <NameResult key={'NameResult' + val.date} result={val} />
      ))}
    </>
  );
};

export default NameResults;
