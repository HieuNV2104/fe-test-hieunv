import { Button, Card, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TaskTable } from '@/features/tasks/components/TaskTable';

const { Title, Text } = Typography;

export default function TasksPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Title level={3} className="!mb-0">
            Danh sách Task
          </Title>
          <Text type="secondary">Quản lý công việc nội bộ</Text>
        </div>
        <Space>
          <Button type="primary" icon={<PlusOutlined />} disabled>
            Thêm mới
          </Button>
        </Space>
      </div>
      <Card styles={{ body: { padding: 0 } }}>
        <TaskTable />
      </Card>
    </div>
  );
}
