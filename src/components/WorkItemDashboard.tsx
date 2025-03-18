import React from 'react';
import { BarChart3, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { WorkItemDashboard as DashboardType } from '../types';
import { format } from 'date-fns';

interface Props {
  dashboard: DashboardType;
}

export function WorkItemDashboard({ dashboard }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-2xl font-bold">{dashboard.totalItems}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{dashboard.completedItems}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{dashboard.inProgressItems}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Planned</p>
              <p className="text-2xl font-bold text-orange-600">{dashboard.plannedItems}</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Items</h3>
        <div className="space-y-4">
          {dashboard.recentItems.map(item => (
            <div key={item.id} className="border-b pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  item.status === 'completed' ? 'bg-green-100 text-green-800' :
                  item.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                <span>Started: {format(item.startDate, 'MMM d, yyyy')}</span>
                {item.completionDate && (
                  <span>Completed: {format(item.completionDate, 'MMM d, yyyy')}</span>
                )}
                {item.timeSpent && (
                  <span>Time Spent: {item.timeSpent}h</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Time Spent by Type</h3>
          <div className="space-y-3">
            {dashboard.timeSpentByType.map(({ type, hours }) => (
              <div key={type} className="flex items-center justify-between">
                <span className="capitalize">{type}</span>
                <span className="font-medium">{hours}h</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Status Overview</h3>
          <div className="space-y-3">
            {dashboard.itemsByStatus.map(({ status, count }) => (
              <div key={status} className="flex items-center justify-between">
                <span className="capitalize">{status}</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}