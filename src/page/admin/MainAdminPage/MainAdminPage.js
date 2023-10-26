import React, { useState } from 'react';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined, } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, } from 'antd';
import MyHeader from '../../../component/MyHeader';
import UserManagement from './UserManagement';
import MovieManagement from './MovieManagement';
import ShowTimeManagement from './ShowTimeManagement';
import BookingManagement from './BookingManagement';
import ReportManagement from './ReportManagement';
import PersonalPage from '../../PersonalPage/PersonalPage';

const { Content, Sider, Header, } = Layout;
function getItem(label, key, icon, children) {
    return { key, icon, children, label, };
}

const items = [
    getItem('User', 'user', <UserOutlined />),
    getItem('Movie', 'movie', <TeamOutlined />),
    getItem('ShowTime', 'showtime', <FileOutlined />),
    getItem('Booking', 'booking', <DesktopOutlined />),
    getItem('Report', 'report', <PieChartOutlined />),
    getItem('Personal', 'personal', <UserOutlined />),
];

export default function MainAdminPage() {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer }, } = theme.useToken();
    const [selectedItem, setSelectedItem] = useState(null);
    if (selectedItem === null) { setSelectedItem('movie') }
    const handleMenuItemClick = (key) => {
        setSelectedItem(key);
    }
    const breadcrumbItems = [
        <Breadcrumb.Item key="Admin">Admin</Breadcrumb.Item>,
        <Breadcrumb.Item key={selectedItem}>{selectedItem}</Breadcrumb.Item>
    ];

    const componentMapping = {
        user: <UserManagement />,
        movie: <MovieManagement />,
        showtime: <ShowTimeManagement />,
        booking: <BookingManagement />,
        report: <ReportManagement />,
        personal: <PersonalPage />,
    };

    return (
        <Layout style={{ minHeight: '100vh', scrollBehavior: 'smooth', overflow: 'auto' }}        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu style={{ paddingTop: 10 }} theme="dark" defaultSelectedKeys={['user']} mode="inline" items={items} onClick={({ key }) => handleMenuItemClick(key)} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, marginBottom: 10 }}>
                    <MyHeader />
                </Header>
                <Content style={{ margin: '0 16px', }} >
                    <Breadcrumb style={{ margin: '16px 0', }}>
                        {breadcrumbItems}
                    </Breadcrumb>
                    <div style={{ padding: 24, minHeight: 800, background: colorBgContainer, }}>
                        {componentMapping[selectedItem]}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};