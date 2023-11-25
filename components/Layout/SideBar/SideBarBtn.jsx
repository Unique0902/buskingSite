import Link from 'next/link';
import React from 'react';

export default function SideBarBtn({
  name,
  selectedBtn,
  isHide,
  text,
  children,
}) {
  const btnStyle =
    'text-white flex items-center pl-5 py-4 font-sans w-full text-left cursor-pointer font-medium text-lg hover:bg-zinc-600 ';
  const hideBtnStyle =
    'text-white flex items-center py-4 font-sans w-full cursor-pointer font-medium text-lg hover:bg-zinc-600 justify-center';
  return (
    <Link
      href={`/app/${name}`}
      className={`${isHide ? hideBtnStyle : btnStyle} ${
        selectedBtn === name ? 'text-blue-400' : 'text-white'
      } `}
    >
      {React.cloneElement(children, {
        color: `${selectedBtn === name ? '#60a5fa' : 'white'}`,
      })}
      {!isHide && text}
    </Link>
  );
}
