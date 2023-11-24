import React from 'react';
import Result from './Result';

const Results = ({ results, pageNum, btnText, onSongClick }) => {
  return (
    <>
      {results &&
        results.map((result) => (
          <Result
            key={results.indexOf(result)}
            index={results.indexOf(result) + 1 + (pageNum - 1) * 6}
            result={result}
            btnText={btnText}
            onSongClick={onSongClick}
          />
        ))}
    </>
  );
};

export default Results;
