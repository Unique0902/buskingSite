import { onValue, ref, remove, set, get } from 'firebase/database';

import {
  ApplianceData,
  BuskingData,
  BuskingInform,
} from './../store/type/busking.d';
import { database } from './firebase';

class BuskingRepository {
  syncBuskingData = (
    userId: string,
    onUpdate: (value: BuskingData | null) => void
  ) => {
    const listRef = ref(database, `buskings/${userId}/`);
    return onValue(listRef, (snapshot) => {
      const value: BuskingData | null = snapshot.val();

      onUpdate(value);
    });
  };

  getBuskingData = async (userId: string) => {
    const listRef = ref(database, `buskings/${userId}/`);
    return get(listRef).then((snapshot) => {
      const items: BuskingData | null = snapshot.val();
      return items;
    });
  };

  makeBusking = async (userId: string, buskingInform: BuskingInform) => {
    const listRef = ref(database, `buskings/${userId}/`);
    const buskingData: BuskingData = {
      id: Date.now().toString(),
      ...buskingInform,
    };
    return set(listRef, buskingData);
  };
  removeBusking = async (userId: string) => {
    const listRef = ref(database, `buskings/${userId}/`);
    return remove(listRef);
  };
  removeBuskingSong = async (userId: string, sid: string) => {
    const listRef = ref(database, `buskings/${userId}/appliance/${sid}`);
    return remove(listRef);
  };
  applyNewBuskingSong = async (
    userId: string,
    title: string,
    artist: string,
    sid: string,
    ip: string
  ) => {
    const listRef = ref(database, `buskings/${userId}/appliance/${sid}`);
    const song = {
      artist,
      sid: sid,
      title,
      cnt: 1,
      id: Date.now(),
      applicants: [{ ip }],
    };
    return set(listRef, song);
  };
  applyBuskingSongAgain = async (
    userId: string,
    songObj: ApplianceData,
    sid: string
  ) => {
    const listRef = ref(database, `buskings/${userId}/appliance/${sid}`);
    return set(listRef, songObj);
  };

  applyOldBuskingSong = async (
    userId: string,
    sid: string,
    ip: string,
    applianceData: ApplianceData
  ) => {
    const listRef = ref(database, `buskings/${userId}/appliance/${sid}`);
    const editedApplianceData = {
      ...applianceData,
      cnt: applianceData.cnt + 1,
      applicants: [{ ip }, ...applianceData.applicants],
    };
    return await set(listRef, editedApplianceData);
  };
}

export default BuskingRepository;
