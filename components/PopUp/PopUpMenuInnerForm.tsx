import React, { useState } from 'react';

interface Props {
  inputValue: string;
  handleSubmit: (inputText: string) => void;
  handleCancel: () => void;
}

const PopUpMenuInnerForm: React.FC<Props> = ({
  inputValue,
  handleSubmit,
  handleCancel,
}: Props) => {
  const [text, setText] = useState<string>(inputValue);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(text);
      }}
    >
      <div className='px-4 py-3 '>
        <input
          type='text'
          placeholder='Playlist Name'
          autoFocus
          className='px-4 py-3 text-lg font-normal text-black border-gray-800 border-solid border-1 rounded-xl'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className='flex flex-row'>
        <button
          className={`w-1/2 py-2 ${
            text && text.length <= 20
              ? 'text-black dark:text-white'
              : 'text-gray-300 dark:text-gray-800'
          } hover:bg-gray-200 text-lg font-medium`}
        >
          추가
        </button>
        <button
          className='w-1/2 py-2 text-lg font-medium hover:bg-gray-200'
          onClick={handleCancel}
          type='button'
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default PopUpMenuInnerForm;
