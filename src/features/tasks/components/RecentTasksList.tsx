import { Card, List, Typography } from 'antd';
import { useAppSelector } from '@/store/hooks';
import { selectRecentTasks } from '@/store/tasksSelectors';
import { StatusTag } from './StatusTag';
import { PriorityTag } from './PriorityTag';
import { formatDate } from '@/utils';

const { Title, Text } = Typography;

export function RecentTasksList() {
  const tasks = useAppSelector(selectRecentTasks);

  return (
    <Card>
      <Title level={5} className="!mb-4">
        Task gần nhất
      </Title>
      <List
        dataSource={tasks}
        locale={{ emptyText: 'Chưa có task nào' }}
        renderItem={(task) => (
          <List.Item key={task.id} className="!px-0">
            <div className="w-full flex flex-col gap-1">
              <div className="flex items-start justify-between gap-2">
                <span className="font-medium text-gray-800 truncate">{task.title}</span>
                <Text type="secondary" className="!text-xs whitespace-nowrap">
                  {formatDate(task.createdAt)}
                </Text>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <StatusTag status={task.status} />
                <PriorityTag priority={task.priority} />
                {task.assignee && (
                  <Text type="secondary" className="!text-xs">
                    • {task.assignee}
                  </Text>
                )}
              </div>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
}
