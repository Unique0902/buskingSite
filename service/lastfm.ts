import { FmTopTracksSearchData, FmTrackSearchData } from './../store/type/fm.d';
import { AxiosInstance } from 'axios';

class Lastfm {
  lastfm: AxiosInstance;
  constructor(httpClient: AxiosInstance) {
    this.lastfm = httpClient;
  }

  async searchSongByName(
    title: string,
    pageNum: number
  ): Promise<FmTrackSearchData> {
    const response = await this.lastfm.get('', {
      params: {
        method: 'track.search',
        track: title,
        page: pageNum,
        limit: '6',
        format: 'json',
      },
    });
    return response.data.results;
  }
  async searchSongByArtist(
    artist: string,
    pageNum: number
  ): Promise<FmTrackSearchData> {
    const response = await this.lastfm.get('', {
      params: {
        method: 'track.search',
        track: ' ',
        artist: artist,
        page: pageNum,
        limit: '6',
        format: 'json',
      },
    });
    return response.data.results;
  }
  async searchArtist(artist: string) {
    const response = await this.lastfm.get('', {
      params: {
        method: 'artist.search',
        artist: artist,
        format: 'json',
      },
    });
    return response.data.results;
  }
  async searchTopTrackByCorrectArtist(mbid: string) {
    const response = await this.lastfm.get('', {
      params: {
        method: 'artist.gettoptrack',
        mbid: mbid,
        format: 'json',
      },
    });
    return response.data.results;
  }
  async getTopTracks(pageNum: number): Promise<FmTopTracksSearchData> {
    const response = await this.lastfm.get('', {
      params: {
        method: 'chart.gettoptracks',
        format: 'json',
        page: pageNum,
        limit: '6',
      },
    });
    return response.data.tracks;
  }
}

export default Lastfm;
