import { createBrowserRouter } from 'react-router-dom';
import { InstancePage } from '@/pages/InstancePage';

export const router = createBrowserRouter([
  { path: '/', element: <InstancePage /> },
]);
