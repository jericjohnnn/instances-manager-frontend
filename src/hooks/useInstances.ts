import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { 
  getInstances, 
  type InstanceQueryParams, 
} from '@/api/instanceApi';

// export const useInstances = () => {
//   const [page, setPage] = useState(1)

//   const query = useQuery({
//     queryKey: ['instances', page],
//     queryFn: () => getInstances(page),
//     placeholderData: keepPreviousData,
//   })

//   return {
//     ...query,
//     page,
//     setPage,
//   }
// }

export const useInstances = (params: InstanceQueryParams) => {
  return useQuery({
    queryKey: ['instances', params],
    queryFn: () => getInstances(params),
    placeholderData: keepPreviousData,
  });
};



// export const useInstance = (id: number) => {
//   return useQuery<Instance, Error>({
//     queryKey: ['instance', id],
//     queryFn: () => getInstance(id),
//     enabled: !!id, // prevents query from running if id is undefined
//   });
// };

// export const useCreateInstance = () => {
//   const queryClient = useQueryClient();

//   return useMutation<Instance, Error, InstancePayload>({
//     mutationFn: createInstance,
//     onSuccess: () => {
//       // Invalidate instance list so UI updates automatically
//       queryClient.invalidateQueries({ queryKey: ['instances'] });
//     },
//   });
// };
