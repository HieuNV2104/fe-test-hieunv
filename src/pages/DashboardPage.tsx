import { Typography } from 'antd';
import { StatsCards } from '@/features/tasks/components/StatsCards';
import { StatusProgress } from '@/features/tasks/components/StatusProgress';
import { RecentTasksList } from '@/features/tasks/components/RecentTasksList';

const { Title, Text } = Typography;

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div>
        <Title level={3} className="!mb-0">
          Dashboard
        </Title>
        <Text type="secondary">Tổng quan tình hình công việc</Text>
      </div>
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StatusProgress />
        <RecentTasksList />
      </div>
    </div>
  );
}
