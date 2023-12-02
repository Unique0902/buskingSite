import { ApplianceData } from './../store/type/busking.d';
import { database } from './firebase';
import { onValue, ref, remove, set, get } from 'firebase/database';
import {
  ApplicantData,
  BuskingData,
  BuskingInform,
} from '../store/type/busking';

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
  //TODO:통신한번만하게 나중에 수정
  applyOldBuskingSong = async (
    userId: string,
    sid: string,
    ip: string,
    cnt: number,
    applicants: ApplicantData[]
  ) => {
    const listRef = ref(database, `buskings/${userId}/appliance/${sid}/cnt`);
    const newCnt = cnt + 1;
    await set(listRef, newCnt);
    const listRef2 = ref(
      database,
      `buskings/${userId}/appliance/${sid}/applicants`
    );
    const newApplicants = [{ ip }, ...applicants];
    return set(listRef2, newApplicants);
  };
}

export default BuskingRepository;
