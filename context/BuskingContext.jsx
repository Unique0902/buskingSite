import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';

const BuskingContext = createContext();

export function BuskingContextProvider({ buskingRepository, children }) {
  const [buskingData, setBuskingData] = useState(null);
  const { uid } = useAuthContext();

  useEffect(() => {
    if (!uid) {
      return;
    }
    buskingRepository.syncBuskingData(uid, (buskingData) => {
      setBuskingData(buskingData ? buskingData : null);
    });
  }, [uid]);

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

  const syncBuskingData = (userId) => {
    buskingRepository.syncBuskingData(userId);
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
