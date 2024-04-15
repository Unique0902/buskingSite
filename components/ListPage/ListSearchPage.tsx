import React, { useState } from 'react';

interface Props {}

const ListSearchPage: React.FC<Props> = ({}: Props) => {
  const [searchWord, setSearchWord] = useState({ name: '', category: '' });
  const [nowPageNum, setNowPageNum] = useState<number>(1);
  return <div></div>;
};

export default ListSearchPage;
