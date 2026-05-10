import { useState } from 'react';
import { Button, Drawer, Layout, Menu } from 'antd';
import { DashboardOutlined, MenuOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    key: '/',
    icon: <DashboardOutlined />,
    label: <Link to="/">Dashboard</Link>
  },
  {
    key: '/tasks',
    icon: <UnorderedListOutlined />,
    label: <Link to="/tasks">Danh sách Task</Link>
  }
];

export default function AppLayout() {
  const { pathname } = useLocation();
  const { isDark } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selectedKey = pathname.startsWith('/tasks') ? '/tasks' : '/';
  const sidebarTheme = isDark ? 'dark' : 'light';

  const closeDrawer = () => setDrawerOpen(false);
  const openDrawer = () => setDrawerOpen(true);

  const renderBrand = () => (
    <div className="h-16 flex items-center justify-center text-lg font-semibold border-b border-gray-200 dark:border-gray-700 select-none">
      TaskBoard
    </div>
  );

  const renderMenu = (onClick?: () => void) => (
    <Menu
      mode="inline"
      theme={sidebarTheme}
      selectedKeys={[selectedKey]}
      items={menuItems}
      className="border-r-0"
      onClick={onClick}
    />
  );

  return (
    <Layout className="min-h-screen">
      <Sider
        theme={sidebarTheme}
        width={220}
        trigger={null}
        className="!hidden lg:!block border-r border-gray-200 dark:border-gray-700"
      >
        {renderBrand()}
        {renderMenu()}
      </Sider>
      <Layout>
        <Header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 !px-4 md:!px-6 flex items-center justify-between !h-14 md:!h-16">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={openDrawer}
              className="lg:!hidden"
              aria-label="Mở sidebar"
            />
            <span className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-200 truncate">
              Quản lý công việc nội bộ
            </span>
          </div>
          <ThemeToggle />
        </Header>
        <Content className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </Content>
      </Layout>
      <Drawer
        open={drawerOpen}
        onClose={closeDrawer}
        placement="left"
        width={240}
        styles={{ body: { padding: 0 } }}
        closeIcon={null}
        title={null}
      >
        {renderBrand()}
        {renderMenu(closeDrawer)}
      </Drawer>
    </Layout>
  );
}
