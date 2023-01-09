import React from 'react';

export default function ArrangeBtn({ type, onClick, text }) {
  const btnStyle =
    'font-sans text-black text-lg text-left py-1 px-4 hover:bg-gray-200';
  return (
    <button
      className={btnStyle}
      onClick={() => {
        onClick(type);
      }}
    >
      {text}
    </button>
  );
}
