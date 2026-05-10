import { Suspense, lazy, type ReactNode } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { PageFallback } from '@/loading';

const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const TasksPage = lazy(() => import('@/pages/TasksPage'));

function withSuspense(node: ReactNode) {
  return <Suspense fallback={<PageFallback />}>{node}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: withSuspense(<DashboardPage />) },
      { path: 'tasks', element: withSuspense(<TasksPage />) },
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  }
]);
