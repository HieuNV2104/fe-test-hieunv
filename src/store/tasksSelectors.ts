import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { Task, TaskStats } from '@/types/task';

export const selectAllTasks = (state: RootState): Task[] => state.tasks.items;

const selectFilters = (state: RootState) => state.tasks.filters;
const selectPagination = (state: RootState) => state.tasks.pagination;

export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectFilters],
  (items, filters): Task[] => {
    const searchLc = filters.searchText.trim().toLowerCase();
    const [from, to] = filters.dateRange ?? [];

    return items.filter((task) => {
      if (searchLc && !task.title.toLowerCase().includes(searchLc)) {
        return false;
      }
      if (filters.status.length && !filters.status.includes(task.status)) {
        return false;
      }
      if (filters.priority && task.priority !== filters.priority) {
        return false;
      }
      if (from && to) {
        if (!task.dueDate) return false;
        if (task.dueDate < from || task.dueDate > to) return false;
      }
      return true;
    });
  },
);

export const selectPaginatedTasks = createSelector(
  [selectFilteredTasks, selectPagination],
  (filtered, { currentPage, pageSize }) => {
    const start = (currentPage - 1) * pageSize;
    return {
      items: filtered.slice(start, start + pageSize),
      total: filtered.length,
    };
  },
);

export const selectTaskStats = createSelector(
  [selectAllTasks],
  (items): TaskStats => ({
    total: items.length,
    todo: items.filter((t) => t.status === 'todo').length,
    inProgress: items.filter((t) => t.status === 'in_progress').length,
    done: items.filter((t) => t.status === 'done').length,
  }),
);

export const selectRecentTasks = createSelector([selectAllTasks], (items) =>
  [...items]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5),
);
