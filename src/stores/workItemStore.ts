import { create } from 'zustand';
import { WorkItem, WorkItemDashboard } from '../types';

interface WorkItemStore {
  items: WorkItem[];
  dashboard: WorkItemDashboard | null;
  addItem: (item: WorkItem) => void;
  updateItem: (id: string, updates: Partial<WorkItem>) => void;
  getDashboard: () => WorkItemDashboard;
}

export const useWorkItemStore = create<WorkItemStore>((set, get) => ({
  items: [],
  dashboard: null,

  addItem: (item: WorkItem) => {
    set(state => ({
      items: [...state.items, item],
      dashboard: calculateDashboard([...state.items, item])
    }));
  },

  updateItem: (id: string, updates: Partial<WorkItem>) => {
    set(state => {
      const newItems = state.items.map(item =>
        item.id === id ? { ...item, ...updates } : item
      );
      return {
        items: newItems,
        dashboard: calculateDashboard(newItems)
      };
    });
  },

  getDashboard: () => {
    const { items } = get();
    return calculateDashboard(items);
  }
}));

function calculateDashboard(items: WorkItem[]): WorkItemDashboard {
  const completed = items.filter(item => item.status === 'completed');
  const inProgress = items.filter(item => item.status === 'in_progress');
  const planned = items.filter(item => item.status === 'planned');

  const averageCompletionTime = completed.reduce((acc, item) => {
    if (item.timeSpent) {
      return acc + item.timeSpent;
    }
    return acc;
  }, 0) / (completed.length || 1);

  const timeSpentByType = items.reduce((acc, item) => {
    if (item.timeSpent) {
      const existing = acc.find(t => t.type === item.type);
      if (existing) {
        existing.hours += item.timeSpent;
      } else {
        acc.push({ type: item.type, hours: item.timeSpent });
      }
    }
    return acc;
  }, [] as { type: WorkItem['type']; hours: number }[]);

  return {
    totalItems: items.length,
    completedItems: completed.length,
    inProgressItems: inProgress.length,
    plannedItems: planned.length,
    averageCompletionTime,
    itemsByStatus: [
      { status: 'completed', count: completed.length },
      { status: 'in_progress', count: inProgress.length },
      { status: 'planned', count: planned.length }
    ],
    recentItems: [...items].sort((a, b) => 
      b.startDate.getTime() - a.startDate.getTime()
    ).slice(0, 5),
    timeSpentByType
  };
}