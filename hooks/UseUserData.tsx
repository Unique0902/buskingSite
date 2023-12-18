import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import UserRepository from '../service/userRepository';

const userRepository = new UserRepository();

export function useUserData(uid: string | undefined) {
  const queryClient = useQueryClient();

  const userDataQuery = useQuery({
    queryKey: [uid, 'userData'],
    queryFn: () => {
      return userRepository.getUserData(uid as string);
    },
    staleTime: 60 * 1000 * 2,
    enabled: !!uid,
  });

  const userDataMutation = useMutation({
    mutationFn: ({
      mutationFunction,
    }: {
      mutationFunction: () => Promise<void>;
    }) => mutationFunction(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [uid, 'userData'],
      });
    },
  });

  //syncUserData는 이후에 useSyncData를 이용하는걸로

  const removeUserData = (userId: string) => {
    userDataMutation.mutate({
      mutationFunction: () => userRepository.removeUser(userId),
    });
  };
  const makeUserData = (userId: string, name: string) => {
    userDataMutation.mutate({
      mutationFunction: () => userRepository.makeUser(userId, name),
    });
  };
  // 유저 데이터가 서버에 만들어졌을때 응답 받을수있게, setUserData할수있게
  return { userDataQuery, removeUserData, makeUserData };
}
