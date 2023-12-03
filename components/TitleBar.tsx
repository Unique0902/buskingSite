import React from 'react';

type Props = {
  text: string;
};

const TitleBar = ({ text }: Props) => {
  return (
    <section className='pb-6 text-center border-b border-blue-500 dark:border-slate-400 max-lg:pb-0 max-lg:border-b-0'>
      <h1 className='text-3xl font-semibold text-white max-lg:text-3xl'>
        {text}
      </h1>
    </section>
  );
};

export default TitleBar;
