import React from 'react';

const TitleBar = ({ text }) => {
  return (
    <section className='border-blue-500 border-b pb-6 max-lg:pb-0 max-lg:border-b-0 text-center'>
      <h1 className='font-sans text-white text-3xl font-semibold max-lg:text-3xl'>
        {text}
      </h1>
    </section>
  );
};

export default TitleBar;
