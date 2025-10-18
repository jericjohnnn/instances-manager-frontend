import { axiosInstance } from '@/lib/axios';

export type Instance = {
  id: number;
  account: string;
  code: string;
  port: number;
  proxy_name: string;
  created_at: string; 
  updated_at: string; 
};

export interface InstancePayload {
  account: string;
  code: string;
  port: number;
  proxy_name: string;
}

export async function getInstances(): Promise<Instance[]> {
  const { data } = await axiosInstance.get('/instance/');
  return data.results;
}

export async function getInstance(id: number): Promise<Instance> {
  const { data } = await axiosInstance.get(`/instance/${id}/`);
  return data;
}

export async function createInstance(payload: InstancePayload): Promise<Instance> {
  const { data } = await axiosInstance.post('/instance/', payload);
  return data;
}
