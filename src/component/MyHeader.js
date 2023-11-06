import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { userDetailLocalStorage, userLocalStorage } from '../api/localServices';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';

export default function MyHeader() {
    let navigate = useNavigate();
    let info = userLocalStorage.get();
    let isAdmin;
    if (info !== null && info !== undefined) { isAdmin = info.maLoaiNguoiDung === 'QuanTri'; }
    const [current, setCurrent] = useState('/');
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isMobileWidth, setIsMobileWidth] = useState(false);
    console.log("IsMobileWidth: ", isMobileWidth);
    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
        console.log("ShowMobileMen: ", showMobileMenu);
    };
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsMobileWidth(true);
                console.log("sMobileWidth: ", isMobileWidth);
                setShowMobileMenu(true);
            } else {
                setIsMobileWidth(false);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const menuLeftArr = [
        {
            label: (
                <div className='lg:w-16 w-10 rounded-full overflow-hidden'>
                    <img className='lg:w-24 w-14'
                        src='https://i.pinimg.com/564x/d0/d7/b0/d0d7b047ddef0af6057424fcaf1f19ce.jpg' alt='logo' />
                </div>
            ),
            key: 'movieBanner',
            showMenu: true,
        },
        { label: 'Lịch Chiếu', key: 'schedule', },
        { label: 'Cụm Rạp', key: 'groupcinema', },
        { label: 'Tin Tức', key: 'myNews', },
        { label: 'Ứng Dụng', key: 'myApps', },

    ];
    const menuRightArr = [
        {
            label: info !== null ? (
                <div className="overflow-hidden relative max-w-md mx-auto flex items-center gap-2">
                    <strong className="text-white">{info.taiKhoan}</strong>
                </div>
            ) : 'Đăng Nhập',
            key: info !== null ? 'personal' : 'sign-in',
            flexRight: true,
            showMenu: true,
        },
        {
            label: info !== null ? 'Đăng Xuất' : 'Đăng Ký',
            key: info !== null ? 'sign-out' : 'sign-up',
            showMenu: true,
        },
        {
            label: (
                <button className={`btn btn-dark px-2.5 ${isMobileWidth ? 'block' : 'hidden'}`}
                    onClick={() => handleMenuItemClick('menuBar')}>
                    <MenuOutlined />
                </button>
            ),
            key: 'menuBar',
            showMenu: true,
        },
    ];

    const menuUserArr = [...menuLeftArr, ...menuRightArr];
    const menuAdminArr = [...menuRightArr];
    let handleSignOut = () => {
        userLocalStorage.remove();
        userDetailLocalStorage.remove();
        window.location.reload();
        window.location.href = "/";
    };
    const scrollIntoView = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    function scrollToTop() {
        window.scrollTo(0, 0); // Scroll to the top (0, 0 coordinates)
    }
    const handleMenuItemClick = (key) => {
        setCurrent(key);
        if (key === 'menuBar') {
            toggleMobileMenu();
        }
        else {
            if (key === 'sign-in' || key === 'sign-up') {
                navigate(`/${key}`);
                scrollToTop();
            }
            else if (key === 'personal') {
                if (isAdmin) return;
                else navigate(`/${key}`);
            }
            else if (key === 'sign-out') {
                handleSignOut();
                navigate('/');
            }
            else {
                navigate('/');
                setTimeout(() => {
                    scrollIntoView(key);
                }, 200);
            }
            setShowMobileMenu(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#001529' }} className='fixed top-0 w-screen z-50 font-bold'>
            <div className="container">
                {(isAdmin) ? (
                    <Menu id='myHeader' theme={'dark'} className='p-2 m-0 ' onClick={({ key }) => handleMenuItemClick(key)} mode="horizontal" items={menuAdminArr} />
                ) : (
                    (isMobileWidth) ? (
                        <Menu
                            id='myHeader'
                            theme={'dark'}
                            className='lg:p-2 py-2 m-0 text-center lg:text-left align-middle'
                            onClick={({ key }) => handleMenuItemClick(key)}
                            selectedKeys={[current]}
                            mode={showMobileMenu ? 'vertical' : 'horizontal'}
                        >
                            {menuUserArr.map((item) => {
                                return (item.showMenu || showMobileMenu) && (
                                    <Menu.Item
                                        key={item.key}
                                        className={`px-2 ${item.flexRight ? 'ml-auto' : 'ml-0'}`}
                                    >
                                        {item.label}
                                    </Menu.Item>
                                );
                            })}
                        </Menu>
                    ) : (
                        <Menu
                            id='myHeader'
                            theme={'dark'}
                            className='lg:p-2 py-2 m-0 text-center lg:text-left align-middle'
                            onClick={({ key }) => handleMenuItemClick(key)}
                            selectedKeys={[current]}
                            mode={showMobileMenu ? 'vertical' : 'horizontal'}
                        >
                            {menuUserArr.map((item) => (
                                <Menu.Item
                                    key={item.key}
                                    className={`px-2 ${item.flexRight ? 'ml-auto' : 'ml-0'}`}
                                >
                                    {item.label}
                                </Menu.Item>
                            ))}
                        </Menu>
                    )
                )}
            </div>
        </div>
    )
};
