export type BuskingData = {
  id: string;
  maxNum: number;
  name: string;
  playlistId: string;
  appliance?: ApplianceObjects;
};

type ApplianceObjects = {
  [key: string]: ApplianceData;
};

type ApplianceData = {
  artist: string;
  cnt: number;
  id: string;
  sid: string;
  title: string;
  applicants: ApplicantData[];
};

export type ApplicantData = {
  ip: string;
};

export type BuskingInform = {
  maxNum: number;
  name: string;
  playlistId: string;
};
