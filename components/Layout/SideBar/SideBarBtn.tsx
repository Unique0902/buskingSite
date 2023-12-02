import Link from 'next/link';
import React, { ReactNode } from 'react';
type Props = {
  name: string;
  selectedBtn: string;
  isHide: boolean;
  text: string;
  children: ReactNode;
};
export default function SideBarBtn({
  name,
  selectedBtn,
  isHide,
  text,
  children,
}: Props) {
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
      {React.cloneElement(children as React.ReactElement<any>, {
        color: `${selectedBtn === name ? '#60a5fa' : 'white'}`,
      })}
      {!isHide && text}
    </Link>
  );
}
