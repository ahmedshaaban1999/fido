import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkItemLogger } from '../components/WorkItemLogger';
import { Role } from '../types';

interface WorkItemPageProps {
  userId: string;
  role: Role;
}

export const WorkItemPage: React.FC<WorkItemPageProps> = ({ userId, role }) => {
  const navigate = useNavigate();

  const handleWorkItemSubmit = (workItem: any) => {
    const storageKey = `workItems_${userId}`;
    const existingItems = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const updatedItems = [...existingItems, { ...workItem, timestamp: new Date().toISOString() }];
    localStorage.setItem(storageKey, JSON.stringify(updatedItems));
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <WorkItemLogger
        userId={userId}
        role={role}
        onSubmit={handleWorkItemSubmit}
      />
    </div>
  );
};
