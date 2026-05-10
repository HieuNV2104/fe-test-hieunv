import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    key: '/',
    icon: <DashboardOutlined />,
    label: <Link to="/">Dashboard</Link>,
  },
  {
    key: '/tasks',
    icon: <UnorderedListOutlined />,
    label: <Link to="/tasks">Danh sách Task</Link>,
  },
];

export default function AppLayout() {
  const { pathname } = useLocation();
  const selectedKey = pathname.startsWith('/tasks') ? '/tasks' : '/';

  return (
    <Layout className="min-h-screen">
      <Sider theme="light" width={220} className="border-r border-gray-200">
        <div className="h-16 flex items-center px-6 text-lg font-semibold border-b border-gray-200">
          TaskBoard
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          className="border-r-0"
        />
      </Sider>
      <Layout>
        <Header className="!bg-white border-b border-gray-200 !px-6 flex items-center">
          <span className="text-base font-medium text-gray-700">
            Quản lý công việc nội bộ
          </span>
        </Header>
        <Content className="p-6 bg-gray-50">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
