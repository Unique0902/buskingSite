export type UserData = {
  date: string;
  name: string;
};
export type UserDataObj = {
  [userId: string]: UserData;
};

export type UserDataEntries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type UserDataEntriy<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];
