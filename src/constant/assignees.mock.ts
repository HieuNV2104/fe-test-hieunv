export const ASSIGNEES = [
  'Nguyễn Văn An',
  'Trần Thị Bình',
  'Lê Hoàng Cường',
  'Phạm Thu Dung',
  'Hoàng Minh Đức',
  'Vũ Thị Hà',
  'Đỗ Quang Huy',
  'Bùi Thanh Lan',
] as const;

export type Assignee = (typeof ASSIGNEES)[number];
