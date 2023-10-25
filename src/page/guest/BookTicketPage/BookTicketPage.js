import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { getMovieShowTime } from '../../../api/mainApi';
import SeatList from './SeatList';
import BookingCart from './BookingCart';

export default function BookTicketPage() {
  let params = useParams();
  let maLichChieu = params.maLichChieu.substring(1, params.maLichChieu.length);
  let cart = useSelector((state) => state.cartReducer.cart);
  
  const [movieShowDetail, setMovieShowDetail] = useState([]);
  useEffect(() => {
    const fetchDataMovieShowDetail = async () => {
      try {
        const response = await getMovieShowTime(maLichChieu);
        setMovieShowDetail(response.data.content);
      } catch {
        message.error("Đã có lỗi xảy ra");
      }
    };
    fetchDataMovieShowDetail();
  }, [maLichChieu]);
  return (
    <div className="container p-10">
      <div className='row'>
        <div className='col-7'>
          <SeatList movieShowDetail={movieShowDetail} cart={cart} />
        </div>
        <div className='col-5'>
          <BookingCart movieShowDetail={movieShowDetail} cart={cart} />
        </div>
      </div>
    </div>
  )
}
