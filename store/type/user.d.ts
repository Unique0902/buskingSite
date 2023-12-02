export type User = {
  accessToken: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: UserMetaData;
  phoneNumber: string | null;
  photoURL: string;
  providerId: string;
  uid: string;
};

type UserMetaData = {
  createdAt: string;
  creationTime: string;
  lastLoginAt: string;
  lastSignInTime: string;
};
