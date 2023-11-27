import Link from 'next/link';
import React from 'react';

const HomeSideBarBtn = ({ url, children }) => {
  return (
    <li className='flex flex-row hover:opacity-70 hover:bg-gray-300'>
      <Link
        href={url}
        className='flex-1 px-6 py-6 font-sans text-2xl font-semibold'
      >
        {children}
      </Link>
    </li>
  );
};

export default HomeSideBarBtn;
