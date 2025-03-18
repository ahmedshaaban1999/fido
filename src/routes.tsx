import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { FeedbackPage } from './pages/FeedbackPage';
import { CDPPage } from './pages/CDPPage';
import { WorkItemPage } from './pages/WorkItemPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'feedback', element: <FeedbackPage /> },
      { path: 'cdp', element: <CDPPage /> },
      { path: 'workitem', element: <WorkItemPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
    ],
  },
]);
