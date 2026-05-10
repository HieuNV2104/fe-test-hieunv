import { Button, Select, Space, Table, Tooltip } from 'antd';
import type { TableColumnsType, TablePaginationConfig } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { Task, TaskStatus } from '@/types/task';
import { formatDate, getPriorityWeight } from '@/utils';
import { STATUS_OPTIONS } from './StatusTag';
import { PriorityTag } from './PriorityTag';
import { selectFilteredTasks } from '@/store/tasksSelectors';
import { setPage, updateTaskStatus } from '@/store/tasksSlice';

const Action = () => {
  return (
    <Space size={4}>
      <Tooltip title="Sửa">
        <Button type="text" size="small" icon={<EditOutlined />} disabled />
      </Tooltip>
      <Tooltip title="Xoá">
        <Button type="text" size="small" danger icon={<DeleteOutlined />} disabled />
      </Tooltip>
    </Space>
  );
};

const SelectSattus = (record: Task, handleChangeStatus: (status: TaskStatus, record: Task) => void) => {
  return (
    <Select<TaskStatus>
      value={record.status}
      options={STATUS_OPTIONS}
      variant="borderless"
      popupMatchSelectWidth={false}
      style={{ minWidth: 140 }}
      onChange={(status) => handleChangeStatus(status, record)}
    />
  );
};

export function TaskTable() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectFilteredTasks);
  const { currentPage, pageSize } = useAppSelector((state) => state.tasks.pagination);

  const pagination: TablePaginationConfig = {
    current: currentPage,
    pageSize,
    total: items.length,
    showTotal: (total) => `Tổng ${total} task`,
    showSizeChanger: false
  };

  const handleChangePage = (next: TablePaginationConfig) => {
    if (next.current && next.current !== currentPage) {
      dispatch(setPage({ currentPage: next.current }));
    }
  };

  const handleChangeStatus = (status: TaskStatus, record: Task) => {
    dispatch(updateTaskStatus({ id: record.id, status }));
  };

  const columns: TableColumnsType<Task> = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      width: 280,
      ellipsis: true,
      sorter: (a, b) => a.title.localeCompare(b.title, 'vi')
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 170,
      render: (_, record) => SelectSattus(record, handleChangeStatus)
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      width: 130,
      sorter: (a, b) => getPriorityWeight(a.priority) - getPriorityWeight(b.priority),
      render: (_value, record) => <PriorityTag priority={record.priority} />
    },
    {
      title: 'Người được giao',
      dataIndex: 'assignee',
      key: 'assignee',
      width: 180,
      render: (value?: string) => value ?? <span className="text-gray-400">—</span>
    },
    {
      title: 'Hạn chót',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 130,
      sorter: (a, b) => (a.dueDate ?? '').localeCompare(b.dueDate ?? ''),
      render: (value?: string) => (value ? formatDate(value) : <span className="text-gray-400">—</span>)
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 110,
      fixed: 'right',
      render: Action
    }
  ];

  return (
    <Table<Task>
      rowKey="id"
      columns={columns}
      dataSource={items}
      pagination={pagination}
      onChange={handleChangePage}
      scroll={{ x: 1100 }}
      size="middle"
    />
  );
}
