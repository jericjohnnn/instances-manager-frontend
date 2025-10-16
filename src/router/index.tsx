// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import InstancesPage from '@/pages/InstancesPage';

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/instance', element: <InstancesPage /> },
]);
