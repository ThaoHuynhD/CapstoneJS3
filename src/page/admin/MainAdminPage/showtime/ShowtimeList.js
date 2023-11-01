import { Tabs, message } from 'antd';
import React, { useState } from 'react'
import { getShowTimeByMovie } from '../../../api/mainApi';
import { NavLink } from 'react-router-dom';

export default function ShowtimeList({ maPhim }) {
    let [theaterGroupList, setTheaterGroupList] = useState([]);
    let fetchDataMovieDetail = async () => {
        try {
            let response = await getShowTimeByMovie(maPhim);
            setTheaterGroupList(response.data.content);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };

    fetchDataMovieDetail();

    const renderShowTimeList = (theater) => {
        return theater.lichChieuPhim.map((show, index) => {
            return (
                <div key={index} className='col-3 p-1'>
                    <NavLink to={`/purchasing/:${show.maLichChieu}`}>
                        <button className='btn btn-light my-2'>
                            <span className='text-success'>{show.ngayChieuGioChieu.substring(0, 10)}</span> -
                            <span className='text-danger'><b> {show.ngayChieuGioChieu.substring(14, 20)}</b></span>
                        </button>
                    </NavLink>
                </div>
            )
        })
    }

    const renderTheaterList = (theaterGroup) => {
        const theaterArr = [];
        theaterGroup.cumRapChieu
            .filter(theather => theather.maCumRap !== 'glx-nguyen-du\r\n')
            .forEach((theater) => {
                const showTimeList = renderShowTimeList(theater);
                if (showTimeList.length > 0) {
                    const theaterUpdate = {
                        key: theater.maCumRap,
                        label: (
                            <div className="text-left" style={{ width: 300 }}>
                                <h6 className="text-success">{theater.tenCumRap.toUpperCase()}</h6>
                                <p className="m-0">
                                    {theater.diaChi.substring(0, 40)}
                                    {theater.diaChi.length > 40 ? '...' : ''}
                                </p>
                                <span className="text-danger">[Chi tiết]</span>
                            </div>
                        ),
                        children: <div className="row">{showTimeList}</div>,
                    };
                    theaterArr.push(theaterUpdate);
                }
            });
        return theaterArr;
    };

    let theaterGroupArr = [];
    if (theaterGroupList.length !== 0) {
        theaterGroupList.heThongRapChieu.forEach(theaterGroup => {
            let theaterArr = renderTheaterList(theaterGroup);
            const theatherGroupUpdate = {
                key: theaterGroup.maHeThongRap,
                label: <img width={80} src={theaterGroup.logo} alt={theaterGroup.tenHeThongRap} />,
                children:
                    <Tabs
                        defaultActiveKey={1}
                        tabPosition={'left'}
                        items={theaterArr}
                        style={{ maxHeight: 750 }}
                    />,
            }
            if (theaterArr.length !== 0) { theaterGroupArr.push(theatherGroupUpdate); }
        })
    }
    return (
        <div className='container' style={{ margin: 50 }}>
            <h1 className={theaterGroupArr.length === 0 ? 'd-block' : 'd-none'}>Chưa có Thời gian chiếu phim cụ thể. Vui lòng thử lại sau</h1>
            <Tabs
                defaultActiveKey={1}
                tabPosition={'left'}
                items={theaterGroupArr}
                className={theaterGroupArr.length !== 0 ? 'border' : ''}
                style={{ maxHeight: 750 }} />
        </div>
    )
}
