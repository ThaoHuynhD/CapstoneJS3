import React, { useEffect, useState } from 'react'
import { message } from 'antd';
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import { getShowTimeByTheaterGroup } from '../../../api/mainApi';

export default function ShowTimeListByTheater() {

    let [theaterGroupList, setTheaterGroupList] = useState([]);
    let fetchDataTheaterList = async () => {
        try {
            let response = await getShowTimeByTheaterGroup();
            setTheaterGroupList(response.data.content);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };
    useEffect(() => { fetchDataTheaterList(); }, []);

    const renderMovieShowTime = (movie) => {
        return movie.lstLichChieuTheoPhim.splice(0, 4).map((show, index) => {
            return (
                <div key={index} className='col'>
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

    const renderMovieList = (theater) => {
        return theater.danhSachPhim.map((movie) => {
            if (movie.lstLichChieuTheoPhim.length !== 0) {
                return (
                    <div key={movie.maPhim} className='row ml-2 py-2 border-bottom'>
                        <div className="col-2 p-0"><img className='mx-2' style={{ width: 110, height: 160 }} src={movie.hinhAnh} alt='' /></div>
                        <div className="col-10 p-0 pr-2">
                            <div className="row">
                                <div className='col-12'>
                                    <h5 className="p-2 m-0 text-warning font-bold">{movie.tenPhim.toUpperCase()}<span className='text-dark'> ({movie.maPhim})</span></h5>
                                </div>
                                {renderMovieShowTime(movie)}
                            </div>
                        </div>
                    </div>
                )
            }
            else return null;
        }
        )
    }

    const renderTheaterList = (theaterGroup) => {
        const theaterArr = theaterGroup.lstCumRap
            .filter(theater => theater.maCumRap !== 'glx-nguyen-du\r\n')
            .map((theater) => {
                let isEmpty = true;
                theater.danhSachPhim.forEach((movie) => {
                    if (movie.lstLichChieuTheoPhim.length !== 0) {
                        isEmpty = false;
                    }
                })
                if (!isEmpty) {
                    return {
                        key: theater.maCumRap,
                        label: <div className='text-left' style={{ width: 300 }}>
                            <h6 className='text-success'>{theater.tenCumRap.toUpperCase().replace(" STAR CINEPLEX", "")}</h6>
                            <p className='m-0'>{theater.diaChi.substring(0, 40)}{theater.diaChi.length > 40 ? '...' : ''}</p>
                            <span className='text-danger'>[Chi tiết]</span></div>,
                        children: (
                            <div style={{ height: 750, overflow: 'scroll' }}>
                                {renderMovieList(theater)}
                            </div>
                        ),
                    };
                }
                else return null;
            });
        return theaterArr;
    };

    const theaterGroupListArr = [];
    theaterGroupList.forEach(theaterGroup => {
        const theaterUpdate = {
            key: theaterGroup.maHeThongRap,
            label: <img width={80} src={theaterGroup.logo} alt='' />,
            children: <Tabs
                defaultActiveKey={1}
                tabPosition={'left'}
                items={renderTheaterList(theaterGroup)}
                style={{ maxHeight: 750 }}
            />,
        }
        theaterGroupListArr.push(theaterUpdate);
    })

    return (
        <div className='container' style={{ margin: 50 }}>
            <Tabs
                defaultActiveKey={1}
                tabPosition={'left'}
                items={theaterGroupListArr}
                className={theaterGroupListArr.length !== 0 ? 'border' : ''}
                style={{ maxHeight: 750 }}
            />
        </div>
    )
}


