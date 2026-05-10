import type { ReactNode } from 'react';
import { Tag } from 'antd';
import type { TaskStatus } from '@/types/task';
import { STATUS_CONFIG } from '@/constant/config-ui';

const STATUS_KEYS: TaskStatus[] = ['todo', 'in_progress', 'done'];

export function StatusTag({ status }: { status: TaskStatus }) {
  const cfg = STATUS_CONFIG[status];
  return <Tag color={cfg.color}>{cfg.label}</Tag>;
}

export const STATUS_OPTIONS: {
  value: TaskStatus;
  label: ReactNode;
}[] = STATUS_KEYS.map((value) => ({
  value,
  label: <StatusTag status={value} />
}));

export const STATUS_TEXT_OPTIONS: { value: TaskStatus; label: string }[] = STATUS_KEYS.map((value) => ({
  value,
  label: STATUS_CONFIG[value].label
}));
