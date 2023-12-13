import { createContext, ReactNode, useContext } from 'react';

import { UseQueryResult } from '@tanstack/react-query';
import { Unsubscribe } from 'firebase/auth';

import { useAuthContext } from './AuthContext';
import { useUserDataContext } from './UserDataContext';
import useSyncQuery from '../hooks/useSyncData';
import BuskingRepository from '../service/buskingRepository';
import {
  ApplianceData,
  BuskingData,
  BuskingInform,
} from '../store/type/busking';

type ContextProps = {
  buskingQueryResult: UseQueryResult<BuskingData, Error>;
  makeBusking: (
    buskingInform: BuskingInform,
    uid: string | undefined
  ) => Promise<void>;
  removeBuskingSong: (sid: string, uid: string | undefined) => Promise<void>;
  removeBusking: (uid: string | undefined) => Promise<void>;
  applyOldBuskingSong: (
    userId: string,
    sid: string,
    ip: string,
    applianceData: ApplianceData
  ) => Promise<void>;
  applyNewBuskingSong: (
    userId: string,
    title: string,
    artist: string,
    sid: string,
    ip: string
  ) => Promise<void>;
  syncBuskingData: (
    userId: string,
    onUpdate: (value: BuskingData | null) => void
  ) => Unsubscribe;
  getBuskingData: (userId: string) => Promise<BuskingData | null>;
  applyBuskingSongAgain: (nowSong: ApplianceData) => Promise<void>;
};

const BuskingContext = createContext<ContextProps>({} as ContextProps);

type Props = {
  buskingRepository: BuskingRepository;
  children: ReactNode;
};

export function BuskingContextProvider({ buskingRepository, children }: Props) {
  // useState 초기값 안넣으면 undefined 되는거 생각하기
  const { uid } = useAuthContext();
  const { userData } = useUserDataContext();

  //TODO: 자꾸 fetching이 뜨는데 해결하기 busking에서만 sync하게 변경하기 makeBusking에서는 revalidate로 makebusking하면될듯
  const buskingQueryResult = useSyncQuery<BuskingData>(
    uid as string,
    { queryKey: ['buskingData'], enabled: !!uid && !!userData },
    buskingRepository.syncBuskingData
  );

  const makeBusking = async (
    buskingInform: BuskingInform,
    uid: string | undefined
  ) => {
    if (!uid) throw new Error('no uid!!');
    return buskingRepository.makeBusking(uid, buskingInform);
  };

  const removeBuskingSong = async (sid: string, uid: string | undefined) => {
    if (!uid) throw new Error('no uid!!');
    return buskingRepository.removeBuskingSong(uid, sid);
  };

  const removeBusking = async (uid: string | undefined) => {
    if (!uid) throw new Error('no uid!!');
    return buskingRepository.removeBusking(uid);
  };
  const applyOldBuskingSong = async (
    userId: string,
    sid: string,
    ip: string,
    applianceData: ApplianceData
  ) => {
    return buskingRepository.applyOldBuskingSong(
      userId,
      sid,
      ip,
      applianceData
    );
  };

  const applyBuskingSongAgain = async (nowSong: ApplianceData) => {
    if (!uid) throw new Error('no uid!!');
    return buskingRepository.applyBuskingSongAgain(uid, nowSong, nowSong.sid);
  };

  const applyNewBuskingSong = async (
    userId: string,
    title: string,
    artist: string,
    sid: string,
    ip: string
  ) => {
    return buskingRepository.applyNewBuskingSong(
      userId,
      title,
      artist,
      sid,
      ip
    );
  };

  const syncBuskingData = (
    userId: string,
    onUpdate: (value: BuskingData | null) => void
  ) => {
    return buskingRepository.syncBuskingData(userId, onUpdate);
  };

  const getBuskingData = async (userId: string) => {
    return buskingRepository.getBuskingData(userId);
  };

  return (
    <BuskingContext.Provider
      value={{
        buskingQueryResult,
        makeBusking,
        removeBuskingSong,
        removeBusking,
        applyOldBuskingSong,
        applyNewBuskingSong,
        syncBuskingData,
        getBuskingData,
        applyBuskingSongAgain,
      }}
    >
      {children}
    </BuskingContext.Provider>
  );
}

export function useBuskingContext() {
  return useContext(BuskingContext);
}
