import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  GithubAuthProvider,
  UserInfo,
} from 'firebase/auth';

import { firebaseApp } from './firebase';

class AuthService {
  login(providerName: string) {
    const authProvider = this.getProvider(providerName);
    return signInWithPopup(this.auth, authProvider);
  }
  auth = getAuth();
  user = this.auth.currentUser;
  firebase = firebaseApp;

  logout() {
    signOut(this.auth);
  }

  onAuthChange(onUserChanged: (user: UserInfo | null) => void) {
    onAuthStateChanged(this.auth, (user: UserInfo | null) => {
      onUserChanged(user);
    });
  }

  getProvider(providerName: string) {
    switch (providerName) {
      case 'Google':
        return new GoogleAuthProvider();
      case 'Github':
        return new GithubAuthProvider();
      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }
}

export default AuthService;
