import { useEffect } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Unsubscribe } from 'firebase/database';

function useSyncQuery<Data>(
  userId: string,
  queryKey: string[],
  syncData: (
    userId: string,
    onUpdate: (value: Data | null) => void
  ) => Unsubscribe
) {
  const queryClient = useQueryClient();

  useEffect(() => {
    return syncData(userId, (val) => {
      queryClient.setQueryData(queryKey, val);
    });
  }, [queryClient, syncData, queryKey, userId]);

  return useQuery<Data, Error>({
    queryKey,
    queryFn: () => new Promise<Data>(() => {}),
  });
}

export default useSyncQuery;
