import React, { ReactNode } from 'react';
import Image from 'next/image';
type Props = {
  imgAlt: string;
  title: string;
  isReverse: boolean;
  children: ReactNode;
};
const TutorialBlock = ({
  imgAlt,
  title,
  isReverse = false,
  children,
}: Props) => {
  return (
    <section
      className={`flex ${
        isReverse ? ' flex-row-reverse bg-blue-400' : 'flex-row bg-blue-200'
      } items-center justify-center py-48 max-lg:py-36  rounded-xl max-lg:flex-col gap-48 max-lg:gap-24`}
    >
      <Image
        src={`/img/${imgAlt}.png`}
        alt={imgAlt}
        width={500}
        height={500}
        className='w-1/3 max-lg:w-full max-lg:p-8'
      />

      <div className='flex flex-col w-1/3 gap-8 max-lg:w-full max-lg:p-8'>
        <h2 className='font-sans text-5xl font-semibold text-center text-black max-lg:text-3xl'>
          {title}
        </h2>
        <h3 className='font-sans text-xl font-normal text-center text-black max-lg:text-lg'>
          {children}
        </h3>
      </div>
    </section>
  );
};

export default TutorialBlock;
