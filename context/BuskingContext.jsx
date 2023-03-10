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

  const makeBusking = (buskingInform, onUpdate) => {
    buskingRepository.makeBusking(uid, buskingInform, onUpdate);
  };

  const applyBuskingSongAgain = (nowSong, onUpdate) => {
    buskingRepository.applyBuskingSongAgain(
      uid,
      nowSong,
      nowSong.sid,
      onUpdate
    );
  };

  const removeBuskingSong = (sid, onUpdate) => {
    buskingRepository.removeBuskingSong(uid, sid, onUpdate);
  };

  const removeBusking = (onUpdate) => {
    buskingRepository.removeBusking(uid, onUpdate);
  };
  const applyOldBuskingSong = (userId, sid, ip, cnt, applicants, onUpdate) => {
    buskingRepository.applyOldBuskingSong(
      userId,
      sid,
      ip,
      cnt,
      applicants,
      onUpdate
    );
  };

  const applyNewBuskingSong = (userId, title, artist, sid, ip, onUpdate) => {
    buskingRepository.applyNewBuskingSong(
      userId,
      title,
      artist,
      sid,
      ip,
      onUpdate
    );
  };

  const syncBuskingData = (userId, onUpdate) => {
    buskingRepository.syncBuskingData(userId, onUpdate);
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
      }}
    >
      {children}
    </BuskingContext.Provider>
  );
}

export function useBuskingContext() {
  return useContext(BuskingContext);
}
