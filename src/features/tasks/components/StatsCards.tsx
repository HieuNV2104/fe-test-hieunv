import type { ReactNode } from 'react';
import { Card, Statistic } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { useAppSelector } from '@/store/hooks';
import { selectTaskStats } from '@/store/tasksSelectors';
import type { TaskStats } from '@/types/task';

interface StatItem {
  key: keyof TaskStats;
  title: string;
  icon: ReactNode;
  color: string;
}

const STAT_ITEMS: StatItem[] = [
  { key: 'total', title: 'Tổng task', icon: <UnorderedListOutlined />, color: '#1677ff' },
  { key: 'todo', title: 'Cần làm', icon: <ClockCircleOutlined />, color: '#8c8c8c' },
  { key: 'inProgress', title: 'Đang làm', icon: <SyncOutlined />, color: '#fa8c16' },
  { key: 'done', title: 'Hoàn thành', icon: <CheckCircleOutlined />, color: '#52c41a' }
];

export function StatsCards() {
  const stats = useAppSelector(selectTaskStats);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STAT_ITEMS.map((item) => (
        <Card key={item.key}>
          <Statistic
            title={item.title}
            value={stats[item.key]}
            valueStyle={{ color: item.color }}
            prefix={
              <span style={{ color: item.color, marginRight: 4 }}>{item.icon}</span>
            }
          />
        </Card>
      ))}
    </div>
  );
}
