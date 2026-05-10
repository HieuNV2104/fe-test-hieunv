import { Card, Progress, Typography } from 'antd';
import { useAppSelector } from '@/store/hooks';
import { selectTaskStats } from '@/store/tasksSelectors';
import { STATUS_CONFIG } from '@/constant/config-ui';
import type { TaskStats } from '@/types/task';

const { Title } = Typography;

interface ProgressRow {
  key: keyof Pick<TaskStats, 'todo' | 'inProgress' | 'done'>;
  label: string;
  color: string;
}

const ROWS: ProgressRow[] = [
  { key: 'todo', label: STATUS_CONFIG.todo.label, color: '#8c8c8c' },
  { key: 'inProgress', label: STATUS_CONFIG.in_progress.label, color: '#fa8c16' },
  { key: 'done', label: STATUS_CONFIG.done.label, color: '#52c41a' }
];

export function StatusProgress() {
  const stats = useAppSelector(selectTaskStats);

  return (
    <Card>
      <Title level={5} className="!mb-4">
        Tỷ lệ theo trạng thái
      </Title>
      <div className="space-y-4">
        {ROWS.map((row) => {
          const count = stats[row.key];
          const percent = stats.total ? Math.round((count / stats.total) * 100) : 0;
          return (
            <div key={row.key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{row.label}</span>
                <span className="text-gray-500">
                  {count} / {stats.total}
                </span>
              </div>
              <Progress percent={percent} strokeColor={row.color} />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
