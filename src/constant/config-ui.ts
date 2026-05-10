import type { TaskPriority, TaskStatus } from '@/types/task';

export const PRIORITY_CONFIG: Record<TaskPriority, { color: string; label: string; weight: number }> = {
  high: { color: 'error', label: 'Cao', weight: 3 },
  medium: { color: 'warning', label: 'Trung bình', weight: 2 },
  low: { color: 'success', label: 'Thấp', weight: 1 }
};

export const STATUS_CONFIG: Record<TaskStatus, { color: string; label: string }> = {
  todo: { color: 'default', label: 'Cần làm' },
  in_progress: { color: 'processing', label: 'Đang làm' },
  done: { color: 'success', label: 'Hoàn thành' }
};
