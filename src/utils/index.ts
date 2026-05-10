import { PRIORITY_CONFIG } from '@/constant/config-ui';
import { TaskPriority } from '@/types/task';
import dayjs from 'dayjs';

export function formatDate(input?: string | null): string {
  if (!input) return '';
  const d = dayjs(input);
  return d.isValid() ? d.format('DD/MM/YYYY') : '';
}

export function getPriorityWeight(p: TaskPriority): number {
  return PRIORITY_CONFIG[p].weight;
}

export const trimOrUndefined = (v?: string): string | undefined => {
  const trimmed = v?.trim();
  return trimmed ? trimmed : undefined;
};
