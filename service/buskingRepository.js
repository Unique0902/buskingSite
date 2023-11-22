import { database } from './firebase';
import { onValue, ref, remove, set, get } from 'firebase/database';

class BuskingRepository {
  syncBuskingData = (userId, onUpdate) => {
    const listRef = ref(database, `buskings/${userId}/`);
    return onValue(listRef, (snapshot) => {
      const value = snapshot.val();
      onUpdate(value);
    });
  };

  getBuskingData = async (userId) => {
    const listRef = ref(database, `buskings/${userId}/`);
    return get(listRef).then((snapshot) => {
      const items = snapshot.val();
      return items;
    });
  };

  makeBusking = async (userId, buskingInform) => {
    const listRef = ref(database, `buskings/${userId}/`);
    const buskingData = { id: Date.now(), ...buskingInform };
    return set(listRef, buskingData);
  };
  removeBusking = async (userId) => {
    const listRef = ref(database, `buskings/${userId}/`);
    return remove(listRef);
  };
  removeBuskingSong = async (userId, sid) => {
    const listRef = ref(database, `buskings/${userId}/appliance/${sid}`);
    return remove(listRef);
  };
  applyNewBuskingSong = async (userId, title, artist, sid, ip) => {
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
  applyBuskingSongAgain = async (userId, songObj, sid) => {
    const listRef = ref(database, `buskings/${userId}/appliance/${sid}`);
    return set(listRef, songObj);
  };
  applyOldBuskingSong = async (userId, sid, ip, cnt, applicants) => {
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
