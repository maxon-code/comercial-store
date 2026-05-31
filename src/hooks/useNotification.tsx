import { create } from 'zustand';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface NotificationState {
  notifications: NotificationItem[];
  showNotification: (options: Omit<NotificationItem, 'id'>) => void;
  hideNotification: (id: string) => void;
}

export const useNotification = create<NotificationState>((set) => ({
  notifications: [],
  
  showNotification: (options) => set((state) => {
    const newNotification: NotificationItem = {
      ...options,
      id: Math.random().toString(36).substring(2, 9), 
    };


    const updated = [...state.notifications, newNotification];


    return { notifications: updated.slice(-3) };
  }),

  hideNotification: (id) => set((state) => ({

    notifications: state.notifications.filter((n) => n.id !== id),
  })),
}));