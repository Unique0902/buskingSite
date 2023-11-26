import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';
import { useUserDataContext } from './UserDataContext';

const BuskingContext = createContext();

export function BuskingContextProvider({ buskingRepository, children }) {
  const [buskingData, setBuskingData] = useState();
  const { uid } = useAuthContext();
  const { userData } = useUserDataContext();

  useEffect(() => {
    if (!uid || !userData) {
      return;
    }
    return buskingRepository.syncBuskingData(uid, (data) => {
      setBuskingData(data);
    });
  }, [uid, userData]);

  const makeBusking = async (buskingInform) => {
    return buskingRepository.makeBusking(uid, buskingInform);
  };

  const applyBuskingSongAgain = async (nowSong) => {
    return buskingRepository.applyBuskingSongAgain(uid, nowSong, nowSong.sid);
  };

  const removeBuskingSong = async (sid) => {
    return buskingRepository.removeBuskingSong(uid, sid);
  };

  const removeBusking = async () => {
    return buskingRepository.removeBusking(uid);
  };
  const applyOldBuskingSong = async (userId, sid, ip, cnt, applicants) => {
    return buskingRepository.applyOldBuskingSong(
      userId,
      sid,
      ip,
      cnt,
      applicants
    );
  };

  const applyNewBuskingSong = async (userId, title, artist, sid, ip) => {
    return buskingRepository.applyNewBuskingSong(
      userId,
      title,
      artist,
      sid,
      ip
    );
  };

  const syncBuskingData = (userId, onUpdate) => {
    return buskingRepository.syncBuskingData(userId, onUpdate);
  };

  const getBuskingData = async (userId) => {
    return buskingRepository.getBuskingData(userId);
  };

  return (
    <BuskingContext.Provider
      value={{
        buskingData,
        makeBusking,
        applyBuskingSongAgain,
        removeBuskingSong,
        removeBusking,
        applyOldBuskingSong,
        applyNewBuskingSong,
        syncBuskingData,
        getBuskingData,
      }}
    >
      {children}
    </BuskingContext.Provider>
  );
}

export function useBuskingContext() {
  return useContext(BuskingContext);
}
