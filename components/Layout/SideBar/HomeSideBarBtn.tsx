import React, { ReactNode } from 'react';

import Link from 'next/link';
type Props = {
  url: string;
  children: ReactNode;
};
const HomeSideBarBtn = ({ url, children }: Props) => {
  return (
    <li className='flex flex-row hover:opacity-70 hover:bg-gray-300'>
      <Link href={url} className='flex-1 px-6 py-6 text-2xl font-semibold'>
        {children}
      </Link>
    </li>
  );
};

export default HomeSideBarBtn;
