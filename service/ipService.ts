import { IpData } from '../store/type/ip';

class IpService {
  async getIp(): Promise<string> {
    try {
      const ipData = await fetch('https://geolocation-db.com/json/');
      const locationIp: IpData = await ipData.json();
      return locationIp.IPv4;
    } catch (error) {
      console.error(error);
    }
  }
  async logIp() {
    const ipData = await fetch('https://geolocation-db.com/json/');
    const locationIp = await ipData.json();
    console.log(locationIp.IPv4);
  }
}

export default IpService;
