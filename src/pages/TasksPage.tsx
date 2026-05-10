import { useState } from 'react';
import { Button, Card, Popconfirm, Space, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { TaskTable } from '@/features/tasks/components/TaskTable';
import { TaskFormModal } from '@/features/tasks/components/TaskFormModal';
import { TaskFilters } from '@/features/tasks/components/TaskFilters';
import { useAppDispatch } from '@/store/hooks';
import { deleteManyTasks, deleteTask } from '@/store/tasksSlice';
import type { Task } from '@/types/task';

const { Title, Text } = Typography;

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const openCreate = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const handleDelete = (task: Task) => {
    dispatch(deleteTask(task.id));
    setSelectedIds((prev) => prev.filter((id) => id !== task.id));
  };

  const handleBulkDelete = () => {
    dispatch(deleteManyTasks(selectedIds));
    setSelectedIds([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <Title level={3} className="!mb-0">
            Danh sách Task
          </Title>
          <Text type="secondary">Quản lý công việc nội bộ</Text>
        </div>
        <Space wrap>
          {selectedIds.length > 0 && (
            <Popconfirm
              title={`Xoá ${selectedIds.length} task đã chọn?`}
              description="Hành động không thể hoàn tác."
              okText="Xoá"
              cancelText="Huỷ"
              okButtonProps={{ danger: true }}
              onConfirm={handleBulkDelete}
            >
              <Button danger icon={<DeleteOutlined />}>
                Xoá đã chọn ({selectedIds.length})
              </Button>
            </Popconfirm>
          )}
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
            Thêm mới
          </Button>
        </Space>
      </div>
      <Card>
        <TaskFilters />
      </Card>
      <Card styles={{ body: { padding: 0 } }}>
        <TaskTable
          selectedRowKeys={selectedIds}
          onSelectionChange={setSelectedIds}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </Card>
      <TaskFormModal open={modalOpen} task={editingTask} onClose={closeModal} />
    </div>
  );
}
