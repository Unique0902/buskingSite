import {
  nameSearchWordCategories,
  songSearchWordCategories,
} from '../data/CategoryTypes';

//SearchWord 타입 전역선언하기 할때 카테고리는 선택받을수있게 의존성 외부에서 주입받게 만들기 <해결
export type SearchWord = {
  name: string;
  category: SearchWordCategoryType;
};

export type SearchWordCategoryType = (typeof songSearchWordCategories)[number];

export type NameSearchWord = {
  name: string;
  category: NameSearchWordCategoryType;
};
export type NameSearchWordCategoryType =
  (typeof nameSearchWordCategories)[number];
