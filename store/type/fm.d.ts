export type FmTrackSearchData = {
  'opensearch:itemsPerPage': string;
  'opensearch:startIndex': string;
  'opensearch:totalResults': string;
  trackmatches: { track: FmTrackData[] };
};

export type FmTrackData = {
  artist: string;
  listeners: string;
  name: string;
  mbid: string;
  url: string;
};

export type FmTopTracksSearchData = {
  '@attr': {
    page: string;
    perPage: string;
    total: string;
    totalPages: string;
  };
  track: FmTopTrackData[];
};
export type FmTopTrackData = {
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
  listeners: string;
  name: string;
  mbid: string;
  url: string;
  playcount: string;
};
export type FmEditedTopTrackData = {
  artist: string;
  listeners: string;
  name: string;
  mbid: string;
  url: string;
  playcount: string;
};
