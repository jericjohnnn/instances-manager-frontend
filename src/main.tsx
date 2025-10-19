// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { queryClient } from '@/lib/react-query';
import { router } from '@/router';
import '@/assets/styles/index.css';
import { AuthProvider } from './auth/hooks/auth-provider';

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

const root = createRoot(container);
root.render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
