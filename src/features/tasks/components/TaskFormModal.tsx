import { useEffect } from 'react';
import { AutoComplete, DatePicker, Form, Input, Modal, Radio, Select } from 'antd';
import { nanoid } from '@reduxjs/toolkit';
import dayjs, { type Dayjs } from 'dayjs';
import { useAppDispatch } from '@/store/hooks';
import { addTask, updateTask } from '@/store/tasksSlice';
import type { Task, TaskPriority, TaskStatus } from '@/types/task';
import { ASSIGNEES } from '@/constant/assignees.mock';
import { STATUS_TEXT_OPTIONS } from './StatusTag';
import { PRIORITY_OPTIONS } from './PriorityTag';
import { trimOrUndefined } from '@/utils';

interface TaskFormValues {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  dueDate?: Dayjs | null;
  tags?: string[];
}

interface TaskFormModalProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
}

const ASSIGNEE_OPTIONS = ASSIGNEES.map((name) => ({ value: name }));

export function TaskFormModal({ open, task, onClose }: TaskFormModalProps) {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<TaskFormValues>();
  const isEdit = task !== null;

  useEffect(() => {
    if (!open) return;
    if (task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignee: task.assignee,
        dueDate: task.dueDate ? dayjs(task.dueDate) : null,
        tags: task.tags
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ status: 'todo', priority: 'medium' });
    }
  }, [open, task, form]);

  const handleSubmit = () =>
    form.validateFields().then((values) => {
      const dueDate = values.dueDate ? values.dueDate.format('YYYY-MM-DD') : undefined;
      const payload: Task = {
        id: task?.id ?? nanoid(),
        createdAt: task?.createdAt ?? new Date().toISOString(),
        title: values.title.trim(),
        description: trimOrUndefined(values.description),
        status: values.status,
        priority: values.priority,
        assignee: trimOrUndefined(values.assignee),
        dueDate,
        tags: values.tags?.length ? values.tags : undefined
      };
      dispatch(isEdit ? updateTask(payload) : addTask(payload));
      onClose();
    });

  return (
    <Modal
      open={open}
      title={isEdit ? 'Chỉnh sửa task' : 'Thêm task mới'}
      okText={isEdit ? 'Lưu thay đổi' : 'Tạo mới'}
      cancelText="Huỷ"
      onCancel={onClose}
      onOk={handleSubmit}
      maskClosable={false}
      width={560}
    >
      <Form form={form} layout="vertical" autoComplete="off" preserve={false}>
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[
            { required: true, message: 'Vui lòng nhập tiêu đề' },
            { max: 200, message: 'Tối đa 200 ký tự' }
          ]}
        >
          <Input placeholder="Ví dụ: Thiết kế lại trang chủ" />
        </Form.Item>

        <Form.Item name="description" label="Mô tả" rules={[{ max: 2000, message: 'Tối đa 2000 ký tự' }]}>
          <Input.TextArea rows={3} placeholder="Mô tả chi tiết task..." />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}>
            <Select options={STATUS_TEXT_OPTIONS} />
          </Form.Item>

          <Form.Item
            name="priority"
            label="Độ ưu tiên"
            rules={[{ required: true, message: 'Vui lòng chọn độ ưu tiên' }]}
          >
            <Radio.Group options={PRIORITY_OPTIONS} optionType="button" buttonStyle="solid" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="assignee" label="Người được giao">
            <AutoComplete
              options={ASSIGNEE_OPTIONS}
              placeholder="Chọn hoặc gõ tên"
              allowClear
              filterOption={(input, option) =>
                String(option?.value ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item name="dueDate" label="Hạn chót">
            <DatePicker format="DD/MM/YYYY" placeholder="Chọn ngày" style={{ width: '100%' }} />
          </Form.Item>
        </div>

        <Form.Item name="tags" label="Tags">
          <Select mode="tags" placeholder="Nhập tag rồi Enter" tokenSeparators={[',']} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
