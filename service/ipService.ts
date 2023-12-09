import axios from 'axios';

import { IpData } from '../store/type/ip';
//fetch를 axios로 대체해보겠다
class IpService {
  async getIp(): Promise<string | undefined> {
    const ipData = await axios('https://geolocation-db.com/json/');
    const locationIp: IpData = ipData.data;
    return locationIp.IPv4;
  }
  async logIp() {
    const ipData = await axios('https://geolocation-db.com/json/');
    const locationIp = ipData.data;
    console.log(locationIp.IPv4);
  }
}

export default IpService;
const IpServiceObj = new IpService();
export { IpServiceObj };
