import { axiosInstance } from '@/lib/axios';

export interface Instance {
  id: number;
  account: string;
  code: string;
  port: number;
  proxy_name: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface InstanceQueryParams {
  limit?: number;
  // offset?: number;
  page?: number;
  search?: string; // Add search parameter
  ordering?: string; // For sorting
}

// export interface InstancePayload {
//   account: string;
//   code: string;
//   port: number;
//   proxy_name: string;
// }

export async function getInstances(params: InstanceQueryParams): Promise<PaginatedResponse<Instance>> {
  const { data } = await axiosInstance.get<PaginatedResponse<Instance>>(`/instance/`,{ params });
  console.log('Fetched instances data:', data);
  return data;
}

// export async function getInstance(id: number): Promise<Instance> {
//   const { data } = await axiosInstance.get(`/instance/${id}/`);
//   return data;
// }

// export async function createInstance(payload: InstancePayload): Promise<Instance> {
//   const { data } = await axiosInstance.post('/instance/', payload);
//   return data;
// }