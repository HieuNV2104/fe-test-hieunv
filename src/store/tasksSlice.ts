import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PaginationState, Task, TaskFilters, TaskStatus } from '@/types/task';
import { TASKS_MOCK } from '@/constant/tasksMock';

interface TasksState {
  items: Task[];
  filters: TaskFilters;
  pagination: PaginationState;
}

const initialFilters: TaskFilters = {
  searchText: '',
  status: [],
  priority: null,
  dateRange: null
};

const initialState: TasksState = {
  items: TASKS_MOCK,
  filters: initialFilters,
  pagination: {
    currentPage: 1,
    pageSize: 10
  }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.items.unshift(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const idx = state.items.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    deleteManyTasks(state, action: PayloadAction<string[]>) {
      const ids = new Set(action.payload);
      state.items = state.items.filter((t) => !ids.has(t.id));
    },
    updateTaskStatus(state, action: PayloadAction<{ id: string; status: TaskStatus }>) {
      const task = state.items.find((t) => t.id === action.payload.id);
      if (task) task.status = action.payload.status;
    },
    setFilter(state, action: PayloadAction<Partial<TaskFilters>>) {
      Object.assign(state.filters, action.payload);
      state.pagination.currentPage = 1;
    },
    resetFilters(state) {
      state.filters = initialFilters;
      state.pagination.currentPage = 1;
    },
    setPage(state, action: PayloadAction<{ currentPage: number; pageSize?: number }>) {
      state.pagination.currentPage = action.payload.currentPage;
      if (action.payload.pageSize) {
        state.pagination.pageSize = action.payload.pageSize;
      }
    }
  }
});

export const { addTask, updateTask, deleteTask, deleteManyTasks, updateTaskStatus, setFilter, resetFilters, setPage } =
  tasksSlice.actions;

export default tasksSlice.reducer;
