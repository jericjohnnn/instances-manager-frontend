import { useQuery } from '@tanstack/react-query';
import { getInstances, type Instance } from '@/api/instanceApi';

export const useInstances = () => {
  return useQuery<Instance[], Error>({
    queryKey: ['instances'],
    queryFn: getInstances,
  });
};
