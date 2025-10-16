import { axiosInstance } from '@/lib/axios';

export type Instance = {
  id: number;
  account: string;
  code: string;
  port: number;
  proxy_name: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
};

export async function getInstances(): Promise<Instance[]> {
  const { data } = await axiosInstance.get('/instance');
  return data;
}
