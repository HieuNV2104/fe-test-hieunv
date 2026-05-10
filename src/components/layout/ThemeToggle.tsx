import { Button, Tooltip } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useTheme } from '@/contexts/ThemeProvider';

export function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <Tooltip title={isDark ? 'Chế độ sáng' : 'Chế độ tối'} placement="bottomRight">
      <Button
        type="text"
        shape="circle"
        icon={isDark ? <SunOutlined /> : <MoonOutlined />}
        onClick={toggle}
        aria-label="Đổi chủ đề"
      />
    </Tooltip>
  );
}
