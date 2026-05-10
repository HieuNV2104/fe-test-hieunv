import { useEffect, useState } from 'react';
import { Button, DatePicker, Input, Select } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import dayjs, { type Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetFilters, setFilter } from '@/store/tasksSlice';
import type { TaskPriority, TaskStatus } from '@/types/task';
import { STATUS_TEXT_OPTIONS } from './StatusTag';
import { PRIORITY_OPTIONS } from './PriorityTag';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

const { RangePicker } = DatePicker;

export function TaskFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.tasks.filters);
  const [searchInput, setSearchInput] = useState(filters.searchText);
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  useEffect(() => {
    if (debouncedSearch !== searchInput) return;
    if (debouncedSearch === filters.searchText) return;
    dispatch(setFilter({ searchText: debouncedSearch }));
  }, [debouncedSearch, searchInput, filters.searchText, dispatch]);

  const dateRangeValue: [Dayjs, Dayjs] | null = filters.dateRange
    ? [dayjs(filters.dateRange[0]), dayjs(filters.dateRange[1])]
    : null;

  const handleReset = () => {
    setSearchInput('');
    dispatch(resetFilters());
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
      <div className="md:col-span-4">
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Tìm kiếm</label>
        <Input.Search
          placeholder="Tìm theo tiêu đề..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          allowClear
        />
      </div>
      <div className="md:col-span-3">
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Trạng thái</label>
        <Select<TaskStatus[]>
          mode="multiple"
          placeholder="Tất cả trạng thái"
          options={STATUS_TEXT_OPTIONS}
          value={filters.status}
          onChange={(value) => dispatch(setFilter({ status: value }))}
          allowClear
          maxTagCount="responsive"
          style={{ width: '100%' }}
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Độ ưu tiên</label>
        <Select<TaskPriority>
          placeholder="Tất cả"
          options={PRIORITY_OPTIONS}
          value={filters.priority}
          onChange={(value) => dispatch(setFilter({ priority: value ?? null }))}
          allowClear
          style={{ width: '100%' }}
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Hạn chót</label>
        <RangePicker
          value={dateRangeValue}
          onChange={(dates) => {
            if (!dates || !dates[0] || !dates[1]) {
              dispatch(setFilter({ dateRange: null }));
            } else {
              dispatch(
                setFilter({
                  dateRange: [dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]
                })
              );
            }
          }}
          format="DD/MM/YYYY"
          style={{ width: '100%' }}
          allowClear
        />
      </div>
      <div className="md:col-span-1 flex justify-end">
        <Button icon={<ReloadOutlined />} onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
