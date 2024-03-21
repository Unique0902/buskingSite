export type UserData = {
  date: string;
  name: string;
  id: string;
};

export type UserDataObjItem = {
  date: string;
  name: string;
};
export type UserDataObj = {
  [userId: string]: UserDataObjItem;
};

export type UserDataEntries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type UserDataEntriy<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];
