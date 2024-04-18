import { useQuery } from '@tanstack/react-query';

import { IpServiceObj } from '../service/ipService';

const useIpData = (userId: string | undefined) => {
  const ipService = IpServiceObj;
  return useQuery({
    queryKey: ['ipService'],
    queryFn: () => ipService.getIp(),
    enabled: !!userId,
  });
};
export default useIpData;
