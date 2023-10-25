import React, { useState } from 'react';
import { Menu } from 'antd';
import { userDetailLocalStorage, userLocalStorage } from '../api/localServices';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    let navigate = useNavigate();
    let info = userLocalStorage.get();
    const [current, setCurrent] = useState('/');

    const menuLeftArr = [
        {
            label: <h4><img width={40} src='./img/iconPage.jpg' alt='hi' /> WEB MOVIE</h4>,
            key: 'homepage',
        },
        {
            label: 'Lịch Chiếu',
            key: 'schedule',
        },
        {
            label: 'Cụm Rạp',
            key: 'groupcinema',
        },
        {
            label: 'Tin Tức',
            key: 'news',
        },
        {
            label: 'Ứng Dụng',
            key: 'app',
        },
    ];
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
        window.location.href = "/";
    };

    const handleMenuItemClick = (key) => {
        setCurrent(key);
        if (key === 'sign-out') {
            handleSignOut();
        } else if (key === 'personal' || key === 'sign-in' || key === 'sign-up') {
            navigate(`/${key}`);
        } else if (key) {
            navigate('/');
            scrollIntoView(key);
        }
    };

    const scrollIntoView = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='Header'>
            <div class="row d-between">
                <div class="col-9">
                    <Menu className='p-2' onClick={({ key }) => handleMenuItemClick(key)} selectedKeys={[current]} mode="horizontal" items={menuLeftArr} />
                </div>
                <div class="col-3">
                    <Menu className='p-2' onClick={({ key }) => handleMenuItemClick(key)} mode="horizontal" items={menuRightArr} />
                </div>
            </div>
        </div>
    )
};
