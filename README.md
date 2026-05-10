# TaskBoard

Ứng dụng quản lý công việc nội bộ.

## Tech stack

- **React 18** + **TypeScript 5** (strict mode)
- **Vite 5**
- **Redux Toolkit 2** — `createSlice` + `createSelector`
- **Ant Design 5** — toàn bộ UI component
- **Tailwind CSS 3** — layout, responsive, dark mode
- **React Router 6** — điều hướng giữa Dashboard và danh sách Task
- **dayjs** — xử lý ngày, đi kèm AntD DatePicker

## Khởi chạy

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build production vào dist/
npm run preview    # preview bản build
npm run lint
```

> Yêu cầu Node ≥ 18.

## Tính năng đã làm

### Dashboard (`/`)

- 4 thẻ `Statistic + Card` — Tổng / Cần làm / Đang làm / Hoàn thành
- 3 thanh `Progress` thể hiện tỷ lệ theo trạng thái
- Danh sách 5 task được tạo gần nhất (sort theo `createdAt` desc)
- Toàn bộ dữ liệu lấy từ Redux selector (`selectTaskStats`, `selectRecentTasks`)

### Danh sách Task (`/tasks`)

- Bảng AntD Table:
  - Cột: Tiêu đề, Trạng thái, Độ ưu tiên, Người được giao, Hạn chót, Hành động
  - Sort được trên Tiêu đề, Độ ưu tiên, Hạn chót
  - Phân trang 10 task/trang, hiển thị tổng số
  - Status hiển thị bằng `Tag` (default / processing / success), Priority bằng `Tag` (error / warning / success)
- Đổi trạng thái nhanh: inline `Select` ngay trên cột Trạng thái (không cần mở Modal)
- Modal thêm/sửa:
  - Form AntD với rules validation (title required, max 200 ký tự; status, priority required; description max 2000)
  - Edit: form tự điền sẵn dữ liệu đang chọn
  - Trường gồm Tiêu đề, Mô tả, Trạng thái, Độ ưu tiên (Radio.Group), Người được giao (AutoComplete với 8 assignee mẫu — cho phép gõ tự do), Hạn chót (DatePicker), Tags (Select mode tags)
- Xoá:
  - Nút Delete từng dòng → Popconfirm xác nhận
  - Row selection + nút "Xoá đã chọn" (bulk delete) → Popconfirm
- Tìm kiếm & lọc:
  - `Input.Search` theo tiêu đề, debounce **300ms**
  - Multi-select Trạng thái
  - Select Độ ưu tiên (single, allowClear)
  - `RangePicker` lọc theo khoảng hạn chót
  - Nút Reset xoá toàn bộ filter
  - **Toàn bộ logic lọc nằm trong Redux selector**, không lọc trong component

### Bonus

- **Dark mode**: toggle ở header, lưu vào `localStorage`, fallback theo `prefers-color-scheme` của hệ điều hành. AntD đổi theme qua `theme.darkAlgorithm`, Tailwind đổi qua class `dark` trên `<html>`.
- **Responsive (Tailwind only)**:
  - `< lg` (mobile + tablet): Sider ẩn, dùng `Drawer` mở bằng nút hamburger
  - `lg+` (desktop): Sider luôn hiện
  - Modal form, dashboard grid, filter grid đều responsive

### Mock data

- 22 task đa dạng (8 todo / 7 in_progress / 7 done), đủ priority, dueDate, tags
- 8 assignee mẫu — dùng cho AutoComplete trong form

## Cấu trúc thư mục

```
src/
├── components/layout/             # AppLayout, ThemeToggle
├── constant/                      # config-ui (tag colors), tasksMock, assignees.mock
├── contexts/                      # ThemeProvider (dark mode)
├── features/tasks/components/     # StatusTag, PriorityTag, TaskTable,
│                                  # TaskFormModal, TaskFilters,
│                                  # StatsCards, StatusProgress, RecentTasksList
├── hooks/                         # useDebouncedValue
├── pages/                         # DashboardPage, TasksPage
├── routes/                        # router config (lazy + Suspense)
├── store/                         # configureStore, typed hooks,
│                                  # tasksSlice, tasksSelectors
├── types/                         # Task, TaskFilters, TaskStats, ...
├── utils/                         # formatDate, getPriorityWeight, trimOrUndefined
├── App.tsx                        # ThemeProvider + AntD ConfigProvider + RouterProvider
├── main.tsx                       # Provider Redux + App
├── loading.tsx                    # PageFallback (Suspense)
└── index.css                      # Tailwind directives + base style
```

## Redux Toolkit

### State (`src/store/tasksSlice.ts`)

```ts
{
  items: Task[];                    // 22 task mock
  filters: {
    searchText: string;
    status: TaskStatus[];
    priority: TaskPriority | null;
    dateRange: [string, string] | null;
  };
  pagination: { currentPage: number; pageSize: number };
}
```

### Actions

`addTask`, `updateTask`, `deleteTask`, `deleteManyTasks`, `updateTaskStatus`, `setFilter` (`Partial<TaskFilters>`), `resetFilters`, `setPage`.

### Selectors (`src/store/tasksSelectors.ts`) — tất cả dùng `createSelector`

- `selectAllTasks`
- `selectFilteredTasks` — áp dụng search + status + priority + dateRange
- `selectPaginatedTasks` — `{ items, total }` theo trang hiện tại
- `selectTaskStats` — `{ total, todo, inProgress, done }`
- `selectRecentTasks` — top 5 sort theo `createdAt` desc

## Quyết định kỹ thuật

- **Tailwind preflight tắt** (`corePlugins.preflight: false`) để không reset style mặc định của AntD
- **Path alias** `@/*` → `src/*` (thiết lập ở cả `tsconfig.app.json` và `vite.config.ts`)
- **dueDate** lưu dưới dạng `YYYY-MM-DD`, **createdAt** lưu ISO string đầy đủ — tránh `Dayjs` object trong Redux (không serializable)
- **Logic lọc** nằm trong selector (`selectFilteredTasks`), không trong component — dễ test và reuse
- **Sort** xử lý client-side trong AntD Table (đề không yêu cầu sort phía Redux); pagination state đồng bộ với Redux qua `setPage`
- **Filter form** không dùng AntD Form (vì không submit) — dùng grid Tailwind + controlled inputs
