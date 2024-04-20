import { ApplianceData } from '../store/type/busking';
import { PlaylistSongData } from '../store/type/playlist';
import { NewSearchWord } from '../store/type/searchword';

export const sliceSongArrByNumPerPage = <T>(
  songArr: T[],
  numPerPage: number,
  pageNum: number
) => songArr.slice((pageNum - 1) * numPerPage, pageNum * numPerPage);

export const searchSong = <T extends PlaylistSongData | ApplianceData>(
  allDataArr: T[],
  { name, category }: NewSearchWord
) => {
  if (category === '제목')
    return allDataArr.filter((song) => song.title.toLowerCase().includes(name));
  else if (category === '가수')
    return allDataArr.filter((song) =>
      song.artist.toLowerCase().includes(name)
    );
  else throw new Error('not exist song searchWord category!');
};
