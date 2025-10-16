import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getInstances, 
  getInstance, 
  createInstance, 
  type Instance, 
  type InstancePayload 
} from '@/api/instanceApi';

export const useInstances = () => {
  return useQuery<Instance[], Error>({
    queryKey: ['instances'],
    queryFn: getInstances,
  });
};

export const useInstance = (id: number) => {
  return useQuery<Instance, Error>({
    queryKey: ['instance', id],
    queryFn: () => getInstance(id),
    enabled: !!id, // prevents query from running if id is undefined
  });
};

export const useCreateInstance = () => {
  const queryClient = useQueryClient();

  return useMutation<Instance, Error, InstancePayload>({
    mutationFn: createInstance,
    onSuccess: () => {
      // Invalidate instance list so UI updates automatically
      queryClient.invalidateQueries({ queryKey: ['instances'] });
    },
  });
};
