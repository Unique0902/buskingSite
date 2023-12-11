import { get, ref } from 'firebase/database';

import { database } from './firebase';
import { UserData, UserDataObj } from '../store/type/userData';

class UserDataRepository {
  getUserData = async (userId: string): Promise<UserData | null> => {
    const listRef = ref(database, `users/${userId}/`);
    return get(listRef).then((snapshot) => {
      const items = snapshot.val() || null;
      return items;
    });
  };
  getAllUserDatas = async (): Promise<UserDataObj> => {
    const listRef = ref(database, `users/`);
    return get(listRef).then((snapshot) => {
      const items = snapshot.val() || null;
      return items;
    });
  };
}

export default UserDataRepository;
