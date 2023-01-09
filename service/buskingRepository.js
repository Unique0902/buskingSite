import { database } from './firebase';
import { onValue, ref, remove, set } from 'firebase/database';

class BuskingRepository {
  syncBuskingData = (userId, onUpdate) => {
    const listRef = ref(database, `buskings/${userId}/`);
    onValue(listRef, (snapshot) => {
      const value = snapshot.val();
      onUpdate(value);
    });
  };

  makeBusking = async (userId, buskingInform, onUpdate) => {
    const listRef = ref(database, `buskings/${userId}/`);
    const buskingData = { id: Date.now(), ...buskingInform };
    await set(listRef, buskingData);
    onUpdate();
  };
  removeBusking = async (userId, onUpdate) => {
    const listRef = ref(database, `buskings/${userId}/`);
    await remove(listRef);
    onUpdate();
  };
  removeBuskingSong(userId, sid, onUpdate) {
    const listRef = ref(database, `buskings/${userId}/appliance/${sid}`);
    remove(listRef);
    onUpdate();
  }
  applyNewBuskingSong(userId, title, artist, sid, ip, onUpdate) {
    const listRef = ref(database, `buskings/${userId}/appliance/${sid}`);
    const song = {
      artist,
      sid: sid,
      title,
      cnt: 1,
      id: Date.now(),
      applicants: [{ ip }],
    };
    set(listRef, song);
    onUpdate();
  }
  applyBuskingSongAgain(userId, songObj, sid, onUpdate) {
    const listRef = ref(database, `buskings/${userId}/appliance/${sid}`);
    set(listRef, songObj);
    onUpdate();
  }
  applyOldBuskingSong(userId, sid, ip, cnt, applicants, onUpdate) {
    const listRef = ref(database, `buskings/${userId}/appliance/${sid}/cnt`);
    const newCnt = cnt + 1;
    set(listRef, newCnt);
    const listRef2 = ref(
      database,
      `buskings/${userId}/appliance/${sid}/applicants`
    );
    const newApplicants = [{ ip }, ...applicants];
    set(listRef2, newApplicants);
    onUpdate();
  }
}

export default BuskingRepository;
