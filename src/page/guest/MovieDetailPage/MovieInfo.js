import { Rate, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { getMovieDetail } from '../../../api/mainApi';

export default function MovieInfo({ maPhim }) {
    let [movieDetail, setMovieDetail] = useState([]);
    let fetchDataMovieDetail = async () => {
        try {
            let response1 = await getMovieDetail(maPhim);
            setMovieDetail(response1.data.content);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };

    useEffect(() => {
        fetchDataMovieDetail();
    });
    return (
        <div className="row">
            <div className="col-4">
                <img width={250} src={movieDetail.hinhAnh} alt='' />
            </div>
            <div className='col'>
                <div className="row">
                    <div className="name col text-left">
                        <h3>{movieDetail.tenPhim}</h3>
                        <p>{movieDetail.ngayKhoiChieu}</p>
                        <button className='btn btn-success m-3'>Xem trailer</button>
                    </div>
                    <div className="rating col">
                        <h1>{movieDetail.danhGia}</h1>
                        <Rate disabled allowHalf value={movieDetail.danhGia / 2} />
                    </div>
                </div>
            </div>
        </div>
    )
}
