import { createBrowserRouter } from 'react-router-dom';
import { InstancePage } from '@/pages/InstancePage';
import { LoginPage } from '@/pages/LoginPage';

export const router = createBrowserRouter([
  { path: '/instances', element: <InstancePage /> },
  { path: '/', element: <LoginPage /> },
]);
