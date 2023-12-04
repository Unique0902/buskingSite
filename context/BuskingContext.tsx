import { Unsubscribe } from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import BuskingRepository from '../service/buskingRepository';
import {
  ApplianceData,
  ApplicantData,
  BuskingData,
  BuskingInform,
} from '../store/type/busking';
import { useAuthContext } from './AuthContext';
import { useUserDataContext } from './UserDataContext';

type ContextProps = {
  buskingData: BuskingData | null;
  makeBusking: (buskingInform: BuskingInform) => Promise<void>;
  removeBuskingSong: (sid: string) => Promise<void>;
  removeBusking: () => Promise<void>;
  applyOldBuskingSong: (
    userId: string,
    sid: string,
    ip: string,
    cnt: number,
    applicants: ApplicantData[]
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
  isbuskingDataLoading: boolean;
  applyBuskingSongAgain: (nowSong: ApplianceData) => Promise<void>;
};

const BuskingContext = createContext<ContextProps>({} as ContextProps);

type Props = {
  buskingRepository: BuskingRepository;
  children: ReactNode;
};

export function BuskingContextProvider({ buskingRepository, children }: Props) {
  // useState 초기값 안넣으면 undefined 되는거 생각하기
  const [buskingData, setBuskingData] = useState<BuskingData | null>(null);
  const { uid } = useAuthContext();
  const { userData } = useUserDataContext();
  const [isbuskingDataLoading, setIsbuskingDataLoading] =
    useState<boolean>(true);
  useEffect(() => {
    if (!uid) throw new Error('no uid!!');
    setIsbuskingDataLoading(true);
    return buskingRepository.syncBuskingData(uid, (data) => {
      setBuskingData(data);
      setIsbuskingDataLoading(false);
    });
  }, [uid, userData]);

  //TODO: uid 어디서 받아와야하는지 고민해보기
  const makeBusking = async (buskingInform: BuskingInform) => {
    if (!uid) throw new Error('no uid!!');
    return buskingRepository.makeBusking(uid, buskingInform);
  };

  const removeBuskingSong = async (sid: string) => {
    if (!uid) throw new Error('no uid!!');
    return buskingRepository.removeBuskingSong(uid, sid);
  };

  const removeBusking = async () => {
    if (!uid) throw new Error('no uid!!');
    return buskingRepository.removeBusking(uid);
  };
  const applyOldBuskingSong = async (
    userId: string,
    sid: string,
    ip: string,
    cnt: number,
    applicants: ApplicantData[]
  ) => {
    return buskingRepository.applyOldBuskingSong(
      userId,
      sid,
      ip,
      cnt,
      applicants
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
        buskingData,
        makeBusking,
        removeBuskingSong,
        removeBusking,
        applyOldBuskingSong,
        applyNewBuskingSong,
        syncBuskingData,
        getBuskingData,
        isbuskingDataLoading,
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
