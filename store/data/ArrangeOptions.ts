import { ApplianceData } from '../type/busking';
import { PlaylistSongData } from '../type/playlist';

export type ArrangeOption<T> = {
  name: string;
  arrangeFunc: (a: T, b: T) => number;
};

export const PlaylistSongDataArrangeOption: ArrangeOption<PlaylistSongData>[] =
  [
    {
      name: '제목 문자순 정렬',
      arrangeFunc: (a, b) => compareByTextWhenSort(a.title, b.title, true),
    },
    {
      name: '가수 문자순 정렬',
      arrangeFunc: (a, b) => compareByTextWhenSort(a.artist, b.artist, true),
    },
    {
      name: '시간순 정렬',
      arrangeFunc: (a, b) =>
        compareByNumberWhenSort(parseInt(a.id), parseInt(b.id), true),
    },
  ];

export const ApplianceDataArrangeOption: ArrangeOption<ApplianceData>[] = [
  {
    name: '제목 문자순 정렬',
    arrangeFunc: (a, b) => compareByTextWhenSort(a.title, b.title, true),
  },
  {
    name: '가수 문자순 정렬',
    arrangeFunc: (a, b) => compareByTextWhenSort(a.artist, b.artist, true),
  },
  {
    name: '시간순 정렬',
    arrangeFunc: (a, b) =>
      compareByNumberWhenSort(parseInt(a.id), parseInt(b.id), true),
  },
  {
    name: '신청자순 정렬',
    arrangeFunc: (a, b) => compareByNumberWhenSort(a.cnt, b.cnt, false),
  },
];

const compareByTextWhenSort = (a: string, b: string, isAscending: boolean) => {
  if (a.toLowerCase() > b.toLowerCase()) return isAscending ? 1 : -1;
  else if (a.toLowerCase() < b.toLowerCase()) return isAscending ? -1 : 1;
  else return 0;
};
const compareByNumberWhenSort = (a: number, b: number, isAscending: boolean) =>
  isAscending ? a - b : b - a;
