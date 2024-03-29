import { get, onValue, ref, remove, set } from 'firebase/database';

import { database } from './firebase';
import { UserData } from '../store/type/userData';

class UserRepository {
  syncUserData(userId: string, onUpdate: (value: UserData | null) => void) {
    const listRef = ref(database, `users/${userId}`);
    return onValue(listRef, (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
  }
  getUserData = async (userId: string): Promise<UserData | null> => {
    const listRef = ref(database, `users/${userId}/`);

    return get(listRef).then((snapshot) => {
      const items = snapshot.val() || null;
      return items;
    });
  };

  makeUser = async (userId: string, name: string): Promise<void> => {
    const userData = await this.getUserData(userId);
    if (!userData) {
      const listRef = ref(database, `users/${userId}/`);
      const userData = { name, date: new Date().toString() };
      return set(listRef, userData);
    } else {
      throw new Error('already userData exists!');
    }
  };
  removeUser = async (userId: string) => {
    const listRef = ref(database, `users/${userId}`);
    return await remove(listRef);
  };
}

export default UserRepository;
