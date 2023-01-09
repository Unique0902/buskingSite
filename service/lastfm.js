class Lastfm {
  constructor(httpClient) {
    this.lastfm = httpClient;
  }
  async searchSongByName(title, pageNum) {
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
  async searchSongByArtist(artist, pageNum) {
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
  async searchArtist(artist) {
    const response = await this.lastfm.get('', {
      params: {
        method: 'artist.search',
        artist: artist,
        format: 'json',
      },
    });
    return response.data.results;
  }
  async searchTopTrackByCorrectArtist(mbid) {
    const response = await this.lastfm.get('', {
      params: {
        method: 'artist.gettoptrack',
        mbid: mbid,
        format: 'json',
      },
    });
    return response.data.results;
  }
  async getTopTracks(pageNum) {
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
