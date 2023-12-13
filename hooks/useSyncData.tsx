import { useEffect } from 'react';

import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { Unsubscribe } from 'firebase/database';

function useSyncQuery<Data>(
  userId: string,
  useQueryOptions: UseQueryOptions<Data>,
  syncData: (
    userId: string,
    onUpdate: (value: Data | null) => void
  ) => Unsubscribe
) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (userId) {
      return syncData(userId, (val) => {
        queryClient.setQueryData(useQueryOptions.queryKey, val);
      });
    }
  }, [userId]);
  return useQuery<Data, Error>({
    ...useQueryOptions,
    queryFn: () => new Promise<Data>(() => {}),
  });
}

export default useSyncQuery;
