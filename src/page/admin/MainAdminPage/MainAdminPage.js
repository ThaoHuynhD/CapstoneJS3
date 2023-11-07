import React, { useState } from 'react';
import { ScheduleOutlined, TeamOutlined, IdcardOutlined, CarryOutOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, } from 'antd';
import MyHeader from '../../../component/MyHeader';
import UserManagement from './user/UserManagement';

import PersonalPage from '../../PersonalPage/PersonalPage';
import AddMovie from './movie/AddMovie';
import MovieList from './movie/MovieList';
import ShowTimeAddNew from './showtime/ShowTimeAddNew';
import ShowTimeList1 from './showtime/ShowTimeList1';

const { Content, Sider, Header, } = Layout;
function getItem(label, key, icon, children) {
    return { key, icon, children, label, };
}

const items = [
    getItem('Quản Lý Người Dùng', 'user', <TeamOutlined />),
    getItem('Quản Lý Phim', 'movie', <CarryOutOutlined />, [
        getItem('Thêm Phim Mới', 'addMovie'),
        getItem('Danh Sách Phim', 'movieList'),
    ]),
    getItem('Quản Lý Lịch Chiếu Phim', 'showtime', <ScheduleOutlined />, [
        getItem('Thêm Lịch Chiếu Mới', 'showtimeAddNew'),
        getItem('Danh Sách Lịch Chiếu', 'showtimeList'),
    ]),
    getItem('Thông Tin Cá Nhân', 'personal', <IdcardOutlined />),
];

export default function MainAdminPage() {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer }, } = theme.useToken();
    const [selectedItem, setSelectedItem] = useState(null);
    if (selectedItem === null) { setSelectedItem('movieList') }

    const [selectedMaPhim, setSelectedMaPhim] = useState(null);

    const handleMenuItemClick = (key) => {
        setSelectedItem(key);
    }

    const breadcrumbItems = [
        <Breadcrumb.Item key="Admin">Admin</Breadcrumb.Item>,
        <Breadcrumb.Item key={selectedItem}>{selectedItem}</Breadcrumb.Item>
    ];

    const componentMapping = {
        user: <UserManagement />,
        addMovie: <AddMovie />,
        movieList: <MovieList handleMenuItemClick={handleMenuItemClick} setSelectedMaPhim={setSelectedMaPhim} />,
        showtimeAddNew: <ShowTimeAddNew maPhim={selectedMaPhim} />,
        showtimeList: <ShowTimeList1 maPhim={selectedMaPhim} />,
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