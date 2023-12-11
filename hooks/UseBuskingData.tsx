import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import BuskingRepository from '../service/buskingRepository';
import { ApplianceData } from '../store/type/busking';
import { UserData } from '../store/type/userData';

const buskingRepository = new BuskingRepository();

const useBuskingData = (
  userId: string | null,
  buskerData: UserData | null | undefined
) => {
  const buskingQueryResult = useQuery({
    queryKey: [userId, 'buskingData'],
    queryFn: () => buskingRepository.getBuskingData(userId as string),
    enabled: !!userId && !!buskerData,
  });

  const queryClient = useQueryClient();
  const buskingDataMutation = useMutation({
    mutationFn: ({
      mutationFunction,
    }: {
      mutationFunction: () => Promise<void>;
    }) => mutationFunction(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [userId, 'buskingData'],
      });
    },
  });

  const applyOldBuskingSong = (
    userId: string,
    sid: string,
    ip: string,
    applianceData: ApplianceData
  ) => {
    buskingDataMutation.mutate({
      mutationFunction: () =>
        buskingRepository.applyOldBuskingSong(userId, sid, ip, applianceData),
    });
  };

  const applyNewBuskingSong = (
    userId: string,
    title: string,
    artist: string,
    sid: string,
    ip: string
  ) => {
    buskingDataMutation.mutate({
      mutationFunction: () =>
        buskingRepository.applyNewBuskingSong(userId, title, artist, sid, ip),
    });
  };
  return { buskingQueryResult, applyOldBuskingSong, applyNewBuskingSong };
};

export default useBuskingData;
