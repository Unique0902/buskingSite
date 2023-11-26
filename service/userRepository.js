import { database } from './firebase';
import { get, onValue, ref, remove, set } from 'firebase/database';

class UserRepository {
  syncUserData(userId, onUpdate) {
    const listRef = ref(database, `users/${userId}`);
    onValue(listRef, (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
  }
  getUserData = async (userId) => {
    const listRef = ref(database, `users/${userId}/`);
    return get(listRef).then((snapshot) => {
      const items = snapshot.val() || null;
      return items;
    });
  };

  makeUser = async (userId, name) => {
    const userData = await this.getUserData(userId);
    if (!userData) {
      const listRef = ref(database, `users/${userId}/`);
      const userData = { name, date: Date() };
      await set(listRef, userData);
      return userData;
    } else {
      throw new Error('already userData exists!');
    }
  };
  removeUser = async (userId) => {
    const listRef = ref(database, `users/${userId}`);
    return await remove(listRef);
  };
}

export default UserRepository;
