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
  buskingData: BuskingData | undefined;
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
    onUpdate: (value: BuskingData | undefined) => void
  ) => Unsubscribe;
  getBuskingData: (userId: string) => Promise<BuskingData>;
  isbuskingDataLoading: boolean;
  applyBuskingSongAgain: (nowSong: ApplianceData) => Promise<void>;
};

const BuskingContext = createContext<ContextProps>(undefined);

type Props = {
  buskingRepository: BuskingRepository;
  children: ReactNode;
};

export function BuskingContextProvider({ buskingRepository, children }: Props) {
  const [buskingData, setBuskingData] = useState<BuskingData | undefined>();
  const { uid } = useAuthContext();
  const { userData } = useUserDataContext();
  const [isbuskingDataLoading, setIsbuskingDataLoading] =
    useState<boolean>(true);
  useEffect(() => {
    setIsbuskingDataLoading(true);
    return buskingRepository.syncBuskingData(uid, (data) => {
      setBuskingData(data);
      setIsbuskingDataLoading(false);
    });
  }, [uid, userData]);

  const makeBusking = async (buskingInform: BuskingInform) => {
    return buskingRepository.makeBusking(uid, buskingInform);
  };

  const removeBuskingSong = async (sid: string) => {
    return buskingRepository.removeBuskingSong(uid, sid);
  };

  const removeBusking = async () => {
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
    onUpdate: (value: BuskingData | undefined) => void
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
