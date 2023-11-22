import { database } from './firebase';
import { onValue, ref, remove, set } from 'firebase/database';
import { async } from '@firebase/util';

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
      const items = snapshot.val() || {};
      return items;
    });
  };
  checkUser(userId, onUpdate) {
    const listRef = ref(database, `users/${userId}`);
    onValue(listRef, (snapshot) => {
      const value = snapshot.val();
      onUpdate(!!value);
    });
  }
  makeUser = (userId, name, onUpdate) => {
    this.checkUser(userId, (userData) => {
      if (!userData) {
        const listRef = ref(database, `users/${userId}/`);
        const userData = { name, date: Date() };
        set(listRef, userData);
        onUpdate();
      }
    });
  };
  removeUser = async (userId, onUpdate) => {
    const listRef = ref(database, `users/${userId}`);
    await remove(listRef);
    onUpdate();
  };
}

export default UserRepository;
