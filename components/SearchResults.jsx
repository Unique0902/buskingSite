import React from 'react';
import SearchResult from './SearchResult';

const SearchResults = ({
  isSearch,
  results,
  pageNum,
  btnText,
  onSongClick,
}) => {
  if (isSearch) {
    return (
      <>
        {results &&
          results.map((result) => (
            <SearchResult
              key={results.indexOf(result)}
              index={results.indexOf(result) + 1 + (pageNum - 1) * 6}
              result={result}
              btnText={btnText}
              onSongClick={onSongClick}
            />
          ))}
      </>
    );
  } else {
    return (
      <>
        {results &&
          results
            .slice((pageNum - 1) * 6, pageNum * 6)
            .map((result) => (
              <SearchResult
                key={results.indexOf(result)}
                index={results.indexOf(result) + 1}
                result={result}
                btnText={btnText}
                onSongClick={onSongClick}
              />
            ))}
      </>
    );
  }
};

export default SearchResults;
