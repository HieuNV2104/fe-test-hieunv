# TaskBoard — fe-test

Ứng dụng quản lý công việc nội bộ. Bài test tuyển dụng Frontend Developer.

## Stack

- **React 18** + **TypeScript 5** (strict mode)
- **Vite 5**
- **Redux Toolkit 2** — `createSlice` + `createSelector`
- **Ant Design 5** — toàn bộ UI component
- **Tailwind CSS 3** — layout, spacing, responsive (preflight tắt để không xung đột với AntD)
- **dayjs** — xử lý ngày (đi kèm AntD DatePicker)
- **Vitest** + **Testing Library** — unit test

## Cài đặt

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
npm run lint
npm run test
```

## Cấu trúc thư mục

```
src/
├── features/tasks/      # Feature chính: TaskBoard
│   ├── pages/           # DashboardPage, TasksPage
│   └── components/      # TaskTable, TaskFormModal, ...
├── components/
│   └── layout/          # AppLayout (Antd Layout) + Sider
├── shared/              # Component dùng chung trong feature
├── store/               # configureStore + typed hooks
├── types/               # Task interface
├── utils/               # format, debounce
├── hooks/               # useDebouncedValue, useUrlFilters
├── routes/              # React Router config
├── App.tsx
├── main.tsx
└── index.css            # Tailwind directives
```

## Tính năng dự kiến

- **Dashboard**: 4 thẻ Statistic + Progress + 5 task gần nhất
- **Danh sách Task**: Antd Table có sort, pagination 10/trang, inline đổi trạng thái, xoá hàng loạt
- **Modal thêm/sửa**: Antd Form + rules validation
- **Tìm kiếm + lọc**: Input.Search debounce 300ms, multi-select status, RangePicker hạn chót
- **Mock data**: ≥ 20 task + danh sách assignee mẫu (dùng cho `Select` chọn người được giao)

## Ghi chú kỹ thuật

- Tailwind `preflight` đã tắt (`corePlugins.preflight: false`) để không reset style mặc định của AntD
- AntD 5 dùng CSS-in-JS — không cần import file CSS
- Path alias `@/*` trỏ tới `src/*`
