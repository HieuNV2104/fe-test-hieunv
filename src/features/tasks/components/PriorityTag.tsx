import { PRIORITY_CONFIG } from '@/constant/config-ui';
import { TaskPriority } from '@/types/task';
import { Tag } from 'antd';

const PRIORITY_KEYS: TaskPriority[] = ['low', 'medium', 'high'];

export function PriorityTag({ priority }: { priority: TaskPriority }) {
  const cfg = PRIORITY_CONFIG[priority];
  return <Tag color={cfg.color}>{cfg.label}</Tag>;
}

export const PRIORITY_OPTIONS: { value: TaskPriority; label: string }[] = PRIORITY_KEYS.map((value) => ({
  value,
  label: PRIORITY_CONFIG[value].label
}));
