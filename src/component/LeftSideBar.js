import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { userDetailLocalStorage, userLocalStorage } from '../api/localServices';
// import { useNavigate } from 'react-router-dom';
const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
    return { key, icon, children, label, };
}

const items = [
    getItem('User', 'user', <UserOutlined />),
    getItem('Movie', 'movie', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('ShowTime', 'showtime', <FileOutlined />),
    getItem('Booking', 'booking', <DesktopOutlined />),
    getItem('Report', 'report', <PieChartOutlined />),
];
export default function LeftSideBar() {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer }, } = theme.useToken();
    const [selectedItem, setSelectedItem] = useState(null);
    // Header
    let info = userLocalStorage.get();
    const menuRightArr = [
        {
            label: info !== null ? (
                <div className='row'>
                    <div className="col p-0"><img style={{ borderRadius: 50 }} src={`https://source.unsplash.com/random/40x40?sig=${info.taiKhoan}`} alt={info.taiKhoan} /></div>
                    <p className='col'>
                        {info.taiKhoan}</p>
                </div>
            ) : 'Đăng Nhập',
            key: info !== null ? 'personal' : 'sign-in',
        },
        {
            label: info !== null ? 'Đăng Xuất' : 'Đăng Ký',
            key: info !== null ? 'sign-out' : 'sign-up',
        },
    ];
    let handleSignOut = () => {
        userLocalStorage.remove();
        userDetailLocalStorage.remove();
        window.location.reload();
        window.location.href = "/admin/homepage";
    };

    const handleMenuItemClick = (key) => {
        if (key === 'sign-out') {
            handleSignOut();
        } else {
            setSelectedItem(key);
        };

    }
    const breadcrumbItems = [
        <Breadcrumb.Item key="Admin">Admin</Breadcrumb.Item>,
        <Breadcrumb.Item key={selectedItem}>{selectedItem}</Breadcrumb.Item>
    ];

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['user']} mode="inline" items={items} onClick={({ key }) => handleMenuItemClick(key)} />
            </Sider>
            <Layout>
                <Menu className='p-2' onClick={({ key }) => handleMenuItemClick(key)} mode="horizontal" items={menuRightArr} />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        {breadcrumbItems}
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        Bill is a cat.
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};